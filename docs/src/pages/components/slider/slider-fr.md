---
title: Slider React component
components: Slider
---

# Slider (curseur)

<p class="description">Les curseurs permettent aux utilisateurs d'effectuer des sélections à partir d'une plage de valeurs.</p>

[Les curseurs](https://material.io/design/components/sliders.html) reflètent une plage de valeurs sur une barre, à partir de laquelle les utilisateurs peuvent sélectionner une seule valeur. Ils sont idéaux pour ajuster des paramètres tels que le volume, la luminosité ou l'application de filtres d'images.

- 

## Continuous sliders

Continuous sliders allow users to select a value along a subjective range.

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## Discrete sliders

Discrete sliders can be adjusted to a specific value by referencing its value indicator. By order of demos:

1. You can generate a mark for each step with `marks={true}`.
2. You can have custom marks by providing a rich array to the `marks` prop.
3. You can restrict the selectable values to those provided with the `marks` prop with `step={null}`.
4. You can force the thumb label to be always visible with `valueLabelDisplay="on"`.

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

## Range sliders

{{"demo": "pages/components/slider/RangeSlider.js"}}

## Curseurs personnalisés

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## With input field

{{"demo": "pages/components/slider/InputSlider.js"}}

## Vertical sliders

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## Accessibilité

The component handles most of the work necessary to make it accessible. However, you need to make sure that:

- The slider, as a whole, has a label (`aria-label` or `aria-labelledby` prop).
- Each thumb has a user-friendly name for its current value. This is not required if the value matches the semantics of the label. You can change the name with the `getAriaValueText` or `aria-valuetext` prop.