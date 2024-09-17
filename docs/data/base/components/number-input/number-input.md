---
productId: base-ui
title: React Number Input component and hook
components: NumberInput
hooks: useNumberInput
githubLabel: 'component: number input'
---

# Number Input

<p class="description">The Number Input component provides users with a field for integer values, and buttons to increment or decrement the value.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

A number input is a UI element that accepts numeric values from the user.
Base UI's Number Input component is a customizable replacement for the native HTML `<input type="number">` that solves common usability issues of its native counterpart, such as:

- Inconsistencies across browsers in the appearance and behavior of the stepper buttons
- Allowing certain non-numeric characters ('e', '+', '-', '.') and silently discarding others
- Incompatibilities with assistive technologies and limited accessibility features

:::info
See [Why the GOV.UK Design System team changed the input type for numbers](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) for a more detailed explanation of the limitations of `<input type="number">`.
:::

{{"demo": "NumberInputIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

```jsx
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
```

The following demo shows how to create a Number Input component, apply some styling, and write the latest value to a state variable using the `onChange` prop:

{{"demo": "NumberInputBasic"}}

### Anatomy

The Base UI Number Input component consists of four slots:

- `root`: an outer `<div>` containing the other interior slots
- `input`: an `<input>` element
- `incrementButton`: a `<button>` for increasing the value
- `decrementButton`: a `<button>` for decreasing the value

```html
<div class="base-NumberInput-root">
  <button class="base-NumberInput-decrementButton" />
  <button class="base-NumberInput-incrementButton" />
  <input class="base-NumberInput-input" />
</div>
```

### Custom structure

Use the `slots` prop to override the root slot or any interior slots:

```jsx
<NumberInput
  slots={{
    root: 'aside',
    incrementButton: CustomButton,
    decrementButton: CustomButton,
  }}
/>
```

:::info
The `slots` prop is available on all non-utility Base components.
See [Overriding component structure](/base-ui/guides/overriding-component-structure/) for full details.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet:

- applies a CSS class called `my-num-input` to the input slot
- passes a `direction` prop to the `CustomButton` components in the increment and decrement button slots

```jsx
<NumberInput
  slotProps={{
    input: { className: 'my-num-input' },
    incrementButton: { direction: 'UP' },
    decrementButton: { direction: 'DOWN' },
  }}
/>
```

## Hook

```js
import { unstable_useNumberInput as useNumberInput } from '@mui/base/unstable_useNumberInput';
```

The `useNumberInput` hook lets you apply the functionality of a Number Input to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#custom-structure), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

Here's an example of a custom component built using the `useNumberInput` hook with all the required props:

{{"demo": "UseNumberInput.js", "defaultCodeOpen": false}}

Here's an example of a "compact" number input component using the hook that only consists of the stepper buttons.
In this demo, [`onChange`](#events) is used to write the latest value of the component to a state variable.

{{"demo": "UseNumberInputCompact.js", "defaultCodeOpen": false}}

## Customization

### Minimum and maximum

Use the `min` and `max` props to define a range of accepted values.
If you only define one or the other, the opposite end of the range will be open-ended.

```jsx
// accepts any value:
<NumberInput />

// only accepts values between -10 and 10:
<NumberInput min={-10} max={10} />

// only accepts values greater than 0:
<NumberInput min={0} />

```

The demo below shows a Number Input with a an accepted range of 1 to 99:

{{"demo": "QuantityInput.js", "defaultCodeOpen": false}}

### Incremental steps

Use the `step` prop to define the granularity of the change in value when incrementing or decrementing.
For example, if `min={0}` and `step={2}`, valid values for the component would be 0, 2, 4, and on, since the value can only be changed in increments of 2.

```jsx
// valid values: 0, 2, 4, 6, 8...
<NumberInput min={0} step={2} />
```

:::warning
Support for decimal values and step sizes isn't available yet, but you can upvote [this GitHub issue](https://github.com/mui/base-ui/issues/41) to see it arrive sooner.
:::

When the input field is in focus, you can enter values that fall outside the valid range.
The value will be clamped based on `min`, `max` and `step` once the input field is blurred.

### Shift multiplier

Holding down the <kbd class="key">Shift</kbd> key when interacting with the stepper buttons applies a multiplier (default 10x) to the value change of each step.

You can customize this behavior with the `shiftMultiplier` prop.
In the following snippet, if <kbd class="key">Shift</kbd> is held when clicking the increment button, the value will change from 0, to 5, to 10, and on.

```jsx
<NumberInput min={0} step={1} shiftMultiplier={5} />
```

### Events

The Number Input component and hook provide two props–`onChange` and `onInputChange`–that accept event handlers for when the value of the component changes.

#### onChange

`onChange` accepts a custom event handler that is called with two arguments: the underlying event, and the latest "clamped" value.

```ts
onChange: (
  event: React.FocusEvent<HTMLInputElement> | React.PointerEvent | React.KeyboardEvent,
  value: number | undefined,
) => void;
```

It's called when the `<input>` element is blurred if the value has changed, or when the stepper buttons are clicked. This is after the value has been clamped based on the [`min`, `max`](#minimum-and-maximum), or [`step`](#incremental-steps) props.

:::info
When using the component, `onChange` can only be passed as a prop on the component—not through `slotProps`.
:::

```jsx
// ✅ Works
<NumberInput
  onChange={(event, newValue) => console.log(`${event.type} event: the new value is ${newValue}`)}
/>

// ❌ Doesn't work
<NumberInput
  slotProps={{
    input: {
      // expects a native input change event handler, newValue is always undefined
      onChange: (event, newValue) => { ... },
    },
  }}
/>
```

#### onInputChange

`onInputChange` accepts a native input change handler that's passed to the `<input>` element:

```ts
onInputChange: React.ChangeEventHandler<HTMLInputElement>;
```

It's called whenever the value of the textbox changes–for example, on every keystroke typed into it, before clamping is applied.

In other words, it's possible for `event.target.value` to contain out-of-range values or non-numerical characters.

:::info
When using the component, `onInputChange` can only be passed as a prop on the component. If you prefer to use `slotProps`, pass it as `slotProps.input.onChange` instead. Both ways–`onInputChange` and `slotProps.input.onChange`–work the same.
:::

```jsx
// ✅ Works
<NumberInput
  onInputChange={(event) => console.log(`the input value is: ${event.target.value}`)}
/>

// ✅ Works
<NumberInput
  slotProps={{
    input: {
      // this exactly the same as onInputChange above
      onChange: (event) => console.log(`the input value is: ${event.target.value}`),
    },
  }}
/>

// ❌ Doesn't work
<NumberInput
  slotProps={{
    input: {
      // This will throw "unknown event handler"
      onInputChange: () => {},
    },
  }}
/>
```

### Adornments

You can use the `startAdornment` and `endAdornment` props to add a prefix or suffix, respectively, to a Number Input.
Adornments can be useful for displaying units of measure, like weight or currency, alongside values.

{{"demo": "NumberInputAdornments.js", "defaultCodeOpen": false}}
