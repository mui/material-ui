---
title: React Switch（开关）组件
<<<<<<< HEAD
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
githubLabel: 'component: Switch'
=======
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel, SwitchUnstyled
githubLabel: 'component: switch'
>>>>>>> 0f996c1ce5 ([docs] Clear the difference between UI and React components)
materialDesign: 'https://material.io/components/selection-controls#switches'
---

# Switch 开关组件

<p class="description">开关控制能切换单个设置的开/关两个状态。</p>

开关组件是在移动设备上调整设置的首选方式。 The option that the switch controls, as well as the state it's in, should be made clear from the corresponding inline label.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本的开关

{{"demo": "pages/components/switches/BasicSwitches.js"}}

## 标签

得益于 `FormControlLabel` 组件，您可以为 `Switch` 提供标签。

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Size 大小

使用 `size` 属性来改变开关的大小。

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## Color 颜色

{{"demo": "pages/components/switches/ColorSwitches.js"}}

## Controlled

You can control the switch with the `checked` and `onChange` props:

{{"demo": "pages/components/switches/ControlledSwitches.js"}}

## 带有 FormGroup 的开关

`FormGroup` 会提供相对简单的 API 对选择控件进行分组。 `FormGroup` 会提供相对简单的 API 对选择控件进行分组。 (参见: [何时使用](#when-to-use))。

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## 自定义样式开关

你可以参考以下一些例子来自定义组件。 您可以在 [重写文档页面](/customization/how-to-customize/) 中了解更多有关此内容的信息。

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/switch/).

## 标签放置

The switch also comes with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

### Unstyled component

```jsx
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
```

The `SwitchUnstyled` component provides default components and assigns CSS classes you can style entirely on your own. You are free to choose any styling solution - plain CSS classes, a CSS framework, Emotion, etc. It is also possible to replace these default components by other HTML elements or custom components.

There are three components you can override by the `components` prop: `Root`, `Thumb` and `Input`. Each one's props can be set using the `componentsProps` object.

{{"demo": "pages/components/switches/UnstyledSwitches.js"}}

### useSwitch hook

For the ultimate customizability, a `useSwitch` hook is available. It accepts almost the same options as the SwitchUnstyled component minus the `component`, `components`, and `componentsProps` props.

```jsx
import { useSwitch } from '@mui/base/SwitchUnstyled';
```

#### Basic example

{{"demo": "pages/components/switches/UseSwitchesBasic.js"}}

#### Customized look and feel

{{"demo": "pages/components/switches/UseSwitchesCustom.js"}}

## 何时使用

你可以更改标签的位置：

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## 无障碍设计

- [多选框 对比 Switches（开关控件）](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibility

- 它将渲染一个带有 `checkbox` 而不是 `switch` 角色的元素，鉴于该属性尚未得到广泛支持。 请首先测试目标受众的辅助技术 (assistive technology) 是否正确支持此 role 属性。 或者您可以使用 `<Switch inputProps={{ role: 'switch' }}>` 来更改 role 属性。
- 所有表单控件都应该带有标签，而这包括了单选按钮，复选框和开关。 在大多数情况下，这是通过使用一个 `<label>` 元素（[FormControlLabel](/api/form-control-label/)）实现的。
- 如果无法使用标签，您则必须在输入组件中直接添加属性。 在这种情况下，您可以通过 `inputProps` 属性来应用附加的属性（例如 `aria-label`, `aria-labelledby`, `title`）。

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```
