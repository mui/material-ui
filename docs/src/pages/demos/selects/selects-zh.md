---
title: React 选择器组件
components: Select, NativeSelect
---
# 选择器

<p class="description">选择器组件用于从选项列表中去获得用户所提供的信息。</p>

## 简单选择器

菜单位于其所点击的元素上, 使得当前选定的菜单项显示在点击元素上。

{{"demo": "pages/demos/selects/SimpleSelect.js"}}

## 原生的选择器

由于可以使用平台的原生选择器在移动设备上改进用户体验，我们允许这种模式。

{{"demo": "pages/demos/selects/NativeSelects.js"}}

## Customized selects

如果您有阅读[重写文档](/customization/overrides/) 但你还不是很自信能够完全掌握， 以下是如何更改一个输入的主要颜色的示例

⚠️虽然材料设计规范鼓励主题，但这些例子是不合适的。

{{"demo": "pages/demos/selects/CustomizedSelects.js"}}

## 多选

`Select`组件可以处理多个选择，可以使用`multiple` 属性启用

与单项选择一样，您可以通过访问` onChange `属性中的回调` event.target.value `来提取新值。它总是一个数组。

{{"demo": "pages/demos/selects/MultipleSelect.js"}}

## 受控的选择器

{{"demo": "pages/demos/selects/ControlledOpenSelect.js"}}

## 与对话框组件使用

虽然Material Design的规范不鼓励，但您可以在对话框组件中使用选择。

{{"demo": "pages/demos/selects/DialogSelect.js"}}

## Text Fields

` TextField `包装器组件是一个完整的表单控件，包括标签，输入和帮助文本。 您可以在本节中找到具有[select模式](/demos/text-fields/#textfield)的示例