# Liquid Glass 主题定制说明

基于 VuePress 2 默认主题（`@vuepress/theme-default`，2.0.0-rc.x）的深度皮肤定制，**不更换主题**。
设计语言为苹果 **Liquid Glass / visionOS**：半透明玻璃材质、边缘光学描边、指针跟随的镜面高光、柔和极光背景，以及基于 View Transitions API 的丝滑页面过渡。浅色 / 深色双模式均精调。

## 文件结构

| 文件 | 职责 |
|---|---|
| `palette.scss` | Sass 断点变量（覆盖主题默认断点） |
| `index.scss` | 样式入口，`@use` 下方全部模块（顺序：tokens → glass → navbar → sidebar → content → code → home → motion） |
| `_tokens.scss` | 双模式 CSS 变量：色板、玻璃 tint / 镜面 / 圆角、极光 `--aurora-*`、网格线、阴影、缓动 |
| `_glass.scss` | 玻璃核心 mixin：`glass-material`（材质）、`glass-sheen`（指针镜面高光）、`glass-rim`（边缘光描边）；类 `.glass` / `.glass-strong` / `.glass-dark` / `.glass-interactive` / `.glass-live` |
| `_navbar.scss` | 玻璃导航栏、滚动后收缩为居中悬浮 **Dock 胶囊**、下拉菜单、搜索框、激活项胶囊 |
| `_sidebar.scss` | 侧边栏激活指示条、移动端玻璃抽屉 |
| `_content.scss` | 排版、h2 分隔线、链接、表格、引用、hint-container、page-nav |
| `_code.scss` | 玻璃代码面板、标题栏状态点（非圆形，用圆角矩形）、行高亮、复制按钮、code-tabs |
| `_home.scss` | 极光下的 hero、动态玻璃特性卡（指针高光 + 悬浮）、按钮 |
| `_motion.scss` | 极光 / 网格背景样式、**View Transitions 页面过渡**、`.page-enter` 降级、回到顶部、阅读进度条、404、reduced-motion/transparency 兜底 |

## 客户端脚本 `docs/.vuepress/client.js`

由 VuePress 自动加载（无需在 config 中引用），`onMounted` 后执行：

1. **极光背景**：注入 `body > .ambient`（三个大尺寸柔焦光斑 `.aurora.a1/a2/a3` + 极淡网格），仅做 `transform` 动画，纯 CSS、无逐帧 JS；
2. **滚动**（`passive` + `requestAnimationFrame` 节流）：顶部阅读进度条 `.read-progress`；滚动超过 24px 时给导航栏加 `.navbar-scrolled`，触发 Dock 胶囊收缩；
3. **指针镜面高光**（仅 `pointer: fine` 且未开 reduced-motion）：在玻璃表面（特性卡、按钮、下拉、page-nav 等）写入整数像素的 `--mx/--my`，配合 `_glass.scss` 的径向渐变形成跟随光斑；`.glass-live` 类标记需要高光的玻璃面。导航栏本身只追踪高光但不挂 `.glass-live`（避免 `overflow:hidden` 裁切下拉），搜索框同理；
4. **页面过渡**（`enhance({ router })`）：
   - 支持时用 **View Transitions API** 包裹路由切换：旧页面淡出、新页面轻微上浮 + 去模糊淡入；导航栏与背景固定不闪（`view-transition-name`）；
   - 用 `from.name == null && from.matched.length === 0` 判定首屏 START_LOCATION，**首屏不做过渡**；
   - 浏览器不支持 VT 时，在 `afterEach` 播放 `.page-enter` 降级动画；
5. 路由切换后重新标记玻璃面、同步滚动状态。

> 已**移除常驻 `requestAnimationFrame`**；所有交互监听均节流 / passive，动画只驱动 `transform` 与 `opacity`。

## 主题约定（定制时务必使用这些，旧文档已过时）

- 颜色变量前缀：`--vp-c-*`（不是旧的 `--c-*`）
- 深色模式选择器：`[data-theme='dark']`（属性在 `<html>` 上，不是 `html.dark`）
- 颜色模式存储键：`vuepress-color-scheme`（值 `light` / `dark` / `auto`）
- 导航激活链接：`.vp-navbar-items > .auto-link.route-link-active`（原主题在其上有 2px 下划线，需 `!important` 覆盖为胶囊）
- 回顶部按钮真实类：`.vp-back-to-top-button`

## 核心色值

- 浅色：背景 `#f7f9fc`，品牌色 `#0891b2`（冷青蓝），极光为青 / 紫 / 绿柔焦
- 深色：背景 `#080c16`（深空蓝黑），霓虹青 `#38d6ee`，极光为青 / 紫 / 蓝绿
- 圆角统一为圆角矩形（`--radius-sm/--radius/--radius-lg/--radius-xl`），不使用圆形元素

## 性能与无障碍

- 极光只动 `transform`（合成层）；背景模糊用 `::before` 固定层，避免整页重绘；
- 窄屏（≤719px）降低 `backdrop-filter` 模糊并隐藏第 3 个极光；
- `prefers-reduced-motion: reduce`：关闭极光 / 高光 / 过渡动画；
- `prefers-reduced-transparency: reduce`：玻璃降级为实体材质。

## Google Analytics

`config.js` 中 GA 插件仅在存在真实 GA4 ID（环境变量 `VITE_GA_ID`，形如 `G-XXXXXXX`）时启用；
占位 ID 会让 `@vuepress/plugin-google-analytics` 在 dev 下抛 `__GA_OPTIONS__ is not defined` 并中断页面挂载。

## 依赖说明

当前玻璃质感为**纯 CSS + 少量 JS 实现**，未使用 SVG `feDisplacementMap` 折射，也**不需要**任何额外玻璃库（曾尝试过 `@tomagranate/liquid-glass`，已废弃并从依赖中移除）。

## 调参建议

- 改配色：编辑 `_tokens.scss` 中 `:root`（浅色）与 `[data-theme='dark']`（深色）变量；
- 改玻璃厚度 / 模糊 / 镜面：编辑 `_glass.scss` 的 `glass-material` / `glass-sheen` mixin 与 `--glass-*` 变量；
- 改极光：编辑 `_tokens.scss` 的 `--aurora-*` 与 `_motion.scss` 中 `.aurora` 的 `@keyframes`；
- 改 Dock 收缩阈值：编辑 `client.js` 中 `onScroll` 的 24px 阈值与 `_navbar.scss` 的 `.navbar-scrolled`；
- 改过渡时长 / 曲线：编辑 `_motion.scss` 中 `::view-transition-old/new(root)` 的 `vt-out` / `vt-in` 动画时长与 `--ease-spring` 缓动变量。
