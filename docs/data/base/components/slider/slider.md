---
product: base
title: React Slider unstyled component and hook
components: SliderUnstyled
githubLabel: 'component: slider'
waiAria: https://www.w3.org/TR/wai-aria-practices/#slider
packageName: '@mui/base'
---

# Slider

<p class="description">Sliders allow users to make selections from a range of values.</p>

Sliders show a range of values along a bar, from which users may select a single value.
They are ideal for adjusting settings such as volume, brightness, or applying image filters.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

```js
import SliderUnstyled from '@mui/base/SliderUnstyled';
```

{{"demo": "UnstyledSlider.js", "defaultCodeOpen": false}}

## Discrete sliders

Discrete sliders snap to the nearest step.
You can generate a mark for each step with `marks={true}`.

{{"demo": "DiscreteSlider.js"}}

### Custom marks

You can have custom marks by providing a rich array to the `marks` prop.

{{"demo": "DiscreteSliderMarks.js"}}

### Restricted values

You can restrict the selectable values to those provided with the `marks` prop with `step={null}`.

{{"demo": "DiscreteSliderValues.js"}}

## Range slider

The slider can be used to set the start and end of a range by supplying an array of values to the `value` or `defaultValue` prop.

{{"demo": "RangeSlider.js"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

The component handles most of the work necessary to make it accessible.
However, you need to make sure that:

- Each thumb has a user-friendly label (`aria-label`, `aria-labelledby` or `getAriaLabel` prop).
- Each thumb has a user-friendly text for its current value.
  This is not required if the value matches the semantics of the label.
  You can change the name with the `getAriaValueText` or `aria-valuetext` prop.
