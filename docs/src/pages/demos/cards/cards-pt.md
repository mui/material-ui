---
title: Componente React Card
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---
# Card (Cartões)

<p class="description">Os cards contêm conteúdo e ações sobre um único assunto.</p>

[Cards](https://material.io/design/components/cards.html) são interfaces que exibem conteúdo e ações em um único tópico.

Eles devem ser fáceis de procurar informações relevantes e acionáveis. Elementos, como texto e imagens, devem ser colocados neles de uma maneira que indique claramente a hierarquia.

## Cartão Simples

Apesar dos componentes "Cards" poderem suportar múltiplas ações tais como: controles de UI, e overflow de menu, use-os com moderação e lembre-se que os cards são pontos de entrada de informações mais complexas e detalhadas.

{{"demo": "pages/demos/cards/SimpleCard.js"}}

## Interação Complexa

O conteúdo do Card pode ser expandido.

{{"demo": "pages/demos/cards/RecipeReviewCard.js"}}

## Mídia

Exemplo de um Card usando uma imagem para reforçar o conteúdo.

{{"demo": "pages/demos/cards/MediaCard.js"}}

Por padrão, usamos a combinação de um `<div>` elemento e um *background image* para exibir a mídia. Isto pode ser problemático em algumas situações. Por exemplo, você pode querer exibir um vídeo ou uma imagem responsiva. Use a propriedade `component` para estes casos de uso:

{{"demo": "pages/demos/cards/ImgMediaCard.js"}}

## Controles da interface do usuário

Ações suplementares dentro do cartão são explicitamente chamadas usando ícones, texto e controles de interface do usuário, normalmente colocados na parte inferior do cartão.

Aqui está um exemplo de um controle do Mídia Card.

{{"demo": "pages/demos/cards/MediaControlCard.js"}}