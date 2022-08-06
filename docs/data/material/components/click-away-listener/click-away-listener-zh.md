---
product: material-ui
title: React Detect click outside（它处点击监听器）组件
components: ClickAwayListener
githubLabel: 'component: ClickAwayListener'
---

# Click-away listener

<p class="description">用于检测点击事件是否发生在元素之外。 它可以监听文档中某处发生的点击事件。</p>

- 📦 [992 B gzipped](/size-snapshot/).
- ⚛️ Supports portals

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 示例

例如，当用户在点击页面除菜单外的任何一处，您可能想隐藏一个下拉的菜单：

{{"demo": "ClickAway.js"}}

请注意，该组件仅接受一个子元素。 You can find a more advanced demo on the [Menu documentation section](/material-ui/react-menu/#menulist-composition).

## Portal（传送门）

The following demo uses [`Portal`](/material-ui/react-portal/) to render the dropdown into a new "subtree" outside of current DOM hierarchy.

{{"demo": "PortalClickAway.js"}}

## 前端（Leading edge）

默认情况下，组件响应了尾随事件（trailing events）（点击 + 触摸结束）。 然而，您可以配置它来回应一些主要的事件（leading events）（鼠标按下 + 触摸开始）。

{{"demo": "LeadingClickAway.js"}}

:::warning
⚠️ In this mode, only interactions on the scrollbar of the document is ignored.
:::

## 无障碍设计

By default `<ClickAwayListener />` will add an `onClick` handler to its children. This can result in e.g. screen readers announcing the children as clickable. However, the purpose of the `onClick` handler is not to make `children` interactive.

In order to prevent screen readers from marking non-interactive children as "clickable" add `role="presentation"` to the immediate children:

```tsx
<ClickAwayListener>
  <div role="presentation">
    <h1>non-interactive heading</h1>
  </div>
</ClickAwayListener>
```

This is also required to fix a quirk in NVDA when using Firefox that prevents announcement of alert messages (see [mui/material-ui#29080](https://github.com/mui/material-ui/issues/29080)).

## 素颜模式

- 📦 [981 B gzipped](https://bundlephobia.com/package/@mui/base@latest)

As the component does not have any styles, it also comes with the Base package.

```js
import ClickAwayListener from '@mui/base/ClickAwayListener';
```
