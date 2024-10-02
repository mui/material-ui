---
productId: base-ui
title: React Switch component and hook
components: Switch
hooks: useSwitch
githubLabel: 'component: switch'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
---

# Switch

<p class="description">Switches are UI elements that let users choose between two states—most commonly on/off.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

The Switch component provides users with a switch for toggling between two mutually exclusive states.

{{"demo": "UnstyledSwitchIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

```jsx
import { Switch } from '@mui/base/Switch';
```

### Anatomy

The Switch component is composed of a root `<span>` that houses three interior slots—a track, a thumb, and an input:

```html
<span class="base-Switch-root">
  <span class="base-Switch-track"></span>
  <span class="base-Switch-thumb"></span>
  <input type="checkbox" class="base-Switch-input" />
</span>
```

### Custom structure

Use the `slots` prop to override the root or any other interior slot:

```jsx
<Switch slots={{ root: 'div', track: 'div' }} />
```

:::info
The `slots` prop is available on all non-utility Base components.
See [Overriding component structure](/base-ui/guides/overriding-component-structure/) for full details.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-thumb` to the thumb slot:

```jsx
<Switch slotProps={{ thumb: { className: 'my-thumb' } }} />
```

### Usage with TypeScript

In TypeScript, you can specify the custom component type used in the `slots.root` as a generic parameter of the unstyled component.
This way, you can safely provide the custom root's props directly on the component:

```tsx
<Switch<typeof CustomComponent> slots={{ root: CustomComponent }} customProp />
```

The same applies for props specific to custom primitive elements:

```tsx
<Switch<'input'> slots={{ root: 'input' }} autoFocus={true} />
```

## Hook

```js
import { useSwitch } from '@mui/base/useSwitch';
```

The `useSwitch` hook lets you apply the functionality of a Switch to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#custom-structure), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [HTML structure](#anatomy).
:::

### Basic example

{{"demo": "UseSwitchesBasic.js"}}

### Customized look and feel

{{"demo": "UseSwitchesCustom.js"}}

## Accessibility

To make the Switch component accessible, you should ensure that the corresponding labels reflect the Switch's current state.
