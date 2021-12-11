---
title: React Stack component
components: Stack
githubLabel: 'component: Stack'
---

# Stack 堆叠

<p class="description">Stack 组件管理沿垂直或水平轴的子组件的布局，每个子组件之间有可选的间距和/或分隔线。</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Usage

`Stack` 关注一维布局，而 [Grid](/components/grid/) 处理二维布局。 默认方向是垂直堆叠子项的 `列`。

{{"demo": "pages/components/stack/BasicStack.js", "bg": true}}

To control space between children, use the `spacing` prop. 间距值可以是任何数字，包括小数（浮点数）和任何字符串（文字）。 The prop is converted into a CSS property using the [`theme.spacing()`](/customization/spacing/) helper.

## Direction

默认情况下， `Stack` 将项目垂直安排在 `column` 中。 然而， `direction` prop 也可以用来将项目水平定位在 `row` 中。

{{"demo": "pages/components/stack/DirectionStack.js", "bg": true}}

## Dividers（分隔线）

使用 `divider` prop 在每个子节之间插入一个元素。 在 [Divider](/components/dividers/) 组件中运行得尤其好。

{{"demo": "pages/components/stack/DividerStack.js", "bg": true}}

## Responsive values

您可以根据活动断点切换 `direction` 或 `spacing` 值。

{{"demo": "pages/components/stack/ResponsiveStack.js", "bg": true}}

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "pages/components/stack/InteractiveStack.js", "hideToolbar": true, "bg": true}}

## System props

作为一个 CSS 实用组件, `Stack` 支持所有 [`system`](/system/properties/) 属性。 您可以直接在组件上使用它们作为props。 例如，顶边距：

```jsx
<Stack mt={2}>
```
