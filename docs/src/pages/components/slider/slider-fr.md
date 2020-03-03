---
title: Slider React component
components: Slider
---

# Slider

<p class="description">Les curseurs permettent aux utilisateurs d'effectuer des sélections à partir d'une plage de valeurs.</p>

[Les curseurs](https://material.io/design/components/sliders.html) reflètent une plage de valeurs sur une barre, à partir de laquelle les utilisateurs peuvent sélectionner une seule valeur. Ils sont idéaux pour ajuster des paramètres tels que le volume, la luminosité ou l'application de filtres d'images.

- 📦 [22 kB gzipped](/size-snapshot) (but only 8 kB without @material-ui/styles).

## Discrete sliders

Discrete sliders can be adjusted to a specific value by referencing its value indicator. By order of demos:

1. You can generate a mark for each step with `marks={true}`.
2. You can change the default step increment.
3. You can have custom marks by providing a rich array to the `marks` prop.
4. You can restrict the selectable values to those provided with the `marks` prop with `step={null}`.
5. You can force the thumb label to be always visible with `valueLabelDisplay="on"`.

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

## Curseurs personnalisés

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## Continuous sliders

Continuous sliders allow users to select a value along a subjective range.

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## Range sliders

{{"demo": "pages/components/slider/RangeSlider.js"}}

## With input field

{{"demo": "pages/components/slider/InputSlider.js"}}

## Vertical sliders

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## Track

The track shows the range available for user selection.

### Removed track

The track can be turned off with `track={false}`.

{{"demo": "pages/components/slider/TrackFalseSlider.js"}}

### Inverted track

The track can be inverted with `track="inverted"`.

{{"demo": "pages/components/slider/TrackInvertedSlider.js"}}

## Non-linear scale

You can use the `scale` prop to represent the `value` on a different scale. For instance, in the following demo, the value *x* represents the power of *10^x*.

{{"demo": "pages/components/slider/NonLinearSlider.js"}}

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

The component handles most of the work necessary to make it accessible. However, you need to make sure that:

- Each thumb has a user-friendly label (`aria-label`, `aria-labelledby` or `getAriaLabel` prop).
- Each thumb has a user-friendly text for its current value. This is not required if the value matches the semantics of the label. You can change the name with the `getAriaValueText` or `aria-valuetext` prop.