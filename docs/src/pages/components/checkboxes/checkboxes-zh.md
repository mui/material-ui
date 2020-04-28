---
title: React Checkbox 多选框组件
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Checkbox 多选框

<p class="description">在一个集合内，用户可以通过多选框组件进行一项或者多项选择。</p>

[多选框](https://material.io/design/components/selection-controls.html#checkboxes)可以在打开或者关闭一个选项中切换。

若一个列表存在多个选择项时，使用多选框替代开关控件，可以节省空间。 若只存在一个选择项，请避免使用多选框，而改用开关控件。

## 简单多选框

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

## 带有 FormControlLabel 的多选框

借助 `FormControlLabel` 组件，`多选框组件`可以和标签一起使用。 

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## 使用表单组（FormGroup）控制多个多选框

`FormGroup` 会提供相对简单的 API 对选择控件进行分组。

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## 标签放置

你可以更改标签的位置:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## 自定义的多选框

以下是自定义此组件的一个示例。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/checkboxes/CustomizedCheckbox.js", "defaultCodeOpen": false}}

## 什么时候使用

- [复选框 对比 单选按钮（Radio Buttons）](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [复选框 对比 Switches（开关控件）](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## 无障碍设计

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox)

- 所有表单控件都应该带有标签，而这包括了单选按钮，复选框和开关。 在大多数情况下，这是通过使用一个 `<label>` 元素（[FormControlLabel](/api/form-control-label/)）实现的。
- 如果无法使用标签，您则必须在输入组件中直接添加属性。 在这种情况下，您可以经由 `inputProps` 属性，来附着一些额外的属性（例如 `arial-label`，`aria-labelledby`，`title`）。

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' }}
/>
```