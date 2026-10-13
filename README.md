# dsh-bg-switcher

[English](README.en.md) | 中文

[![DeepSeek Harness](https://img.shields.io/badge/DeepSeek%20Harness-official%20repo-4d6bfe?logo=github&logoColor=white)](https://github.com/deepseek-ai/deepseek-harness)
[![topic: dsh-plugin](https://img.shields.io/badge/topic-dsh--plugin-4d6bfe)](https://github.com/topics/dsh-plugin)
[![license: MIT](https://img.shields.io/badge/license-MIT-4d6bfe)](LICENSE)

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 插件：在 **设置 → 通用** 里、「外观」
正下方加一行 **背景** 选项。选一个预设色卡，或填入自己的图片地址，背景铺满窗口，选择会被记住。

<img src="docs/background-row.webp" width="820" alt="设置 → 通用 → 背景：选择器显示当前背景（樱花），下方是色卡宫格与图片地址输入框">

*设置 → 通用 → 背景。右上选择器显示当前背景，展开后是色卡宫格与图片地址输入框。*

## 功能

- 7 个预设：默认、极光、晚霞、深海、森林、石墨、樱花，外加自定义图片地址
- 亮色与暗色各配一层半透明遮罩，任何背景下文字都保持可读
- 背景画在窗口画布（`html`）上，卡片、菜单、浮层、侧边栏底色仍是不透明的主题表面
- 选择写入 `localStorage`，刷新后保留；停用组合包即回到主题默认背景
- 文案走客户端 locale 服务（`bgSwitcher` 命名空间，zh/en）

## 安装

网页界面里的插件管理入口在**侧边栏的「插件」页**，不在「设置」里 —— 「设置 → 内置插件」只显示内置插件的
清单与运行状态，是只读的（见官方包文档 `@deepseek-ai/dsh-client-ui-plugin-manager`）。

1. 侧边栏选中 **插件 / Plugins**。
2. 页面右上角点 **添加插件 / Add plugin**；它右侧的箭头里有「安装第三方插件」，打开同一个对话框。
3. 在「包名或地址」里填入本仓库地址：

   ```
   https://github.com/Bainianzzz/dsh-bg-switcher
   ```

   这一栏接受 npm 包名（可带版本）、Git 地址、tarball 与本机绝对路径。填 GitHub 地址时会先做一次
   `git ls-remote` 连通性检查（默认 5 秒）；失败时对话框提示「无法访问 GitHub」，可改用国内镜像。
4. 需要时在「安装源」里选源，点 **安装 / Install**。Host 先读取该地址声明的包信息，确认它带组合包，
   再运行 pnpm。
5. 安装完成点 **立即启用 / Enable now**。只关闭对话框的话，包已装上但处于关闭状态，可在「插件」页的
   卡片上打开。

升级当前需要**先卸载再安装**。命令行等价做法：`dsh plugin --profile web add /path/to/dsh-bg-switcher`，
随后把组合包名 `@local/dsh-bg-switcher` 加进 profile 的 `dsh.profile.bundles`。

## 出现位置

设置 → 通用 → **背景**，排在「外观」（order 10）与「字号大小」（order 11）之间。注册时使用
`order: 10.5`，改 `client.js` 里的这个值即可挪动位置。

## 文件

| 文件 | 作用 |
| --- | --- |
| `client.js` | 浏览器半边：偏好行、色卡宫格、背景投影 |
| `index.js` | 宿主半边：空实现 — 这个功能只涉及呈现，组合包行挂载即可 |
| `cordis.patch.yml` | 把 `bg-switcher` 这一行插进 profile |
| `locale/*.json` | 插件管理卡片上的标题与描述 |
| `icon.svg` | 插件卡片图标 |
| `docs/background-row.webp` | 上面的截图 |

## 实现要点

背景画在 `html` 上，同时用 `ctx.theme.overrideTokens` 把 `--dsw-alias-bg-base` 置为 `transparent`：
窗口框架让出底色，抬升表面保持不透明。暗色变体由主题投射器切换的
`html:has(body[data-ds-dark-theme])` 跟随，主题切换无需重算。

样式标签与 token 覆盖层都在 `ctx.effect` 里创建并返回清理函数，因此停用或卸载组合包会回到主题默认背景。

## 许可

MIT
