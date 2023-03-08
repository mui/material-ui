---
product: base
title: Unstyled React Switch component and hook
components: SwitchUnstyled
githubLabel: 'component: switch'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
---

# Unstyled switch

<p class="description">Switches are UI elements that let users choose between two states—most commonly on/off.</p>

## Introduction

The `SwitchUnstyled` component provides users with a switch for toggling between two mutually exclusive states.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import SwitchUnstyled from '@mui/base/SwitchUnstyled';

export default function MyApp() {
  return <SwitchUnstyled />;
}
```

### Basics

The following demo shows how to assign styles and props to the `SwitchUnstyled` component:

{{"demo": "UnstyledSwitches.js"}}

### Anatomy

The `SwitchUnstyled` component is composed of a root `<span>` that houses three interior slots—a track, a thumb, and an input:

```html
<span class="MuiSwitch-root">
  <span class="MuiSwitch-track"></span>
  <span class="MuiSwitch-thumb"></span>
  <input type="checkbox" class="MuiSwitch-input" />
</span>
```

### Slot props

:::info
The following props are available on all non-utility Base components. See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<SwitchUnstyled component="div" />
```

Use the `components` prop to override any interior slots in addition to the root:

```jsx
<SwitchUnstyled components={{ Root: 'div', Track: 'div' }} />
```

:::warning
If the root element is customized with both the `component` and `components` props, then `component` will take precedence.
:::

Use the `componentsProps` prop to pass custom props to internal slots. The following code snippet applies a CSS class called `my-thumb` to the thumb slot:

```jsx
<SwitchUnstyled componentsProps={{ thumb: { className: 'my-thumb' } }} />
```

:::warning
Note that `componentsProps` slot names are written in lowercase (`root`) while `components` slot names are capitalized (`Root`).
:::

## Hook

```js
import { useSwitch } from '@mui/base/SwitchUnstyled';
```

The `useSwitch` hook lets you apply the functionality of `SwitchUnstyled` to a fully custom component. It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement. With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [internal slot structure](#internal-slots).
:::

### Basic example

{{"demo": "UseSwitchesBasic.js"}}

### Customized look and feel

{{"demo": "UseSwitchesCustom.js"}}

## Accessibility

To make the switch component accessible, you should ensure that the corresponding labels reflect the current state of the switch.
