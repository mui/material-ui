---
title: React Detect click outside（它处点击监听器）组件
components: ClickAwayListener
githubLabel: 'component: ClickAwayListener'
---

# Click away listener 它处点击监听器

<p class="description">用于检测点击事件是否发生在元素之外。 它可以监听文档中某处发生的点击事件。</p>

- 📦 [1.5kB 已压缩的包](/size-snapshot)。
- ⚛️ 支持传送门组件

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Example

例如，当用户在点击页面除菜单外的任何一处，您可能想隐藏一个下拉的菜单：

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

请注意，该组件仅接受一个子元素。 你可以在 [Menu 的文档章节](/components/menus/#menulist-composition) 阅读更高级的样例。

## Portal

下面的演示使用 [`传送门组件（Portal）`](/components/portal/) 将下拉菜单渲染到当前 DOM 层次之外的新的“子级树”。

{{"demo": "pages/components/click-away-listener/PortalClickAway.js"}}

## 前端（Leading edge）

默认情况下，组件响应了尾随事件（trailing events）（点击 + 触摸结束）。 然而，您可以配置它来回应一些主要的事件（leading events）（鼠标按下 + 触摸开始）。

{{"demo": "pages/components/click-away-listener/LeadingClickAway.js"}}

> ⚠️ 在此模式下，仅有文档对象滚动条上的交互被忽略。

## Unstyled

- 📦 [784 B gzipped](https://bundlephobia.com/package/@mui/base@latest)

As the component does not have any styles, it also comes with the unstyled package.

```js
import ClickAwayListener from '@mui/base/ClickAwayListener';
```
