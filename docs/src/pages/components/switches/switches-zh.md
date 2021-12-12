---
title: React Switch（开关）组件
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel, SwitchUnstyled
githubLabel: 'component: Switch'
materialDesign: 'https://material.io/components/selection-controls#switches'
---

# Switch

<p class="description">开关控制能切换单个设置的开/关两个状态。</p>

开关组件是在移动设备上调整设置的首选方式。 开关组件控制的选项，以及它所处的状态，都应该从相应的内联标签中明确说明。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本的开关

{{"demo": "pages/components/switches/BasicSwitches.js"}}

## Label

得益于 `FormControlLabel` 组件，您可以为 `Switch` 提供标签。

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Size

使用 `size` 属性来改变开关的大小。

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## Color

{{"demo": "pages/components/switches/ColorSwitches.js"}}

## Controlled

You can control the switch with the `checked` and `onChange` props:

{{"demo": "pages/components/switches/ControlledSwitches.js"}}

## 带有 FormGroup 的开关

`FormGroup` 会提供相对简单的 API 对选择控件进行分组。 但是，如果需要操作多个相关的控件，我们鼓励您使用 [Checkboxes](/components/checkboxes/) 来代替它。 (参见: [何时使用](#when-to-use))。

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Customization

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/how-to-customize/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/switch/).

## Unstyled

The switch also comes with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

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

## Label placement

You can change the placement of the label:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## When to use

- [Checkboxes vs. Switches](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibility

- 它将渲染一个带有 `checkbox` 而不是 `switch` 角色的元素，鉴于该属性尚未得到广泛支持。 请首先测试目标受众的辅助技术 (assistive technology) 是否正确支持此 role 属性。 或者您可以使用 `<Switch inputProps={{ role: 'switch' }}>` 来更改 role 属性。
- All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/api/form-control-label/)).
- When a label can't be used, it's necessary to add an attribute directly to the input component. In this case, you can apply the additional attribute (e.g. `aria-label`, `aria-labelledby`, `title`) via the `inputProps` prop.

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```
