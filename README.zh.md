# dsh-bg-switcher

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 插件：在 **设置 → 通用** 里、「外观」
正下方加一行 **背景** 选项。选一个预设色卡，或填入自己的图片地址，背景铺满窗口，选择会被记住。

## 功能

- 7 个预设：默认、极光、晚霞、深海、森林、石墨、樱花，外加自定义图片地址
- 亮色与暗色各配一层半透明遮罩，任何背景下文字都保持可读
- 背景画在窗口画布（`html`）上，卡片、菜单、浮层、侧边栏底色仍是不透明的主题表面
- 选择写入 `localStorage`，刷新后保留；停用组合包即回到主题默认背景
- 文案走客户端 locale 服务（`bgSwitcher` 命名空间，zh/en）

## 安装

在 Harness 网页界面：**设置 → 插件 → 添加插件**，填入本仓库地址：

```
https://github.com/Bainianzzz/dsh-bg-switcher
```

也可以先克隆到本机，在同一对话框里填入目录路径，或用命令行安装，再把组合包名加进 profile 的
`dsh.profile.bundles`：

```bash
dsh plugin --profile web add /path/to/dsh-bg-switcher
```

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

## 实现要点

背景画在 `html` 上，同时用 `ctx.theme.overrideTokens` 把 `--dsw-alias-bg-base` 置为 `transparent`：
窗口框架让出底色，抬升表面保持不透明。暗色变体由主题投射器切换的
`html:has(body[data-ds-dark-theme])` 跟随，主题切换无需重算。

样式标签与 token 覆盖层都在 `ctx.effect` 里创建并返回清理函数，因此停用或卸载组合包会回到主题默认背景。

## 许可

MIT
