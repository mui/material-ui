---
product: joy-ui
title: React Slider component
githubLabel: 'component: slider'
unstyled: /base/react-slider/
---

# Slider

<p class="description">Slider generates a background element that can be used for various purposes.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

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
