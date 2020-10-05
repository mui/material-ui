---
title: React Slider component
components: SliderStyled, SliderUnstyled
githubLabel:
  component: Slider
materialDesign: https://material.io/components/sliders
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#slider'
---

# Slider

<p class="description">Les curseurs permettent aux utilisateurs d'effectuer des sélections à partir d'une plage de valeurs.</p>

[Les curseurs](https://material.io/design/components/sliders.html) reflètent une plage de valeurs sur une barre, à partir de laquelle les utilisateurs peuvent sélectionner une seule valeur. Ils sont idéaux pour ajuster des paramètres tels que le volume, la luminosité ou l'application de filtres d'images.

- 📦 [22 kB gzipped](/size-snapshot) (but only +8 kB when used together with other Material-UI components).

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Continuous sliders

Continuous sliders allow users to select a value along a subjective range.

{{"demo": "pages/components/slider-styled/ContinuousSlider.js"}}

## Discrete sliders

Discrete sliders can be adjusted to a specific value by referencing its value indicator. By order of demos:

You can generate a mark for each step with `marks={true}`.

{{"demo": "pages/components/slider-styled/DiscreteSlider.js"}}

### Small steps

You can change the default step increment.

{{"demo": "pages/components/slider-styled/DiscreteSliderSteps.js"}}

### Custom marks

You can have custom marks by providing a rich array to the `marks` prop.

{{"demo": "pages/components/slider-styled/DiscreteSliderMarks.js"}}

### Restricted values

You can restrict the selectable values to those provided with the `marks` prop with `step={null}`.

{{"demo": "pages/components/slider-styled/DiscreteSliderValues.js"}}

### Label always visible

You can force the thumb label to be always visible with `valueLabelDisplay="on"`.

{{"demo": "pages/components/slider-styled/DiscreteSliderLabel.js"}}

## Range slider

The slider can be used to set the start and end of a range by supplying an array of values to the `value` prop.

{{"demo": "pages/components/slider-styled/RangeSlider.js"}}

## Slider with input field

In this example an input allows a discrete value to be set.

{{"demo": "pages/components/slider-styled/InputSlider.js"}}

## Curseurs personnalisés

Here are some examples of customizing the component. Vous pouvez en apprendre plus à ce sujet dans la [page de documentation](/customization/components/).

{{"demo": "pages/components/slider-styled/CustomizedSlider.js"}}

## Vertical sliders

{{"demo": "pages/components/slider-styled/VerticalSlider.js"}}

## Track

The track shows the range available for user selection.

### Removed track

The track can be turned off with `track={false}`.

{{"demo": "pages/components/slider-styled/TrackFalseSlider.js"}}

### Inverted track

The track can be inverted with `track="inverted"`.

{{"demo": "pages/components/slider-styled/TrackInvertedSlider.js"}}

## Non-linear scale

You can use the `scale` prop to represent the `value` on a different scale. For instance, in the following demo, the value *x* represents the power of *10^x*.

{{"demo": "pages/components/slider-styled/NonLinearSlider.js"}}

## Unstyled slider

{{"demo": "pages/components/slider-styled/UnstyledSlider.js"}}

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

The component handles most of the work necessary to make it accessible. However, you need to make sure that:

- Each thumb has a user-friendly label (`aria-label`, `aria-labelledby` or `getAriaLabel` prop).
- Each thumb has a user-friendly text for its current value. This is not required if the value matches the semantics of the label. You can change the name with the `getAriaValueText` or `aria-valuetext` prop.
