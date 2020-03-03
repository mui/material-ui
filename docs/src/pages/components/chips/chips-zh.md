---
title: React Chip（纸片）组件
components: Chip
---

# Chip 纸片组件

<p class="description">纸片组件是用来表示输入框、属性或操作的紧凑元素。</p>

[纸片组件](https://material.io/design/components/chips.html) 允许用户输入信息、进行选择、筛选内容或触发操作。

在这里，虽然我们将纸片组件归类为一个独立的组件，但更常见的作法是用在表单中作为输入框，因此本篇演示的内容并不会在上下文中显示。

## Chip（纸片组件）

以下是纸片组件的一个例子，它使用了图片，SVG 图标，“字母” 和（带有字符串的）头像。

- 定义了`onClick` 属性的纸片组件会在获得焦点、鼠标悬浮、单击时有外观的变化。
- 定义了`onDelete` 属性的纸片组件将显示一个删除图标，并在鼠标悬浮时有外观的变化。

{{"demo": "pages/components/chips/Chips.js"}}

### 描边纸片

描边纸片展示了另一种风格。

{{"demo": "pages/components/chips/OutlinedChips.js"}}

## 纸片阵列

下面是一个通过数组呈现多个纸片的示例。 删除一个纸片元素，则会将其从纸片组的数组中删除。 请注意，既然 `onClick` 属性并没有被定义过，所以这些纸片在被点击或触碰时可以被对焦，但不会在立体和阴影上有所变化。

{{"demo": "pages/components/chips/ChipsArray.js", "bg": true}}

## 小型纸片组件

您可以借助 `size` 属性来定义一个小型纸片组件。

### 默认的变体

{{"demo": "pages/components/chips/SmallChips.js"}}

### 描边的变体

{{"demo": "pages/components/chips/SmallOutlinedChips.js"}}

## 在线编译纸片组件

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideHeader": true}}

## 可访问性

If the Chip is deletable or clickable then it is a button in tab order. When the Chip is focused (e.g. when tabbing) releasing (`keyup` event) `Backspace` or `Delete` will call the `onDelete` handler while releasing `Escape` will blur the Chip.