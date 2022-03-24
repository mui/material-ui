---
product: material-ui
title: React Detect click outside（它处点击监听器）组件
components: ClickAwayListener
githubLabel: 'component: ClickAwayListener'
---

# Click away listener 它处点击监听器

<p class="description">用于检测点击事件是否发生在元素之外。 它可以监听文档中某处发生的点击事件。</p>

- 📦 [992 B gzipped](/size-snapshot).
- ⚛️ Supports portals

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 示例

例如，当用户在点击页面除菜单外的任何一处，您可能想隐藏一个下拉的菜单：

{{"demo": "ClickAway.js"}}

请注意，该组件仅接受一个子元素。 你可以在 [Menu 的文档章节](/components/menus/#menulist-composition) 阅读更高级的样例。

## Portal（传送门）

下面的演示使用 [`传送门组件（Portal）`](/components/portal/) 将下拉菜单渲染到当前 DOM 层次之外的新的“子级树”。

{{"demo": "PortalClickAway.js"}}

## 前端（Leading edge）

默认情况下，组件响应了尾随事件（trailing events）（点击 + 触摸结束）。 然而，您可以配置它来回应一些主要的事件（leading events）（鼠标按下 + 触摸开始）。

{{"demo": "LeadingClickAway.js"}}

> ⚠️ 在此模式下，仅有文档对象滚动条上的交互被忽略。

## 无障碍设计

默认情况下 `<ClickAwayListener />` 将添加一个 `onClick` 处理程序到其子项。 这可能会导致例如屏幕阅读器宣布其子元素可以点击。 然而， `onClick` 处理程序的目的不是要让 `子元素` 可交互。

为了防止屏幕阅读器将非交互式子元素标记为“可点击（clickable）”，请添加 `role="presentation"` 到其直接子元素：

```tsx
<ClickAwayListener>
  <div role="presentation">
    <h1>不可交互的标题</h1>
  </div>
</ClickAwayListern>
```

当使用 Firefox 阻止通知消息时，修复NVDA中的一个奇怪的行为也是必需的(见 [mui/material-ui#29080](https://github.com/mui/material-ui/issues/29080))。

## 素颜模式

- 📦 [981 B gzipped](https://bundlephobia.com/package/@mui/base@latest)

由于组件没有任何样式，它也有一个基本包。

```js
import ClickAwayListener from '@mui/base/ClickAwayListener';
```
