---
title: React Slider component
components: Slider, SliderUnstyled
githubLabel: 'component: Slider'
materialDesign: https://material.io/components/sliders
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#slider'
---

# Slider

<p class="description">Los deslizadores permiten a los usuarios hacer selecciones a partir de una gama de valores.</p>

[Sliders](https://material.io/design/components/sliders.html) reflect a range of values along a bar, from which users may select a single value. Son ideales para ajustar ajustes como volumen, brillo o aplicación de filtros de imagen.

- 📦 [22 kB gzipped](/size-snapshot) (pero solo +8 kB cuando se usa junto con otros componentes de Material-UI).

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Deslizadores continuos

Los deslizadores continuos permiten a los usuarios seleccionar un valor a lo largo de un rango más amplio.

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## Deslizadores discretos

Los deslizadores discretos pueden ser ajustados a un valor específico haciendo referencia a su indicador de valor. Por orden de demos:

Puedes generar una marca para cada paso con `marks={true}`.

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

### Pequeños pasos

Puede cambiar el incremento de paso por defecto.

{{"demo": "pages/components/slider/DiscreteSliderSteps.js"}}

### Marcas personalizadas

You can have custom marks by providing a rich array to the `marks` prop.

{{"demo": "pages/components/slider/DiscreteSliderMarks.js"}}

### Valores restringidos

You can restrict the selectable values to those provided with the `marks` prop with `step={null}`.

{{"demo": "pages/components/slider/DiscreteSliderValues.js"}}

### Etiqueta siempre visible

You can force the thumb label to be always visible with `valueLabelDisplay="on"`.

{{"demo": "pages/components/slider/DiscreteSliderLabel.js"}}

## Deslizador de rango

The slider can be used to set the start and end of a range by supplying an array of values to the `value` prop.

{{"demo": "pages/components/slider/RangeSlider.js"}}

## Deslizador con campo de entrada

In this example an input allows a discrete value to be set.

{{"demo": "pages/components/slider/InputSlider.js"}}

## Deslizadores personalizados

Here are some examples of customizing the component. Puedes aprender más sobre esto en la [sección Personalizando Componentes de la documentación](/customization/how-to-customize/).

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## Deslizadores verticales

{{"demo": "pages/components/slider/VerticalSlider.js"}}

**WARNING**: Chrome, Safari and newer Edge versions i.e. any browser based on WebKit exposes `<Slider orientation="vertical" />` as horizontal ([chromium issue #1158217](https://bugs.chromium.org/p/chromium/issues/detail?id=1158217)). By applying `-webkit-appearance: slider-vertical;` the slider is exposed as vertical.

However, by applying `-webkit-appearance: slider-vertical;` keyboard navigation for horizontal keys (<kbd class="key">Arrow Left</kbd>, <kbd class="key">Arrow Right</kbd>) is reversed ([chromium issue #1162640](https://bugs.chromium.org/p/chromium/issues/detail?id=1162640)). Usually, up and right should increase and left and down should decrease the value. If you apply `-webkit-appearance` you could prevent keyboard navigation for horizontal arrow keys for a truly vertical slider. This might be less confusing to users compared to a change in direction.

{{"demo": "pages/components/slider/VerticalAccessibleSlider.js"}}

## Track

The track shows the range available for user selection.

### Removed track

The track can be turned off with `track={false}`.

{{"demo": "pages/components/slider/TrackFalseSlider.js"}}

### Inverted track

The track can be inverted with `track="inverted"`.

{{"demo": "pages/components/slider/TrackInvertedSlider.js"}}

## Non-linear scale

You can use the `scale` prop to represent the `value` on a different scale.

In the following demo, the value _x_ represents the value _2^x_. Increasing _x_ by one increases the represented value by factor _2_.

{{"demo": "pages/components/slider/NonLinearSlider.js"}}

## Slider sin estilo

{{"demo": "pages/components/slider/UnstyledSlider.js"}}

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

The component handles most of the work necessary to make it accessible. However, you need to make sure that:

- Each thumb has a user-friendly label (`aria-label`, `aria-labelledby` or `getAriaLabel` prop).
- Each thumb has a user-friendly text for its current value. This is not required if the value matches the semantics of the label. You can change the name with the `getAriaValueText` or `aria-valuetext` prop.
