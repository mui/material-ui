---
title: 复选、单选、开关 React 组件
components: FormControl, FormGroup, FormLabel, FormControlLabel, RadioGroup, Checkbox, Radio, Switch
---
# 选项控件

<p class="description">选项控件允许用户选择选项。</p>

[选择控件](https://material.io/design/components/selection-controls.html) 允许用户完成涉及选择选项, 或打开或关闭设置等选项的任务。 选择控件一般用于让用户作出选择，或者在设置或者对话框上声明偏好。

这里将覆盖三种不同种类的选择控件：

- **[单选按钮](#radio-buttons)** 允许从一组中选择一个选项。
- **[复选框](#checkboxes)**允许从一组中选择多个选项。
- **[开关控件](#switches)** 允许打开或关闭选项。

## 单选按钮

[ 单选按钮](https://material.io/design/components/selection-controls.html#radio-buttons)允许用户从集合中选择一个或多个项。 当用户需要查看所有可用选项时, 请使用单选按钮。 如果可用选项可以折叠，请考虑使用占用空间更少的下拉菜单。

单选按钮在一般默认选中最常用的选项。

`RadioGroup `适用于一组` Radio `，它提供相对简单的 API 并且能够使用键盘对该RadioGroup进行控制。

{{"demo": "pages/demos/selection-controls/RadioButtonsGroup.js"}}

### 独立的单选按钮

`Radio` 也可以单独使用，无需额外包装。

{{"demo": "pages/demos/selection-controls/RadioButtons.js"}}

## 复选框

[ 复选框 ](https://material.io/design/components/selection-controls.html#checkboxes) 允许用户从集合中选择一个或多个项。 复选框可用于打开或关闭选项。

如果列表中有多个选择项, 则可以使用复选框替代开关控件来节省空间。 如果只有单个选择项, 请避免使用复选框, 改用开关控件。

{{"demo": "pages/demos/selection-controls/Checkboxes.js"}}

通过 `FormControlLabel` 组件, `复选框` 也可与标签描述一起使用。

{{"demo": "pages/demos/selection-controls/CheckboxLabels.js"}}

## 使用FromGroup控制多个Checkbox

`FormGroup`提供相对简单的 API 对选择控件进行分组。

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

⚠️虽然材料设计规范鼓励主题，但这些例子是不合适的。

{{"demo": "pages/demos/selection-controls/CustomizedSwitches.js"}}

## 标签放置

你可以更改标签放置的位置:

{{"demo": "pages/demos/selection-controls/FormControlLabelPosition.js"}}

## 无障碍功能

所有表单控件都应该有标签，这包括单选按钮，复选框和开关。 在大多数情况下，这是通过使用 `<label>` 元素（[FormControlLabel](/api/form-control-label/)）完成的。

如果无法使用标签，则必须直接向输入组件添加属性。 在这种情况下，可以应用附加的属性（例如 `arial-label`， `aria-labelledby`， `title`）经由 `inputProps` 属性。

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': '复选框 A' }}
/>
```