---
product: base
title: Unstyled React Slider component and hook
components: SliderUnstyled
githubLabel: 'component: slider'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/
---

# Unstyled slider

<p class="description">A slider is a UI element that lets users select a single value or a range of values along a bar.
</p>

## Introduction

The `SliderUnstyled` component lets users make selections from a range of values along a horizontal or vertical bar.

Sliders are ideal for interface controls that benefit from a visual representation of adjustable content, such as volume or brightness settings, or for applying image filters such as gradients or saturation.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import SliderUnstyled from '@mui/base/SliderUnstyled';

export default function MyApp() {
  return <SliderUnstyled />;
}
```

### Basics

The following demo shows how to create and style two basic sliders. Notice that both are set to a default value of 10 with the `defaultValue` prop, and the the second slider cannot be adjusted due to the `disabled` prop:

{{"demo": "UnstyledSlider.js", "defaultCodeOpen": false}}

### Anatomy

The `SliderUnstyled` component is composed of a root `<span>` that houses several interior `<span>` elements:

- rail: the full length of the slider
- track: the section of the slider that's active
- thumb: the button that the user moves across the slider
- mark: optional pre-defined stops along the track
- markLabel: optional label to display the mark's value
- valueLabel: optional label to display the values on a range slider

```html
<span class="MuiSlider-root">
  <span class="MuiSlider-rail"></span>
  <span class="MuiSlider-track"></span>
  <span
    data-index="0"
    class="MuiSlider-mark MuiSlider-markActive"
    style="left: 0%;"
  ></span>
  <span
    aria-hidden="true"
    data-index="0"
    class="MuiSlider-markLabel MuiSlider-markLabelActive"
    style="left: 0%;"
    >0</span
  >
  <span data-index="1" class="MuiSlider-mark" style="left: 50%;"></span>
  <span
    aria-hidden="true"
    data-index="1"
    class="MuiSlider-markLabel"
    style="left: 50%;"
    >50</span
  >
  <span data-index="2" class="MuiSlider-mark" style="left: 100%;"></span>
  <span
    aria-hidden="true"
    data-index="2"
    class="MuiSlider-markLabel"
    style="left: 100%;"
    >100</span
  >
  <span class="MuiSlider-thumb">
    <input />
  </span>
</span>
```

:::info
Both the `mark` and `markLabel` slots have corresponding `*Active` classes that are applied conditionally.
:::

### Slot props

:::info
The following props are available on all non-utility Base components. See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<SliderUnstyled component="div" />
```

Use the `components` prop to override any interior slots in addition to the root:

```jsx
<SliderUnstyled components={{ Root: 'div', Thumb: 'div' }} />
```

:::warning
If the root element is customized with both the `component` and `components` props, then `component` will take precedence.
:::

Use the `componentsProps` prop to pass custom props to internal slots. The following code snippet applies a CSS class called `my-rail` to the rail slot:

```jsx
<SliderUnstyled componentsProps={{ rail: { className: 'my-rail' } }} />
```

:::warning
Note that `componentsProps` slot names are written in lowercase (`root`) while `components` slot names are capitalized (`Root`).
:::

## Hook

```js
import { useSlider } from '@mui/base/SliderUnstyled';
```

The `useSlider` hook lets you apply the functionality of `SliderUnstyled` to a fully custom component. It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement. With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#component-slots).
:::

## Customization

### Discrete sliders

The most basic slider is _continuous_, which means it does not have pre-defined (_discrete_) values for the user to select from. This is suitable for situations in which an approximate value is good enough for the user, such as brightness or volume.

But if your users need more precise options, you can create a discrete slider that snaps the thumb to pre-defined stops along the bar.

To generate a mark for each stop, use `marks={true}`:

{{"demo": "DiscreteSlider.js"}}

#### Custom marks

You can create custom marks by providing a rich array to the `marks` prop:

{{"demo": "DiscreteSliderMarks.js"}}

#### Restricted values

If the user should only be able to select from the values provided with the `marks` prop, add `step={null}` to disable all other options:

{{"demo": "DiscreteSliderValues.js"}}

### Range slider

To let users set the start and end of a range on a slider, provide an array of values to the `value` or `defaultValue` prop:

{{"demo": "RangeSlider.js"}}

## Accessibility

See the [WAI-ARIA guide on the Slider (Multi-Thumb) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/) for complete details on accessibility best practices.

The component handles most of the work necessary to make it accessible. However, you need to make sure that:

- Each thumb has a user-friendly label (`aria-label`, `aria-labelledby` or `getAriaLabel` prop).
- Each thumb has a user-friendly text for its current value. This is not required if the value matches the semantics of the label. You can change the name with the `getAriaValueText` or `aria-valuetext` prop.
