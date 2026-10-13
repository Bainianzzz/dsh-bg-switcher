# dsh-bg-switcher

English | [中文](README.md)

[![DeepSeek Harness](https://img.shields.io/badge/DeepSeek%20Harness-official%20repo-4d6bfe?logo=github&logoColor=white)](https://github.com/deepseek-ai/deepseek-harness)
[![topic: dsh-plugin](https://img.shields.io/badge/topic-dsh--plugin-4d6bfe)](https://github.com/topics/dsh-plugin)
[![license: MIT](https://img.shields.io/badge/license-MIT-4d6bfe)](LICENSE)

A DeepSeek Harness plugin: a **Background** row in **Settings → General**, under *Appearance* — seven
preset wallpapers or your own image URL, filling the window and remembered across reloads.

<img src="docs/background-row.webp" width="820" alt="Settings → General → Background: the picker shows the current choice (Sakura), the gallery lists every preset, and below it the image-URL field">

## Install

Paste this into the Harness chat:

```text
Install the DSH plugin at https://github.com/Bainianzzz/dsh-bg-switcher:
1. clone the repository to ~/dsh-plugins/dsh-bg-switcher;
2. call the plugin_manager tool with action=install_bundle and that directory's absolute path as target;
3. confirm the returned application is "applied", otherwise report warnings and error back to me;
4. use cordis_inspect_query on the Client settings.general.item slot and confirm an entry with id "bg-switcher".
```

Manual: sidebar **Plugins** → **Add plugin** (top right) → enter
`https://github.com/Bainianzzz/dsh-bg-switcher` → **Install** → **Enable now**. Settings → Built-in plugins
is the read-only inventory, not the install entry; upgrades are uninstall-then-install. CLI:
`dsh plugin --profile web add <dir>`, then list `@local/dsh-bg-switcher` in the profile's
`dsh.profile.bundles`.

## How it works

The backdrop is painted on `html`, and `--dsw-alias-bg-base` is set to `transparent` through
`ctx.theme.overrideTokens`, so raised surfaces stay opaque. Light and dark each get a scrim, the dark one
following `html:has(body[data-ds-dark-theme])`. The style tag and the token layer are created inside
`ctx.effect` and cleaned up with it, so disabling the bundle restores the theme default.

## License

MIT
