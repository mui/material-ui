---
productId: joy-ui
title: React Slider component
components: Slider
githubLabel: 'component: slider'
unstyled: /base-ui/react-slider/
---

# Slider

<p class="description">Slider generates a background element that can be used for various purposes.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

Sliders are ideal for interface controls that benefit from a visual representation of adjustable content, such as volume or brightness settings, or for applying image filters such as gradients or saturation.

{{"demo": "SliderUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Slider from '@mui/joy/Slider';

export default function MyApp() {
  return <Slider defaultValue={3} max={10} />;
}
```

### Steps

Change the default step increments by setting a desired value to the `step` prop.
Make sure to adjust the `shiftStep` prop (the granularity with which the slider can step when using Page Up/Down or Shift + Arrow Up/Down) to a value divadable with the `step`.

{{"demo": "StepsSlider.js"}}

### Custom marks

You can create custom marks by providing a rich array to the `marks` prop:

{{"demo": "MarksSlider.js"}}

### Always visible label

To make the thumb label always visible, toggle on the `valueLabelDisplay` prop.

{{"demo": "AlwaysVisibleLabelSlider.js"}}

### Vertical

Set `orientation="vertical"` to display the vertical slider.

{{"demo": "VerticalSlider.js"}}

### Keep the label at edges

Apply the following styles to ensure that the label doesn't get cut off on mobile when it hits the edge of the slider.

{{"demo": "EdgeLabelSlider.js"}}

### Range slider

To let users set the start and end of a range on a slider, provide an array of values to the `value` or `defaultValue` prop:

{{"demo": "RangeSlider.js"}}

### Track

The slider's track shows how much of it has been selected.
You can either invert it by assigning `inverted` to the `track` prop or remove it entirely by assigning a value of `false`.

{{"demo": "TrackInvertedSlider.js"}}

{{"demo": "TrackFalseSlider.js"}}

## CSS variables playground

Play around with all the CSS variables available in the slider component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "SliderVariables.js", "hideToolbar": true, "bg": "gradient"}}
