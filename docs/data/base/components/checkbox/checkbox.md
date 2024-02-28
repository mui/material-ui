---
productId: base-ui
title: React Checkbox component and hook
components: Checkbox
hooks: useCheckbox
githubLabel: 'component: checkbox'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
---

# Checkbox

<p class="description">Checkboxes are UI elements that let users choose between two states—most commonly on/off.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

The Checkbox component provides users with a checkbox for toggling between two mutually exclusive states.

{{"demo": "UnstyledCheckboxIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

```jsx
import { Checkbox } from '@mui/base/Checkbox';
```

### Anatomy

The Checkbox component is composed of a root `<span>` that houses three interior slots—a track, a thumb, and an input:

```html
<span class="base-Checkbox-root">
  <input type="checkbox" class="base-Checkbox-input" />
</span>
```

### Custom structure

Use the `slots` prop to override the root or any other interior slot:

```jsx
<Checkbox slots={{ root: 'div', track: 'div' }} />
```

:::info
The `slots` prop is available on all non-utility Base components.
See [Overriding component structure](/base-ui/guides/overriding-component-structure/) for full details.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-thumb` to the thumb slot:

```jsx
// <Checkbox slotProps={{ thumb: { className: 'my-thumb' } }} />
<Checkbox />
```

### Usage with TypeScript

In TypeScript, you can specify the custom component type used in the `slots.root` as a generic parameter of the unstyled component.
This way, you can safely provide the custom root's props directly on the component:

```tsx
<Checkbox<typeof CustomComponent> slots={{ root: CustomComponent }} customProp />
```

The same applies for props specific to custom primitive elements:

```tsx
<Checkbox<'input'> slots={{ root: 'input' }} autoFocus={true} />
```

## Hook

```js
import { useCheckbox } from '@mui/base/useCheckbox';
```

The `useCheckbox` hook lets you apply the functionality of a Checkbox to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#custom-structure), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [HTML structure](#anatomy).
:::

### Basic example

{{"demo": "UseCheckboxesBasic.js"}}

### Customized look and feel

{{"demo": "UseCheckboxesCustom.js"}}

## Accessibility

To make the Checkbox component accessible, you should ensure that the corresponding labels reflect the Checkbox's current state.
