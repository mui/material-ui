---
title: Componente React de avaliação
components: Rating
---

# Avaliação

<p class="description">As avaliações fornecem informações sobre opiniões e experiências de outros usuários com um produto. Os usuários também podem avaliar os produtos que compraram.</p>

## Avaliações simples

{{"demo": "pages/components/rating/SimpleRating.js"}}

## Avaliações customizadas

Aqui esta um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/rating/CustomizedRatings.js"}}

## Feedback ao passar mouse

Você pode exibir um rótulo ao passar o mouse para ajudar os usuários a escolher o valor de avaliação correto. A primeira demo usa a propriedade `onChangeActive` enquanto o último usa a propriedade `IconContainerComponent`.

{{"demo": "pages/components/rating/HoverRating.js"}}

## Meias avaliações

A avaliação pode exibir qualquer número flutuante com a propriedade `value`. Use a propriedade `precision` para definir a alteração mínima do valor de incremento permitida.

{{"demo": "pages/components/rating/HalfRating.js"}}

## Tamanhos

Gosta de avaliações maiores ou menores? Use a propriedade `size`.

{{"demo": "pages/components/rating/RatingSize.js"}}

## Acessibilidade

A acessibilidade neste componente conta com:

- A radio group is used with its fields visually hidden. It contains six radio buttons, one for each star and another for 0 stars, which is checked by default. Make sure you are providing a `name` prop that is unique to the parent form.
- The labels for the radio buttons contain actual text (“1 Star”, “2 Stars”, …), make sure you provide a `getLabelText` prop when the page language is not English.