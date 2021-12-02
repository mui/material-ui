---
title: React Stack component
components: Stack 堆叠
githubLabel: 'component: Stack'
---

# Stack 堆叠

<p class="description">The Stack component manages layout of immediate children along the vertical or horizontal axis with optional spacing and/or dividers between each child.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 使用

`Stack` 关注一维布局，而 [Grid](/components/grid/) 处理二维布局。 默认方向是垂直堆叠子项的 `列`。

{{"demo": "pages/components/stack/BasicStack.js", "bg": true}}

要控制子组件之间的空间，请使用 `spacing` 属性。 间距值可以是任何数字，包括小数（浮点数）和任何字符串（文字）。 该属性借助 [`theme.spaming()`](/customization/spacing/) 被转换为 CSS 属性。

## 方向

By default, `Stack` arranges items vertically in a `column`. However, the `direction` prop can be used to position items horizontally in a `row` as well.

{{"demo": "pages/components/stack/DirectionStack.js", "bg": true}}

## Dividers（分隔线）

Use the `divider` prop to insert an element between each child. This works particularly well with the [Divider](/components/dividers/) component.

{{"demo": "pages/components/stack/DividerStack.js", "bg": true}}

## 响应式的值

You can switch the `direction` or `spacing` values based on the active breakpoint.

{{"demo": "pages/components/stack/ResponsiveStack.js", "bg": true}}

## 交互式

下面是一个交互式的演示，你也可以探索不同设置下的视觉结果：

{{"demo": "pages/components/stack/InteractiveStack.js", "hideToolbar": true, "bg": true}}

## 系统属性

As a CSS utility component, the `Stack` supports all [`system`](/system/properties/) properties. You can use them as props directly on the component. For instance, a margin-top:

```jsx
<Stack mt={2}>
```
