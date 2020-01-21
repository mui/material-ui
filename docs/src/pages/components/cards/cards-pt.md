---
title: Componente React para Cartão
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---

# Card (cartão)

<p class="description">Cartões contêm conteúdo e ações sobre um único assunto.</p>

[Cartões](https://material.io/design/components/cards.html) são componentes que exibem conteúdo e ações em um único tópico.

Eles devem ser relevantes, de fácil verificação e apresentar informações úteis. Elementos, como texto e imagens, deve ser colocado sobre eles de uma forma que indica claramente a hierarquia.

## Cartão Simples

Apesar dos componentes cartões poderem suportar múltiplas ações tais como: controles de UI, e overflow de menu, use-os com moderação e lembre-se que cartões são pontos de entrada de informações mais complexas e detalhadas.

{{"demo": "pages/components/cards/SimpleCard.js", "bg": true}}

### Outlined Card

Set `variant="outlined` to render an outlined card.

{{"demo": "pages/components/cards/OutlinedCard.js", "bg": true}}

## Interação Complexa

O conteúdo do cartão pode ser expandido.

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## Mídia

Exemplo de um cartão usando uma imagem para demonstrar a principal ideia do conteúdo.

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

Por padrão, nós usamos uma combinação de um elemento `&lt;div&gt;` e um *background image* para exibir o componente media. Isto pode ser problemático em algumas situações. Por exemplo, você pode querer exibir um vídeo ou uma imagem responsiva. Use a propriedade `component` para estes casos de uso:

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> ⚠️ Quando `component="img"`, CardMedia depende de `object-fit` para centralizar a imagem. Não é suportado pelo IE 11.

## Controles de UI

Ações suplementares dentro do cartão são explicitamente chamadas usando ícones, texto e controles de interface do usuário, normalmente colocados na parte inferior do cartão.

Aqui está um exemplo de um controle de mídia do cartão.

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}