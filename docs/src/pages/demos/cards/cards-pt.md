---
title: Card React component
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---
# Cards

<p class="description">Cards contém o conteúdo e ações sobre um único sujeito.</p>

[Cards](https://material.io/design/components/cards.html) são interfaces que exibem conteúdo e ações em um único tópico.

Eles devem ser fáceis de procurar informações relevantes e acionáveis. Elementos, como texto e imagens, devem ser colocados neles de uma maneira que indique claramente a hierarquia.

## Simple Card

Apesar dos componentes "Cards" poderem suportar múltiplas ações tais como: controles de UI, e overflow de menu, use-os com moderação e lembre-se que os cartões são pontos de entrada de informações mais complexas e detalhadas.

{{"demo": "pages/demos/cards/SimpleCard.js"}}

## Complex Interaction

On desktop, card content can expand.

{{"demo": "pages/demos/cards/RecipeReviewCard.js"}}

## Media

Example of a card using an image to reinforce the content.

{{"demo": "pages/demos/cards/MediaCard.js"}}

By default, we use the combination of a `<div>` element and a *background image* to display the media. It can be problematic in some situations. For instance, you might want to display a video or a responsive image. Use the `component` property for these use cases:

{{"demo": "pages/demos/cards/ImgMediaCard.js"}}

## UI Controls

Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.

Here's an example of a media control card.

{{"demo": "pages/demos/cards/MediaControlCard.js"}}