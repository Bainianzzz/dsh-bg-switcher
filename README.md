# dsh-bg-switcher

[English](README.en.md) | 中文

[![DeepSeek Harness](https://img.shields.io/badge/DeepSeek%20Harness-official%20repo-4d6bfe?logo=github&logoColor=white)](https://github.com/deepseek-ai/deepseek-harness)
[![topic: dsh-plugin](https://img.shields.io/badge/topic-dsh--plugin-4d6bfe)](https://github.com/topics/dsh-plugin)
[![license: MIT](https://img.shields.io/badge/license-MIT-4d6bfe)](LICENSE)

DeepSeek Harness 插件：在 **侧边栏底部、「设置」上方** 加一个「背景」按钮，点开可选 6 个预设色卡或自定义图片地址，
铺满窗口并记住选择。

<img src="docs/background-row.webp" width="820" alt="侧边栏底部的背景按钮，以及它右侧弹出的色卡面板">

## 安装

### 交给 agent

把下面这段贴进 Harness 对话：

```text
安装 DSH 插件 https://github.com/Bainianzzz/dsh-bg-switcher：
1. 克隆仓库到 ~/dsh-plugins/dsh-bg-switcher；
2. plugin_manager 工具，action=install_bundle，target 填该目录绝对路径；
3. 确认 application 为 applied，否则把 warnings 与 error 报给我；
4. cordis_inspect_query 查客户端 sidebar.footer.action 插槽，确认出现 id 为 bg-switcher 的条目。
```

### 手动安装

1. 侧边栏选中 **插件 / Plugins**
2. 右上角点 **添加插件 / Add plugin**
3. 地址栏填入 `https://github.com/Bainianzzz/dsh-bg-switcher`，点 **安装 / Install**
4. 完成后点 **立即启用 / Enable now**

## 实现

- 入口注册在 `sidebar.footer.action`；外壳先渲染该槽位、再渲染 `sidebar.settings`，所以按钮落在「设置」上方
- 该座位展开时约 220px、收起时 56px，放不下色卡，因此选择面板是一个 `position:fixed` 浮层，
  按按钮位置测量后贴在侧边栏右侧，窗口缩放时重新定位
- 背景画在 `html` 上；`--dsw-alias-bg-base` 经 `ctx.theme.overrideTokens` 置为 `transparent`，抬升表面保持不透明
- 亮暗色各配一层遮罩，暗色由 `html:has(body[data-ds-dark-theme])` 跟随
- 样式标签与 token 层在 `ctx.effect` 里创建并返回清理函数，停用即回到主题默认
- 选择存在 `localStorage`（`dsh.bg-switcher.selection`），重装或升级插件都不影响

## 许可

[MIT](LICENSE)
