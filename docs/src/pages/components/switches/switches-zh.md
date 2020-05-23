---
title: 开关 React 组件
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Switch 开关

<p class="description">开关控制是改变单个设置状态打开或关闭的控件。</p>

[Switches](https://material.io/design/components/selection-controls.html#switches) 是在移动设备上调整设置的首选方式。 开关控制的选项，以及它当前所处的状态都应该从相应的描述标签中明确说明。

## 基本开关

{{"demo": "pages/components/switches/Switches.js"}}

## 带有 FormControlLabel 的开关

借助 `FormControlLabel` 组件，可以为 `Switch` 提供一组描述。

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## 带有 FormControlLabel 的开关组

`FormGroup`提供相对简单的 API 对选择控件进行分组。 但是，如果需要多个相关控件，建议改用 [Checkboxes](/components/checkboxes/) 。 (参见: [When to use](#when-to-use))。

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## 自定义样式开关

这是一些自定义样式开关的例子 您可以在[样式重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/switch).

## 尺寸

想要使用外观看起来比较小的开关组件 我们提供了 `size` 这个属性供您调整。

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## 标签放置

你可以更改标签的位置:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## 什么时候使用

- [复选框 对比 Switches（开关控件）](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## 可及性

- 它将渲染一个带有 `role=checkbox` 而不是 `role=switch` 的元素，但该属性尚未得到广泛支持。 请首先测试目标受众的辅助技术 (assistive technology) 是否正确支持此 role 属性。 或者您可以使用 `<Switch inputProps={{ role: 'switch' }}>` 来更改 role 属性。
- 所有表单控件都应该带有标签，而这包括了单选按钮，复选框和开关。 在大多数情况下，这是通过使用一个 `<label>` 元素（[FormControlLabel](/api/form-control-label/)）实现的。
- 如果无法使用标签，您则必须在输入组件中直接添加属性。 在这种情况下，您可以经由 `inputProps` 属性，来附着一些额外的属性（例如 `arial-label`，`aria-labelledby`，`title`）。

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```