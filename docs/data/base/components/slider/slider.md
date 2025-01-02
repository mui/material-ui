---
productId: base-ui
title: React Slider component and hook
components: Slider
hooks: useSlider
githubLabel: 'component: slider'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/
---

# Slider

<p class="description">A slider is a UI element that lets users select a single value or a range of values along a bar.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

The Slider component lets users make selections from a range of values along a horizontal or vertical bar.

Sliders are ideal for interface controls that benefit from a visual representation of adjustable content, such as volume or brightness settings, or for applying image filters such as gradients or saturation.

{{"demo": "UnstyledSliderIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

```jsx
import { Slider } from '@mui/base/Slider';
```

### Anatomy

The Slider component is composed of a root `<span>` that houses several interior `<span>` elements:

- rail: the full length of the slider
- track: the section of the slider that's active
- thumb: the button that the user moves across the slider
- mark: optional pre-defined stops along the track
- markLabel: optional label to display the mark's value
- valueLabel: optional label to display the values on a range slider

```html
<span class="base-Slider-root">
  <span class="base-Slider-rail"></span>
  <span class="base-Slider-track"></span>
  <span
    data-index="0"
    class="base-Slider-mark base-Slider-markActive"
    style="left: 0%;"
  ></span>
  <span
    aria-hidden="true"
    data-index="0"
    class="base-Slider-markLabel base-Slider-markLabelActive"
    style="left: 0%;"
    >0</span
  >
  <span data-index="1" class="base-Slider-mark" style="left: 50%;"></span>
  <span
    aria-hidden="true"
    data-index="1"
    class="base-Slider-markLabel"
    style="left: 50%;"
    >50</span
  >
  <span data-index="2" class="base-Slider-mark" style="left: 100%;"></span>
  <span
    aria-hidden="true"
    data-index="2"
    class="base-Slider-markLabel"
    style="left: 100%;"
    >100</span
  >
  <span class="base-Slider-thumb">
    <input />
  </span>
</span>
```

:::info
Both the `mark` and `markLabel` slots have corresponding `*Active` classes that are applied conditionally.
:::

### Custom structure

Use the `slots` prop to override the root or any other interior slot:

```jsx
<Slider slots={{ root: 'div', thumb: 'div' }} />
```

:::info
The `slots` prop is available on all non-utility Base components.
See [Overriding component structure](/base-ui/guides/overriding-component-structure/) for full details.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-rail` to the rail slot:

```jsx
<Slider slotProps={{ rail: { className: 'my-rail' } }} />
```

### Usage with TypeScript

In TypeScript, you can specify the custom component type used in the `slots.root` as a generic parameter of the unstyled component.
This way, you can safely provide the custom root's props directly on the component:

```tsx
<Slider<typeof CustomComponent> slots={{ root: CustomComponent }} customProp />
```

The same applies for props specific to custom primitive elements:

```tsx
<Slider<'input'> slots={{ root: 'input' }} autoFocus={true} />
```

## Hook

```js
import { useSlider } from '@mui/base/useSlider';
```

The `useSlider` hook lets you apply the functionality of a Slider to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#custom-structure), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

## Customization

### Vertical

Slider components can be arranged vertically as well as horizontally.

When vertical, you must set `orientation="vertical"` on the Slider so the user can navigate with the up and down arrow keys (rather than the default left-to-right behavior for horizontal sliders).

{{"demo": "VerticalSlider.js"}}

### Discrete sliders

The most basic Slider is _continuous_, which means it does not have pre-defined (_discrete_) values for the user to select from.
This is suitable for situations in which an approximate value is good enough for the user, such as brightness or volume.

But if your users need more precise options, you can create a discrete Slider that snaps the thumb to pre-defined stops along the bar.
Make sure to adjust the `shiftStep` prop (the granularity with which the slider can step when using Page Up/Down or Shift + Arrow Up/Down) to a value divadable with the `step`.

To generate a mark for each stop, use `marks={true}`:

{{"demo": "DiscreteSlider.js"}}

#### Custom marks

You can create custom marks by providing a rich array to the `marks` prop:

{{"demo": "DiscreteSliderMarks.js"}}

#### Restricted values

If the user should only be able to select from the values provided with the `marks` prop, add `step={null}` to disable all other options:

{{"demo": "DiscreteSliderValues.js"}}

### Range slider

To let users set the start and end of a range on a Slider, provide an array of values to the `value` or `defaultValue` prop:

{{"demo": "RangeSlider.js"}}

### Value label

A label for the value can be rendered around the thumb by using the optional `slots` prop with the `valueLabel` slot.
These are typical use cases for showing the value label:

- always
- only when hovering over the thumb (using CSS)
- while interacting with the thumb (hovering or dragging)

The following demo shows how to render the value label when the mouse is hovering over the thumb:

{{"demo": "LabeledValuesSlider.js"}}

## Accessibility

See the [WAI-ARIA guide on the Slider (Multi-Thumb) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/) for complete details on accessibility best practices.

The component handles most of the work necessary to make it accessible.
However, you need to make sure that:

- Each thumb has a user-friendly label (`aria-label`, `aria-labelledby` or `getAriaLabel` prop).
- Each thumb has a user-friendly text for its current value.
  This is not required if the value matches the semantics of the label.
  You can change the name with the `getAriaValueText` or `aria-valuetext` prop.
