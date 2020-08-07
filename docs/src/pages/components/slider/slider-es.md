---
title: Slider React component
components: Slider
---

# Slider

<p class="description">Los deslizadores permiten a los usuarios hacer selecciones a partir de una gama de valores.</p>

[Los deslizadores](https://material.io/design/components/sliders.html) reflejan un rango de valores a lo largo de una barra, desde los cuales los usuarios pueden seleccionar un único valor. Son ideales para ajustar ajustes como volumen, brillo o aplicación de filtros de imagen.

- 📦 [22 kB gzipped](/size-snapshot) (pero solo +8 kB cuando se usa junto con otros componentes de Material-UI).

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

Here are some examples of customizing the component. Here are some examples of customizing the component.

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## Deslizadores verticales

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

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

The component handles most of the work necessary to make it accessible. However, you need to make sure that:

- Each thumb has a user-friendly label (`aria-label`, `aria-labelledby` or `getAriaLabel` prop).
- Each thumb has a user-friendly text for its current value. This is not required if the value matches the semantics of the label. You can change the name with the `getAriaValueText` or `aria-valuetext` prop.