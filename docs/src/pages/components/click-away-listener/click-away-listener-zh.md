---
title: 检测 React 组件外部的单击事件
components: ClickAwayListener
---

# Click away listener 他处点击监听器

<p class="description">用于检测点击事件是否发生在元素之外。 它可以监听文档中某处发生的点击事件。</p>

- 📦 [1.5kB 已压缩的包](/size-snapshot)。
- ⚛️ 支持门户网站

## 示例

例如，当用户在点击页面除菜单外的任何一处，您可能想隐藏一个下拉的菜单：

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

请注意，该组件仅接受一个子元素。 你可以在 [Menu 的文档部分](/components/menus/#menulist-composition) 找到更高级的样例。

## Portal

下面的演示使用 [`Portal`](/components/portal/) 将下拉菜单渲染到当前DOM层次之外的新的“子树”。

{{"demo": "pages/components/click-away-listener/PortalClickAway.js"}}

## 前缘 Leading edge

默认情况下，组件响应尾随事件 (trailing events) (点击 + 触摸结束)。 然而，您可以配置它来应对主要事件(leading events) (鼠标按下 + 触摸开始)。

{{"demo": "pages/components/click-away-listener/LeadingClickAway.js"}}

> ⚠️ 在此模式下，仅有文档对象的滚动条上 (the scrollbar of the document) 的交互被忽略。