---
title: 复选、单选、开关 React 组件
components: FormControl, FormGroup, FormLabel, FormControlLabel, RadioGroup, Checkbox, Radio, Switch
---
# 选项控件

<p class="description">选项控件允许用户选择选项。</p>

[选择控件](https://material.io/design/components/selection-controls.html) 允许用户完成涉及选择选项, 或打开或关闭设置等选项的任务。 选择控件一般用于让用户作出选择，或者在设置或者对话框上声明偏好。

这里将覆盖三种不同种类的选择控件：

- **[Radio Buttons](#radio-buttons)** allow the selection of a single option from a set.
- **[Checkboxes](#checkboxes)** allow the selection of multiple options from a set.
- **[开关控件](#switches)** 允许打开或关闭选项。

## Radio Buttons

[Radio buttons](https://material.io/design/components/selection-controls.html#radio-buttons) allow the user to select one option from a set. Use radio buttons when the user needs to see all available options. If available options can be collapsed, consider using a dropdown menu because it uses less space.

Radio buttons should have the most commonly used option selected by default.

`RadioGroup` is a helpful wrapper used to group `Radio` components that provides an easier API, and proper keyboard accessibility to the group.

{{"demo": "pages/demos/selection-controls/RadioButtonsGroup.js"}}

### 独立的单选按钮

`Radio` can also be used standalone, without the wrapper.

{{"demo": "pages/demos/selection-controls/RadioButtons.js"}}

## Checkboxes

[Checkboxes](https://material.io/design/components/selection-controls.html#checkboxes) allow the user to select one or more items from a set. Checkboxes can be used to turn an option on or off.

If you have multiple options appearing in a list, you can preserve space by using checkboxes instead of on/off switches. If you have a single option, avoid using a checkbox and use an on/off switch instead.

{{"demo": "pages/demos/selection-controls/Checkboxes.js"}}

`Checkbox` can also be used with a label description thanks to the `FormControlLabel` component.

{{"demo": "pages/demos/selection-controls/CheckboxLabels.js"}}

## Checkboxes with FormGroup

`FormGroup` is a helpful wrapper used to group selection controls components that provides an easier API.

{{"demo": "pages/demos/selection-controls/CheckboxesGroup.js"}}

## 开关控件

[Switch](https://material.io/design/components/selection-controls.html#switches) 可以切换某一项设置的开关状态，它非常适合在手机上更改设置。

开关控制的选项，以及它当前所处的状态都应该从相应的描述标签中明确说明。

{{"demo": "pages/demos/selection-controls/Switches.js"}}

### 多个 Switch 和 FormControlLabel 的使用

通过使用` FormControlLabel ` 组件, ` Switch ` 也可与标签描述一起使用。

{{"demo": "pages/demos/selection-controls/SwitchLabels.js"}}

### 多个 Switch 情况下使用 FormGroup

`FormGroup `可以提供相对简单的 API 对选项组进行控制，但是我们更鼓励在这种情况下使用[CheckBox](#checkboxes)

{{"demo": "pages/demos/selection-controls/SwitchesGroup.js"}}

### 自定义 Switch

如果您有阅读[覆盖样式文档](/customization/overrides/)，但你还没有完全掌握方法，可以查看以下这个更改一个输入的主要颜色的示例，包括如何更改 Switch 的样式和自定义出一个 iOS 风格的 Switch

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/selection-controls/CustomizedSwitches.js"}}

## 标签放置

You can change the placement of the label:

{{"demo": "pages/demos/selection-controls/FormControlLabelPosition.js"}}

## 无障碍功能

All form controls should have a label to identify it, this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/api/form-control-label/)).

When a label can't be used, it's necessary to add an attribute directly to the input component. In this case, you can apply the additional attribute (e.g. `aria-label`, `aria-labelledby`, `title`) via the `inputProps` property.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' } }
/>
```