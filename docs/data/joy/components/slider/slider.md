---
product: joy-ui
title: React Slider component
githubLabel: 'component: slider'
unstyled: /base/react-slider/
---

# Slider

<p class="description">Slider generates a background element that can be used for various purposes.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

{{"demo": "SliderUsage.js", "hideToolbar": true}}

## Steps

By passing a number to the `step` prop, you can change the default step increment.

{{"demo": "StepsSlider.js"}}

## Marks

By providing an array of objects to the `marks` prop, you can have custom marks.

{{"demo": "MarksSlider.js"}}

## Label always visible

You can force the thumb label to be always visible with `valueLabelDisplay="on"`.

{{"demo": "AlwaysVisibleLabelSlider.js"}}

### Keep label at edges

For horizontal slider on mobile viewports, the value label might be offset from the track. Apply the style to keep the label at the start/end edges:

{{"demo": "EdgeLabelSlider.js"}}

## Range slider

By passing an array of values to the `value` prop, you can use the `Slider` to set the start and end of a range.

{{"demo": "RangeSlider.js"}}

## Track

The track shows the range available for user selection.

### Removed track

The track can be turned off with `track={false}`.

{{"demo": "TrackFalseSlider.js"}}

### Inverted track

The track can be inverted with `track="inverted"`.

{{"demo": "TrackInvertedSlider.js"}}

## Component variables

{{"demo": "SliderVariables.js", "hideToolbar": true}}
