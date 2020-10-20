---
title: React Switch（开关）组件
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
githubLabel: 'component: Switch'
materialDesign: 'https://material.io/components/selection-controls#switches'
---

# Switch 开关

<p class="description">开关控制能切换单个设置的开/关两个状态。</p>

开关组件是在移动设备上调整设置的首选方式。 开关控制的选项，以及它当前所处的状态，都应该在相应的描述标签中明确说明。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本的开关

{{"demo": "pages/components/switches/Switches.js"}}

## 带有 FormControlLabel 的开关

借助 `FormControlLabel` 组件，`Switch`能够提供一些描述。

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## 带有 FormGroup 的开关

`FormGroup` 会提供相对简单的 API 对选择控件进行分组。 但是，如果需要操作多个相关的控件，我们鼓励您使用 [Checkboxes](/components/checkboxes/) 来代替它。 (参见: [何时使用](#when-to-use))。

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## 自定义样式开关

你可以参考以下一些例子来自定义组件。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

🎨 如果您还在寻找灵感，您可以查看一下 [MUI Treasury 自定义的例子](https://mui-treasury.com/components/button)。

## 尺寸

想用一些优雅的小开关？ 试着使用 `size` 属性吧。

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## 标签放置

你可以更改标签的位置:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## 什么时候使用

- [多选框 对比 Switches（开关控件）](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## 无障碍设计

- 它将渲染一个带有 `checkbox` 而不是 `switch` 角色的元素，鉴于该属性尚未得到广泛支持。 请首先测试目标受众的辅助技术 (assistive technology) 是否正确支持此 role 属性。 或者您可以使用 `<Switch inputProps={{ role: 'switch' }}>` 来更改 role 属性。
- 所有表单控件都应该带有标签，而这包括了单选按钮，复选框和开关。 在大多数情况下，这是通过使用一个 `<label>` 元素（[FormControlLabel](/api/form-control-label/)）实现的。
- 如果无法使用标签，您则必须在输入组件中直接添加属性。 在这种情况下，您可以通过 `inputProps` 属性来应用附加的属性（例如 `aria-label`, `aria-labelledby`, `title`）。

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```
