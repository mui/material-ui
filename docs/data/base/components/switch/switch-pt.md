---
product: base
title: React Switch component
components: SwitchUnstyled
githubLabel: 'component: switch'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#switch'
packageName: '@mui/base'
---

# Switch

<p class="description">The Switch component lets you toggle the state of a single setting on or off.</p>

Switches can be used on either desktop or mobile but it has been the preferred way for toggling settings in the latter. To make the switch accessible, you should ensure the corresponding label reflects the current state of the switch.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## SwitchUnstyled

```jsx
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
```

The `SwitchUnstyled` component provides default components and assigns CSS classes you can style entirely on your own. You are free to choose any styling solution - plain CSS classes, a CSS framework, Emotion, etc. It is also possible to replace these default components by other HTML elements or custom components.

There are three components you can override by the `components` prop: `Root`, `Thumb` and `Input`. Each one's props can be set using the `componentsProps` object.

{{"demo": "UnstyledSwitches.js"}}

## useSwitch

For the ultimate customizability, a `useSwitch` hook is available. It accepts almost the same options as the SwitchUnstyled component minus the `component`, `components`, and `componentsProps` props.

```jsx
import { useSwitch } from '@mui/base/SwitchUnstyled';
```

### Basic example

{{"demo": "UseSwitchesBasic.js"}}

### Customized look and feel

{{"demo": "UseSwitchesCustom.js"}}
