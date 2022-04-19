---
product: base
title: Unstyled React Switch component and hook
components: SwitchUnstyled
githubLabel: 'component: switch'
waiAria: https://www.w3.org/TR/wai-aria-practices/#switch
packageName: '@mui/base'
---

# Unstyled switch

<p class="description">The `SwitchUnstyled` component lets your users toggle the state of a single setting.</p>

Switches can be used on either desktop or mobile, but they are the preferred method for toggling on mobile UIs.

To make the switch accessible, you should ensure that the corresponding label reflects the current state of the switch.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## SwitchUnstyled

```jsx
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
```

The `SwitchUnstyled` component provides default components and assigns respective CSS classes for styling.

There are three components you can override with the `components` prop: `Root`, `Thumb` and `Input`.
You can set the props for each one using the `componentsProps` object.

{{"demo": "UnstyledSwitches.js"}}

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
