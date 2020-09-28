---
title: Componente React para Avaliações
components: Rating
githubLabel: 'component: Rating'
waiAria: 'https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating'
---

# Rating

<p class="description">Ratings provide insight regarding others’ opinions and experiences, and can allow the user to submit a rating of thier own.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic rating

{{"demo": "pages/components/rating/BasicRating.js"}}

## Rating precision

A avaliação pode exibir qualquer número flutuante com a propriedade `value`. Use a propriedade `precision` para definir a alteração mínima do valor de incremento permitida.

{{"demo": "pages/components/rating/HalfRating.js"}}

## Feedback ao passar o mouse

You can display a label on hover to help the user pick the correct rating value. A demonstração usa a propriedade `onChangeActive`.

{{"demo": "pages/components/rating/HoverRating.js"}}

## Tamanhos

For larger or smaller ratings use the `size` prop.

{{"demo": "pages/components/rating/RatingSize.js"}}

## Customized rating

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/rating/CustomizedRating.js"}}

## Acessibilidade

([WAI tutorial](https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating))

A acessibilidade neste componente conta com:

- A radio group with its fields visually hidden. It contains six radio buttons, one for each star, and another for 0 stars that is checked by default. Be sure to provide a value for the `name` prop that is unique to the parent form.
- Labels for the radio buttons containing actual text (“1 Star”, “2 Stars”, …). Be sure to provide a suitable function to the `getLabelText` prop when the page is in a language other than English. You can use the [included locales](https://material-ui.com/guides/localization/), or provide your own.
- A visually distinct appearance for the rating icons. By default, the rating component uses both a difference of color and shape (filled and empty icons)to indicate the value. In the event that you are using color as the only means to indicate the value, the information should also be also displayed as text, as in this demo. This is important to match [success Criterion 1.4.1](https://www.w3.org/TR/WCAG21/#use-of-color) of WCAG2.1.

{{"demo": "pages/components/rating/TextRating.js"}}

### ARIA

The read only rating has a role of "img", and an aria-label that describes the displayed rating.

### Teclado

Because the rating component uses radio buttons, keyboard interaction follows the native browser behavior. Tab will focus the current rating, and cursor keys control the selected rating.

The read only rating is not focusable.
