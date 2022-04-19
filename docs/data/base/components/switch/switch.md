---
product: base
title: Unstyled React Switch component and hook
components: SwitchUnstyled
githubLabel: 'component: switch'
waiAria: https://www.w3.org/TR/wai-aria-practices/#switch
packageName: '@mui/base'
---

# Unstyled switch

<p class="description">The `SwitchUnstyled` component provides users with a toggle button for choosing one from a predefined set of options.</p>

Switches can be used on either desktop or mobile, but they are the preferred method for toggling on mobile UIs.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## SwitchUnstyled

```jsx
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
```

## Basic switch

The `SwitchUnstyled` component is composed of three interior components—`Root`, `Thumb` and `Input`—and it assigns CSS classes for styling each piece, respectively.

You can set the props for these interior components using the `componentsProps` object.

You can also override them entirely with the `components` prop.

The following demo shows how to assign styles and props to the interior components of the `SwitchUnstyled` component:

{{"demo": "UnstyledSwitches.js"}}

## Accessibility

To make the `SwitchUnstyled` component accessible, you should ensure that the corresponding labels reflect the current state of the switch.

## The useSwitch hook

```js
import { useSwitch } from '@mui/base/SwitchUnstyled';
```

The `useSwitch` hook lets you use the functionality of `SwitchUnstyled` in other components.

It accepts the same options as the `SwitchUnstyled` component, aside from the `component`, `components`, and `componentsProps` props.

### Basic example

{{"demo": "UseSwitchesBasic.js"}}

### Customized look and feel

{{"demo": "UseSwitchesCustom.js"}}
