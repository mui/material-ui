---
product: material-ui
title: React Checkbox（选择框）组件
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
materialDesign: 'https://m2.material.io/components/selection-controls#checkboxes'
githubLabel: 'component: checkbox'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
---

# Checkbox 选择框

<p class="description">在一个集合内，用户可以通过多选框组件进行一项或者多项选择。</p>

多选框可用于打开或关闭选项。

若一个列表存在多个选择项时，使用多选框替代开关控件，可以节省空间。 若只存在一个选择项，请避免使用多选框，而改用开关控件。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 简单的多选框

{{"demo": "Checkboxes.js"}}

## 标签

使用 `FormControlLabel` 组件，您可以为 `Checkbox`设置一个标签。

{{"demo": "CheckboxLabels.js"}}

## Size 大小

使用 `size` 属性或调整 svg 图标的字体大小以更改复选框的大小。

{{"demo": "SizeCheckboxes.js"}}

## Color 颜色

{{"demo": "ColorCheckboxes.js"}}

## 图标

{{"demo": "IconCheckboxes.js"}}

## Controlled

您可以使用 `checked` 和 `onChange` 属性控制复选框：

{{"demo": "ControlledCheckbox.js"}}

## 不确定的状态

多选框在表单中只能存在两种状态：已选中或未选中。 在其状态下提交的值只有存在和空两种形式。 Visually, there are **three** states a checkbox can be in: checked, unchecked, or indeterminate.

{{"demo": "IndeterminateCheckbox.js"}}

:::warning
⚠️ When indeterminate is set, the value of the `checked` prop only impacts the form submitted values. It has no accessibility or UX implications.
:::

## 表单组

`FormGroup` 是一个用于对选择控件进行分组的有益的容器

{{"demo": "CheckboxesGroup.js"}}

## 标签放置

You can change the placement of the label:

{{"demo": "FormControlLabelPosition.js"}}

## 自定义的多选框

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedCheckbox.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/checkbox/).

## 什么时候使用

- [多选框 对比 单选按钮（Radio Buttons）](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [多选框 对比 Switches（开关控件）](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## 无障碍设计

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

- 所有表单控件都应该带有标签，而这包括了单选按钮，复选框和开关。 In most cases, this is done by using the `<label>` element ([FormControlLabel](/material-ui/api/form-control-label/)).
- 如果无法使用标签，您则必须在输入组件中直接添加属性。 在这种情况下，您可以通过 `inputProps` 属性来应用附加的属性（例如 `aria-label`, `aria-labelledby`, `title`）。

```jsx
<Checkbox
  value="checkedA"
  inputProps={{
    'aria-label': 'Checkbox A',
  }}
/>
```
