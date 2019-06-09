---
title: Switch React component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# 开关控件

<p class="description">开关控制是改变单个设置状态打开或关闭的控件。</p>

[开关控件](https://material.io/design/components/selection-controls.html#switches) 是在移动设备上调整设置的首选方式。 开关控制的选项，以及它当前所处的状态都应该从相应的描述标签中明确说明。

{{"demo": "pages/components/switches/Switches.js"}}

## 多个 Switch 和 FormControlLabel 的使用

通过使用` FormControlLabel ` 组件, ` Switch ` 也可与标签描述一起使用。

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## 多个 Switch 情况下使用 FormGroup

`FormGroup`提供相对简单的 API 对选择控件进行分组。 但在这种情况下我们更建议您使用 [复选框](#checkboxes)。

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## 自定义样式开关

这是一些自定义样式开关的例子 您可以在[样式重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

## 标签放置

你可以更改标签放置的位置:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## 无障碍功能

所有表单控件都应该带有标签，而这包括了单选按钮，复选框和开关。 在大多数情况下，这是通过使用一个 `<label>` 元素（[FormControlLabel](/api/form-control-label/)）实现的。

如果无法使用标签，则必须直接在输入组件中添加属性。 在这种情况下，可以应用附加的属性（例如 `arial-label`， `aria-labelledby`， `title`）经由 `inputProps` 属性。

```jsx
<Switch
  value="checkedA"
  inputProps={{ 'aria-label': 'Switch A' } }
/>
```