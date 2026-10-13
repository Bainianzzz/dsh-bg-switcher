# dsh-bg-switcher

English | [中文](README.md)

[![DeepSeek Harness](https://img.shields.io/badge/DeepSeek%20Harness-official%20repo-4d6bfe?logo=github&logoColor=white)](https://github.com/deepseek-ai/deepseek-harness)
[![topic: dsh-plugin](https://img.shields.io/badge/topic-dsh--plugin-4d6bfe)](https://github.com/topics/dsh-plugin)
[![license: MIT](https://img.shields.io/badge/license-MIT-4d6bfe)](LICENSE)

A [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) plugin that adds a **Background**
preference row to **Settings → General**, directly under *Appearance*. Pick a wallpaper preset or paste
your own image URL: the art fills the window, and the choice is remembered.

<img src="docs/background-row.webp" width="820" alt="Settings → General → Background: the picker shows the current choice (Sakura), the gallery lists every preset, and below it the image-URL field with its Apply button">

*Settings → General → Background. The picker shows the current choice; the gallery and the image-URL
field sit under it.*

## What it does

- 7 built-in presets — Default, Aurora, Sunset, Ocean, Forest, Graphite, Sakura — plus a custom image URL
- Light and dark themes each get a matched translucent scrim, so text stays readable over any art
- The backdrop is painted on the window canvas (`html`), while raised surfaces (cards, menus, popovers,
  the sidebar fill) keep their opaque theme surfaces
- The choice persists across reloads (`localStorage`); disabling the bundle restores the theme default
- Visible text goes through the Client locale service (`bgSwitcher`, zh/en)

## Install

The plugin manager lives in the sidebar's **Plugins** page, not in Settings — **Settings → Built-in
plugins** is the read-only inventory and runtime status of shipped plugins (see the official
`@deepseek-ai/dsh-client-ui-plugin-manager` package reference).

1. Select **Plugins** in the sidebar.
2. Click **Add plugin** in the page's top-right toolbar; the arrow beside it offers *Install a
   third-party plugin*, which opens the same dialog.
3. Enter this repository under *package name or address*:

   ```
   https://github.com/Bainianzzz/dsh-bg-switcher
   ```

   The field takes an npm package name (with an optional version), a Git address, a tarball, or an
   absolute local path. A GitHub address is checked with `git ls-remote` first (5 s timeout by default);
   when that fails the dialog offers the mainland China mirror.
4. Pick a **Registry** if needed, then **Install**. The Host reads what the spec declares and confirms it
   carries a bundle before pnpm runs.
5. Finish with **Enable now**. Closing the dialog instead leaves the package installed and switched off —
   turn it on from its card on the Plugins page.

Upgrades are uninstall-then-install for now. CLI equivalent:
`dsh plugin --profile web add /path/to/dsh-bg-switcher`, then list the bundle
(`@local/dsh-bg-switcher`) in the profile's `dsh.profile.bundles`.

## Where the row shows up

Settings → General → **背景 / Background**, between *外观 / Appearance* (order 10) and
*字号大小 / Font size* (order 11). The row is registered with `order: 10.5`; change that value in
`client.js` to move it.

## Files

| File | Role |
| --- | --- |
| `client.js` | Client half: the preference row, the preset gallery, and the backdrop projection |
| `index.js` | Host half: empty — the feature is presentation-only, the bundle row only needs to mount |
| `cordis.patch.yml` | Inserts the `bg-switcher` row into the profile |
| `locale/*.json` | Display title and description for the Plugin Manager card |
| `icon.svg` | Plugin card artwork |
| `docs/background-row.webp` | The screenshot above |

## How it works

The backdrop is painted on the `html` element, and `--dsw-alias-bg-base` is overridden to `transparent`
through `ctx.theme.overrideTokens`, so the window frame lets the art through while every raised surface
stays opaque. The dark-theme variant follows `html:has(body[data-ds-dark-theme])`, which the theme
presenter toggles, so a theme switch needs no recompute.

The style tag and the token layer are both created inside `ctx.effect` and returned with their cleanup,
so disabling or unloading the bundle restores the theme default.

## License

MIT
