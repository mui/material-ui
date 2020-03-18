---
title: Componente de React Rating
components: Rating
---

# Rating (Calificación)

<p class="description">Las calificaciones proporcionan información sobre las opiniones y experiencias de otros con un producto. Los usuarios también pueden calificar los productos que han comprado.</p>

## Calificaciones simples

{{"demo": "pages/components/rating/SimpleRating.js"}}

## Calificaciones personalizadas

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/rating/CustomizedRatings.js"}}

## Hover feedback

You can display a label on hover to help users pick the correct rating value. The demo uses the `onChangeActive` prop.

{{"demo": "pages/components/rating/HoverRating.js"}}

## Half ratings

The rating can display any float number with the `value` prop. Use the `precision` prop to define the minimum increment value change allowed.

{{"demo": "pages/components/rating/HalfRating.js"}}

## Tamaños

Fancy larger or smaller ratings? Use the `size` prop.

{{"demo": "pages/components/rating/RatingSize.js"}}

## Accesibilidad

(WAI tutorial: https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating)

La accesibilidad de este componente se basa en:

- A radio group is used with its fields visually hidden. It contains six radio buttons, one for each star and another for 0 stars, which is checked by default. Make sure you are providing a `name` prop that is unique to the parent form.
- The labels for the radio buttons contain actual text (“1 Star”, “2 Stars”, …), make sure you provide a `getLabelText` prop when the page language is not English.