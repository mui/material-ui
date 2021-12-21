---
title: React Chip（纸片）组件
components: Chip
githubLabel: 'component: Chip'
materialDesign: https://material.io/components/chips
---

# Chip 纸片组件

<p class="description">纸片组件是用来表示输入框、属性或操作的紧凑元素。</p>

纸片组件允许用户输入信息、进行选择、过滤内容或触发动作。

While included here as a standalone component, the most common use will be in some form of input, so some of the behavior demonstrated here is not shown in context.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic chip

The `Chip` component supports outlined and filled styling.

{{"demo": "pages/components/chips/BasicChips.js"}}

## Chip actions

You can use the following actions.

- Chips with the `onClick` prop defined change appearance on focus, hover, and click.
- Chips with the `onDelete` prop defined will display a delete icon which changes appearance on hover.

### Clickable

{{"demo": "pages/components/chips/ClickableChips.js"}}

### Deletable

{{"demo": "pages/components/chips/DeletableChips.js"}}

### Clickable and deletable

{{"demo": "pages/components/chips/ClickableAndDeletableChips.js"}}

### Clickable link

{{"demo": "pages/components/chips/ClickableLinkChips.js"}}

### Custom delete icon

{{"demo": "pages/components/chips/CustomDeleteIconChips.js"}}

## Chip adornments

您可以在组件的开头添加修饰。

使用`avatar`属性来添加一个头像，或是使用`icon`属性添加一个图标。

### Avatar chip

{{"demo": "pages/components/chips/AvatarChips.js"}}

### Icon chip

{{"demo": "pages/components/chips/IconChips.js"}}

## Color chip

You can use the `color` prop to define a color from theme palette.

{{"demo": "pages/components/chips/ColorChips.js"}}

## Sizes chip

您可以借助 `size` 属性来定义一个小型纸片组件。

{{"demo": "pages/components/chips/SizesChips.js"}}

## 纸片阵列

An example of rendering multiple chips from an array of values. 删除一个纸片元素，则会将其从纸片组的数组中删除。 Note that since no `onClick` prop is defined, the `Chip` can be focused, but does not gain depth while clicked or touched.

{{"demo": "pages/components/chips/ChipsArray.js", "bg": true}}

## Chip playground

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideToolbar": true}}

## Accessibility

如果 Chip 是可删除或可点击的，它则应该是一个安装标签顺序排列的按钮。 当纸片被聚焦时（例如在制表符时），释放（`keyup` 事件） `Backspace` 或 `Delete` 将调用 `onDelete` 处理程序，从而通过释放 `Escape` 来模糊纸片组件。
