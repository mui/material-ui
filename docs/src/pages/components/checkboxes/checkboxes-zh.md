---
title: React Checkbox（复选框）组件
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Checkboxes（复选框）

<p class="description">在一个集合内，用户可以通过复选框来选择一个或者多个选项。</p>

[复选框](https://material.io/design/components/selection-controls.html#checkboxes) 用于打开或者关闭一个选项。

如果列表中有多个选择项，则可以使用复选框替代开关控件来节省空间。 如果您只需要一个选择项，请避免使用复选框，而改用开关控件。

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

通过 `FormControlLabel` 组件，`复选框` 也可与标签描述一起使用。

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## 使用 FormGroup（表单组）控制多个复选框

`FormGroup` 会提供相对简单的 API 对选择控件进行分组。

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## 放置标签

你可以更改标签的位置:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## 可及性

所有表单控件都应该带有标签，而这包括了单选按钮，复选框和开关。 在大多数情况下，这是通过使用一个`<label>`元素（[FormControlLabel](/api/form-control-label/)）实现的。

如果无法使用标签，则必须直接在输入组件中添加属性。 在这种情况下，您可以通过`inputProps` 属性，来附着一些附加的属性（例如 `arial-label`，`aria-labelledby`，`title`）。

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': '复选框 A' }}
/>
```

## 指导

- [复选框 对比 单选按钮](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)