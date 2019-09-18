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

- Um grupo de botões é usado com seus campos visualmente ocultos. Ele contém seis botões de opção, um para cada estrela e outro para 0 estrelas, que é marcado por padrão. Certifique-se de que você está fornecendo uma propriedade `name`, que é exclusivo para o formulário principal.
- Os rótulos dos botões de opção contêm o texto atualmente como ("1 Star", "2 Star", …). Certifique-se de fornecer uma propriedade `getLabelText` quando o idioma da página não for o inglês.