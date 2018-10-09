---
title: React纸片组件
components: 纸片, 纸片视图
---
# 纸片

<p class="description">纸片视图是用来表示输入框、属性或操作的紧凑元素。</p>

[纸片](https://material.io/design/components/chips.html) 允许用户输入信息、进行选择、筛选内容或触发操作。

虽然我们将纸片包含在这里作为独立组件，但更常见的作法是用在表单中作为一种用户输入，因此本篇演示的内容并不会显示具体的上下文关联内容。

## 纸片, 纸片视图

以下是纸片的一个例子, 使用了图片， SVG 图标，“字母” (和字符串) 来作为 头像。

- 带有 `onClick` 属性的纸片定义了在获得焦点、鼠标悬浮、单击时的动画。
- 定义了`onDelete` 属性的纸片将显示一个删除图标, 并在鼠标悬浮时执行动画。

{{"demo": "pages/demos/chips/Chips.js"}}

### 轮廓纸片

轮廓纸片提供了另一种风格。

{{"demo": "pages/demos/chips/OutlinedChips.js"}}

## 纸片区块

{{"demo": "pages/demos/chips/ChipsPlayground.js"}}

## 纸片组

下面是一个通过组呈现多个纸片的示例。 删除纸片会将其从纸片组的队列中删除。 请注意，因为没有定义`onClick` 属性，所以这些纸片在被点击或触碰时可以获取焦点，但无法获取深度。

{{"demo": "pages/demos/chips/ChipsArray.js"}}