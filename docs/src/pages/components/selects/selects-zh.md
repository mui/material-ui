---
title: React Select（选择器）组件
components: Select, NativeSelect
---

# Select（选择器）

<p class="description">选择器组件能从一个选项列表中去获得用户所提供的信息。</p>

## 简单的选择器

菜单位于其所点击的元素上，这样能够保证当前选定的菜单项在点击元素之上显示。

{{"demo": "pages/components/selects/SimpleSelect.js"}}

## 原生的选择器

我们允许这种模式，如此一来，选择在移动设备上使用平台的原生选择器能够改进用户体验。

{{"demo": "pages/components/selects/NativeSelects.js"}}

## Text Fields（文本输入框）

`TextField` wrapper 组件是一个完整的表单控件，包括标签，输入和帮助文本。 您可以在本节中找到具有[select模式](/components/text-fields/#select)的示例

## 自定义选择器

以下是自定义组件的一些例子。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

第一步是设置 `InputBase` 组件的样式。 一旦设置好样式，您就可以直接将其用作文本字段，也可以将其提供给 select 组件的 `input` 属性作为一个 `select` 字段。

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

## 多选

The `Select` component can handle multiple selections. It's enabled with the `multiple` property.

Like with the single selection, you can pull out the new value by accessing `event.target.value` in the `onChange` callback. It's always an array.

{{"demo": "pages/components/selects/MultipleSelect.js"}}

## 可控制地打开选择器

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## 与对话框组件使用

虽然Material Design的规范不鼓励这样做，但您还是可以在对话框组件中使用选择器。

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Grouping

Display categories with the `ListSubheader` component or the native `<optgroup>` element.

{{"demo": "pages/components/selects/GroupedSelect.js"}}

## 可访问性

To properly label your `Select` input you need an extra element with an `id` that contains a label. That `id` needs to match the `labelId` of the `Select` e.g.

```jsx
<InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</Select>
```

Alternatively a `TextField` with an `id` and `label` creates the proper markup and ids for you:

```jsx
<TextField id="select" label="Age" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</TextField>
```