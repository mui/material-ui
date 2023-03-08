---
product: material-ui
title: Componente React para Cartão
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
githubLabel: 'component: card'
materialDesign: https://m2.material.io/components/cards
---

# Cartão

<p class="description">Cartões contêm conteúdo e ações sobre um único assunto.</p>

[Cartões](https://m2.material.io/components/cards) são componentes que exibem conteúdo e ações em um único tópico.

Eles devem ser relevantes, de fácil verificação e apresentar informações úteis. Elementos, como texto e imagens, deve ser colocado sobre eles de uma forma que indica claramente a hierarquia.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic card

Apesar dos componentes cartões poderem suportar múltiplas ações tais como: controles de UI, e overflow de menu, use-os com moderação e lembre-se que cartões são pontos de entrada de informações mais complexas e detalhadas.

{{"demo": "BasicCard.js", "bg": true}}

### Cartão Delineado

Defina `variant="outlined"` para renderizar um cartão delineado.

{{"demo": "OutlinedCard.js", "bg": true}}

## Interação Complexa

O conteúdo do cartão pode ser expandido. (Clique no gerador abaixo para ver detalhes.)

{{"demo": "RecipeReviewCard.js", "bg": true}}

## Mídia

Exemplo de um cartão usando uma imagem para reforçar o conteúdo.

{{"demo": "MediaCard.js", "bg": true}}

Por padrão, nós usamos a combinação de um elemento `<div>` e uma _imagem de fundo_ para exibir a mídia. Isto pode ser problemático em algumas situações. Por exemplo, você pode querer exibir um vídeo ou uma imagem responsiva. Use a propriedade `component` para estas situações:

{{"demo": "ImgMediaCard.js", "bg": true}}

:::warning
⚠️ When `component="img"`, CardMedia relies on `object-fit` for centering the image. It's not supported by IE11.
:::

## Ação primária

Often a card allow users to interact with the entirety of its surface to trigger its main action, be it an expansion, a link to another screen or some other behavior. The action area of the card can be specified by wrapping its contents in a `CardActionArea` component.

{{"demo": "ActionAreaCard.js", "bg": true}}

A card can also offer supplemental actions which should stand detached from the main action area in order to avoid event overlap.

{{"demo": "MultiActionAreaCard.js", "bg": true}}

## Controles da interface do usuário

Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.

Here's an example of a media control card.

{{"demo": "MediaControlCard.js", "bg": true}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/card/).
