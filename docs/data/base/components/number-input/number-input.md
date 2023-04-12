---
product: base
title: Unstyled React Number Input component and hook
components: NumberInputUnstyled
hooks: useNumberInput
githubLabel: 'component: NumberInput'
---

# Unstyled Number Input

<p class="description">The Unstyled Number Input component provides users with a field for integer values, and buttons to increment or decrement the value.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

A number input is a UI element that accepts numeric values from the user.
The Unstyled Number Input component is a customizable replacement for the native HTML `<input type="number" />` that solves common usability [issues](/material-ui/react-text-field/#type-quot-number-quot) of the native counterpart.

{{"demo": "UnstyledNumberInputIntroduction.js", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import NumberInputUnstyled from '@mui/base/NumberInputUnstyled';

export default function MyApp() {
  return <NumberInputUnstyled />;
}
```

### Basics

The following demo shows how to create a number input component, apply some styling, and write the latest value to a state variable using the `onValueChange` prop:

{{"demo": "UnstyledNumberInputBasic.js"}}

Here's another demo of a Unstyled Number Input with fully customized styles:

{{"demo": "QuantityInput.js", "defaultCodeOpen": false, "bg": "gradient"}}

### Anatomy

The Unstyled Number Input component consists of a root `<div>` that contains one interior `<input>` slot, and two `<button>` slots – `incrementButton` and `decrementButton` – for the stepper buttons.

```html
<div class="MuiNumberInput-root">
  <button class="MuiNumberInput-decrementButton" />
  <input class="MuiNumberInput-input" />
  <button class="MuiNumberInput-incrementButton" />
</div>
```

### Slot props

:::info
The following props are available on all non-utility Base components.
See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `slots` prop to override the root slot or any interior slots:

```jsx
<NumberInputUnstyled
  slots={{
    root: 'aside',
    incrementButton: CustomButton,
    decrementButton: CustomButton,
  }}
/>
```

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet:

- applies a CSS class called `my-num-input` to the input slot,
- and passes a `direction` prop to the `CustomButton` components in the increment and decrement button slots

```jsx
<NumberInputUnstyled
  slotProps={{
    input: { className: 'my-num-input' },
    incrementButton: { direction: 'UP' },
    decrementButton: { direction: 'DOWN' },
  }}
/>
```

## Hook

```js
import useNumberInput from '@mui/base/useNumberInput';
```

The `useNumberInput` hook lets you apply the functionality of a number input to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

Here's an example of a custom component built using the `useNumberInput` hook with all the required props:

{{"demo": "UseNumberInput.js", "defaultCodeOpen": false, "bg": "gradient"}}

Here's an example of a "compact" number input component using the hook that only consists of the stepper buttons.
In this demo, `onValueChange` is used to write the latest value of the component to a state variable.

{{"demo": "UseNumberInputCompact.js", "defaultCodeOpen": false, "bg": "gradient"}}
