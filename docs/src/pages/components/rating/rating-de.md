---
title: Rating React component
components: Bewertung
githubLabel:
  component: Bewertung
waiAria: 'https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating'
packageName: '@material-ui/lab'
---

# Bewertung

<p class="description">Bewertungen geben Einblicke in die Meinungen und Erfahrungen anderer mit einem Produkt. Benutzer können auch Produkte bewerten, die sie gekauft haben.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Einfache Bewertungen

{{"demo": "pages/components/rating/SimpleRating.js"}}

## Customized ratings

Hier einige Beispiele zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/rating/CustomizedRatings.js"}}

## Hover feedback

You can display a label on hover to help users pick the correct rating value. Die Demo verwendet die `onChangeActive` Prop.

{{"demo": "pages/components/rating/HoverRating.js"}}

## Half ratings

The rating can display any float number with the `value` prop. Use the `precision` prop to define the minimum increment value change allowed.

{{"demo": "pages/components/rating/HalfRating.js"}}

## Größen

Lust auf größere oder kleinere Bewertungen? Verwenden Sie die `size` Prop.

{{"demo": "pages/components/rating/RatingSize.js"}}

## Barrierefreiheit

(WAI Tutorial: https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating)

Die Barrierefreiheit dieser Komponente setzt voraus:

- A radio group is used with its fields visually hidden. It contains six radio buttons, one for each star and another for 0 stars, which is checked by default. Make sure you are providing a `name` prop that is unique to the parent form.
- The labels for the radio buttons contain actual text (“1 Star”, “2 Stars”, …), make sure you provide a `getLabelText` prop when the page language is not English.

By default, the rating component uses both a difference of color and shape between the filled and empty icons to indicate the value.

In the event that you are using color as the only means to indicate the value, the information should also be also displayed as text, as in this demo. This is important to match [success Criterion 1.4.1](https://www.w3.org/TR/WCAG21/#use-of-color) of WCAG2.1.

{{"demo": "pages/components/rating/TextRating.js"}}
