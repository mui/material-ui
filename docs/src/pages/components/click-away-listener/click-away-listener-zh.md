---
title: 检测 React 组件外部的单击事件
components: ClickAwayListener
---

# Click away listener 他处点击监听器

<p class="description">用于检测点击事件是否发生在元素之外。 它可以监听文档中某处发生的点击事件。</p>

- 📦 [1.5kB 已压缩的包](/size-snapshot)。
- ⚛️ Support portals

## 示例

例如，当用户在点击页面除菜单外的任何一处，您可能想隐藏一个下拉的菜单：

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

请注意，该组件仅接受一个子元素。 You can find a more advanced demo on the [Menu documentation section](/components/menus/#menulist-composition).

## Portal

The following demo uses [`Portal`](/components/portal/) to render the dropdown into a new "subtree" outside of current DOM hierarchy.

{{"demo": "pages/components/click-away-listener/PortalClickAway.js"}}

## Leading edge

By default, the component responds to the trailing events (click + touch end). However, you can configure it to respond to the leading events (mouse down + touch start).

{{"demo": "pages/components/click-away-listener/LeadingClickAway.js"}}

> ⚠️ In this mode, only interactions on the scrollbar of the document is ignored.