---
product: material-ui
title: React Switch（开关）组件
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
githubLabel: 'component: switch'
materialDesign: 'https://m2.material.io/components/selection-controls#switches'
unstyled: /base/react-switch/
---

# Switch 开关组件

<p class="description">开关控制能切换单个设置的开/关两个状态。</p>

开关组件是在移动设备上调整设置的首选方式。 The option that the switch controls, as well as the state it's in, should be made clear from the corresponding inline label.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本的开关

{{"demo": "BasicSwitches.js"}}

## 标签

得益于 `FormControlLabel` 组件，您可以为 `Switch` 提供标签。

{{"demo": "SwitchLabels.js"}}

## Size 大小

使用 `size` 属性来改变开关的大小。

{{"demo": "SwitchesSize.js"}}

## Color 颜色

{{"demo": "ColorSwitches.js"}}

## Controlled

You can control the switch with the `checked` and `onChange` props:

{{"demo": "ControlledSwitches.js"}}

## 带有 FormGroup 的开关

`FormGroup` is a helpful wrapper used to group selection controls components that provides an easier API. However, you are encouraged to use [Checkboxes](/material-ui/react-checkbox/) instead if multiple related controls are required. (参见: [何时使用](#when-to-use))。

{{"demo": "SwitchesGroup.js"}}

## 自定义样式开关

你可以参考以下一些例子来自定义组件。 You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedSwitches.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/switch/).

## Label placement

You can change the placement of the label:

{{"demo": "FormControlLabelPosition.js"}}

## When to use

- [多选框 对比 Switches（开关控件）](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibility

- 它将渲染一个带有 `checkbox` 而不是 `switch` 角色的元素，鉴于该属性尚未得到广泛支持。 请首先测试目标受众的辅助技术 (assistive technology) 是否正确支持此 role 属性。 或者您可以使用 `<Switch inputProps={{ role: 'switch' }}>` 来更改 role 属性。
- 所有表单控件都应该带有标签，而这包括了单选按钮，复选框和开关。 In most cases, this is done by using the `<label>` element ([FormControlLabel](/material-ui/api/form-control-label/)).
- 如果无法使用标签，您则必须在输入组件中直接添加属性。 在这种情况下，您可以通过 `inputProps` 属性来应用附加的属性（例如 `aria-label`, `aria-labelledby`, `title`）。

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```
