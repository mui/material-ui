---
title: React Chip（纸片）组件
components: Chip
---

# Chips（纸片组件）

<p class="description">纸片组件是用来表示输入框、属性或操作的紧凑元素。</p>

[纸片组件](https://material.io/design/components/chips.html) 允许用户输入信息、进行选择、筛选内容或触发操作。

虽然我们将纸片包含在这里作为独立组件，但更常见的作法是用在表单中作为一种用户输入，因此本篇演示的内容并不会显示具体的上下文关联内容。

## 纸片组件

以下是纸片组件的一个例子，它使用了图片，SVG 图标，“字母” 和（带有字符串的）头像。

- 定义了`onClick` 属性的纸片组件会在获得焦点、鼠标悬浮、单击时有外观的变化。
- 定义了`onDelete` 属性的纸片组件将显示一个删除图标, 并在鼠标悬浮时有外观的变化。

{{"demo": "pages/components/chips/Chips.js"}}

### 描边纸片

描边纸片展示了另一种风格。

{{"demo": "pages/components/chips/OutlinedChips.js"}}

## 纸片阵列

下面是一个通过数组呈现多个纸片的示例。 删除纸片会将其从纸片组的数组中删除。 请注意，因为没有定义 `onClick` 属性，所以这些纸片在被点击或触碰时可以被对焦，但不会产生立体和阴影变化。

{{"demo": "pages/components/chips/ChipsArray.js"}}

## Small Chip

You can use the `size` prop to define a small Chip.

### Default variant

{{"demo": "pages/components/chips/SmallChips.js"}}

### Outlined variant

{{"demo": "pages/components/chips/SmallOutlinedChips.js"}}

## 纸片演练

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideHeader": true}}