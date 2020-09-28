---
title: Rating React component
components: Rating (Notation)
githubLabel:
  component: Rating (Notation)
waiAria: 'https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating'
packageName: '@material-ui/lab'
---

# Rating (Notation)

<p class="description">Ratings provide insight regarding others’ opinions and experiences with a product. Users can also rate products they’ve purchased.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Simple ratings

{{"demo": "pages/components/rating/SimpleRating.js"}}

## Customized ratings

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/rating/CustomizedRatings.js"}}

## Hover feedback

You can display a label on hover to help users pick the correct rating value. The demo uses the `onChangeActive` prop.

{{"demo": "pages/components/rating/HoverRating.js"}}

## Half ratings

The rating can display any float number with the `value` prop. Use the `precision` prop to define the minimum increment value change allowed.

{{"demo": "pages/components/rating/HalfRating.js"}}

## Tailles

Fancy larger or smaller ratings? Use the `size` prop.

{{"demo": "pages/components/rating/RatingSize.js"}}

## Accessibilité

(WAI tutorial: https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating)

L'accessibilité de ce composant repose sur les points suivants :

- A radio group is used with its fields visually hidden. It contains six radio buttons, one for each star and another for 0 stars, which is checked by default. Make sure you are providing a `name` prop that is unique to the parent form.
- The labels for the radio buttons contain actual text (“1 Star”, “2 Stars”, …), make sure you provide a `getLabelText` prop when the page language is not English.

By default, the rating component uses both a difference of color and shape between the filled and empty icons to indicate the value.

In the event that you are using color as the only means to indicate the value, the information should also be also displayed as text, as in this demo. This is important to match [success Criterion 1.4.1](https://www.w3.org/TR/WCAG21/#use-of-color) of WCAG2.1.

{{"demo": "pages/components/rating/TextRating.js"}}
