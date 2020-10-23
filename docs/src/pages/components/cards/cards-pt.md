---
title: React Card component
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
githubLabel: 'component: Card'
materialDesign: https://material.io/components/cards
---

# Cartão

<p class="description">Cartões contêm conteúdo e ações sobre um único assunto.</p>

[Cartões](https://material.io/design/components/cards.html) são componentes que exibem conteúdo e ações em um único tópico.

Eles devem ser relevantes, de fácil verificação e apresentar informações úteis. Elementos, como texto e imagens, deve ser colocado sobre eles de uma forma que indica claramente a hierarquia.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Cartão Simples

Apesar dos componentes cartões poderem suportar múltiplas ações tais como: controles de UI, e overflow de menu, use-os com moderação e lembre-se que cartões são pontos de entrada de informações mais complexas e detalhadas.

{{"demo": "pages/components/cards/SimpleCard.js", "bg": true}}

### Cartão Delineado

Defina `variant="outlined"` para renderizar um cartão delineado.

{{"demo": "pages/components/cards/OutlinedCard.js", "bg": true}}

## Interação Complexa

O conteúdo do cartão pode ser expandido. (Click the downward chevron to view the recipe.)

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## Mídia

Exemplo de um cartão usando uma imagem para reforçar o conteúdo.

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

Por padrão, nós usamos uma combinação de um elemento `&lt;div&gt;` e um *background image* para exibir o componente media. Isto pode ser problemático em algumas situações. Por exemplo, você pode querer exibir um vídeo ou uma imagem responsiva. Use a propriedade `component` para estes casos de uso:

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> ⚠️ Quando `component="img"`, CardMedia depende de `object-fit` para centralizar a imagem. It's not supported by IE11.

## Primary action

Often a card allow users to interact with the entirety of its surface to trigger its main action, be it an expansion, a link to another screen or some other behavior. The action area of the card can be specified by wrapping its contents in a `CardActionArea` component.

{{"demo": "pages/components/cards/ActionAreaCard.js", "bg": true}}

A card can also offer supplemental actions which should stand detached from the main action area in order to avoid event overlap.

{{"demo": "pages/components/cards/MultiActionAreaCard.js", "bg": true}}

## Controles da interface do usuário

Ações suplementares dentro do cartão são explicitamente chamadas usando ícones, texto e controles de interface do usuário, normalmente colocados na parte inferior do cartão.

Aqui está um exemplo de um controle de mídia com cartão.

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}

## Customização

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/components/card).
