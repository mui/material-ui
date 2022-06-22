---
product: base
title: Unstyled React Switch component and hook
components: SwitchUnstyled
githubLabel: 'component: switch'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
packageName: '@mui/base'
---

# Unstyled switch

<p class="description">Switches are UI elements that let users choose between two states—most commonly on/off.</p>

## Introduction

The `SwitchUnstyled` component provides users with a switch for toggling between two mutually exclusive states.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Anatomy

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import SwitchUnstyled from '@mui/base/SwitchUnstyled';

export default function MyApp() {
  return <SwitchUnstyled />;
}
```

### Basic usage

The `SwitchUnstyled` component is composed of a root `<span>` that houses three interior elements—a track, a thumb, and an input—and it assigns CSS classes for styling each piece:

```html
<span class="MuiSwitch-root Mui-checked">
  <span class="MuiSwitch-track"></span>
  <span class="MuiSwitch-thumb"></span>
  <input type="checkbox" aria-label="Demo switch" class="MuiSwitch-input" checked />
</span>
```

You can set the props for these interior components using the `componentsProps` object.

You can also override them entirely with the `components` prop, to replace them with other HTML elements or custom components.

The following demo shows how to assign styles and props to the interior elements of the `SwitchUnstyled` component:

{{"demo": "UnstyledSwitches.js"}}

## Accessibility

To make the `SwitchUnstyled` component accessible, you should ensure that the corresponding labels reflect the current state of the switch.

## Hook

```js
import { useSwitch } from '@mui/base/SwitchUnstyled';
```

The `useSwitch` hook lets you use the functionality of `SwitchUnstyled` in other components.
This hook gives you the most customization options, but requires more work to implement.
Using the hook allows you to take full control over the rendered components, their props and CSS classes.

It accepts the same options as the `SwitchUnstyled` component, aside from the `component`, `components`, and `componentsProps` props.

### Basic example

{{"demo": "UseSwitchesBasic.js"}}

### Customized look and feel

{{"demo": "UseSwitchesCustom.js"}}
