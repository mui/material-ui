---
product: material-ui
title: React Chip（纸片）组件
components: Chip
githubLabel: 'component: chip'
materialDesign: https://m2.material.io/components/chips
---

# Chip

<p class="description">纸片组件是用来表示输入框、属性或操作的紧凑元素。</p>

纸片组件允许用户输入信息、进行选择、过滤内容或触发动作。

在这里，虽然我们将纸片组件归类为一个独立的组件，但更常见的作法是用在表单中作为输入框，因此本篇演示的内容并不会在上下文中显示。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic chip

The `Chip` component supports outlined and filled styling.

{{"demo": "BasicChips.js"}}

## Chip actions

You can use the following actions.

- Chips with the `onClick` prop defined change appearance on focus, hover, and click.
- Chips with the `onDelete` prop defined will display a delete icon which changes appearance on hover.

### Clickeable

{{"demo": "ClickeableChips.js"}}

### Deleteable

{{"demo": "DeleteableChips.js"}}

### Clickeable and deleteable

{{"demo": "ClickeableAndDeleteableChips.js"}}

### Clickeable link

{{"demo": "ClickeableLinkChips.js"}}

### Custom delete icon

{{"demo": "CustomDeleteIconChips.js"}}

## Chip adornments

您可以在组件的开头添加修饰。

Use the `avatar` prop to add an avatar or use the `icon` prop to add an icon.

### Avatar chip

{{"demo": "AvatarChips.js"}}

### Icon chip

{{"demo": "IconChips.js"}}

## Color chip

You can use the `color` prop to define a primary or secondary color.

{{"demo": "ColorChips.js"}}

## Sizes chip

您可以借助 `size` 属性来定义一个小型纸片组件。

{{"demo": "SizesChips.js"}}

## 纸片阵列

An example of rendering multiple chips from an array of values. 删除一个纸片元素，则会将其从纸片组的数组中删除。 删除一个纸片元素，则会将其从纸片组的数组中删除。 Note that since no `onClick` prop is defined, the `Chip` can be focused, but does not gain depth while clicked or touched.

{{"demo": "ChipsArray.js", "bg": true}}

## Chip playground

{{"demo": "ChipsPlayground.js", "hideToolbar": true}}

## 无障碍设计

如果 Chip 是可删除或可点击的，它则应该是一个安装标签顺序排列的按钮。 当纸片被聚焦时（例如在制表符时），释放（`keyup` 事件） `Backspace` 或 `Delete` 将调用 `onDelete` 处理程序，从而通过释放 `Escape` 来模糊纸片组件。
