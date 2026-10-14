# dsh-bg-switcher

English | [中文](README.md)

[![DeepSeek Harness](https://img.shields.io/badge/DeepSeek%20Harness-official%20repo-4d6bfe?logo=github&logoColor=white)](https://github.com/deepseek-ai/deepseek-harness)
[![topic: dsh-plugin](https://img.shields.io/badge/topic-dsh--plugin-4d6bfe)](https://github.com/topics/dsh-plugin)
[![license: MIT](https://img.shields.io/badge/license-MIT-4d6bfe)](LICENSE)

A DeepSeek Harness plugin: a **Background** button at the **sidebar foot, above Settings** — six preset
swatches or your own image URL, filling the window and remembered across reloads.

<img src="docs/background-row.webp" width="820" alt="The Background button at the sidebar foot, and the preset panel it opens beside the sidebar">

## Install

### Let your agent do it

Paste this into the Harness chat:

```text
Install the DSH plugin at https://github.com/Bainianzzz/dsh-bg-switcher:
1. clone the repository to ~/dsh-plugins/dsh-bg-switcher;
2. call the plugin_manager tool with action=install_bundle and that directory's absolute path as target;
3. confirm the returned application is "applied", otherwise report warnings and error back to me;
4. use cordis_inspect_query on the Client sidebar.footer.action slot and confirm an entry with id "bg-switcher".
```

### Manual

1. Select **Plugins** in the sidebar
2. Click **Add plugin** (top right)
3. Enter `https://github.com/Bainianzzz/dsh-bg-switcher` and click **Install**
4. Click **Enable now** when it finishes

## How it works

- The entry registers into `sidebar.footer.action`; the shell renders that seat before `sidebar.settings`,
  so the button lands directly above Settings
- The seat is about 220px wide expanded and 56px in the rail, too narrow for the gallery, so the picker is a
  `position:fixed` surface measured from the button and placed beside the sidebar, re-placed on resize
- The backdrop is painted on `html`; `--dsw-alias-bg-base` is set to `transparent` through
  `ctx.theme.overrideTokens`, so raised surfaces stay opaque
- Light and dark each get a scrim, the dark one following `html:has(body[data-ds-dark-theme])`
- The style tag and the token layer are created inside `ctx.effect` and cleaned up with it, so disabling
  the bundle restores the theme default
- The choice lives in `localStorage` (`dsh.bg-switcher.selection`), so reinstalling or upgrading keeps it

## License

[MIT](LICENSE)
