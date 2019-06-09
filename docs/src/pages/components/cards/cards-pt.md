---
title: Componente React para Cartão
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---

# Cartões

<p class="description">Cartões contêm conteúdo e ações sobre um único assunto.</p>

[Cartões](https://material.io/design/components/cards.html) são componentes que exibem conteúdo e ações em um único tópico.

Eles devem facilitar a verificação de informações relevantes e acionáveis. Elementos, como texto e imagens, devem ser colocados neles de uma maneira que indique claramente a hierarquia.

## Cartão Simples

Apesar dos componentes cartões poderem suportar múltiplas ações tais como: controles de UI, e overflow de menu, use-os com moderação e lembre-se que cartões são pontos de entrada de informações mais complexas e detalhadas.

{{"demo": "pages/components/cards/SimpleCard.js"}}

## Interação Complexa

O conteúdo do cartão pode ser expandido.

{{"demo": "pages/components/cards/RecipeReviewCard.js"}}

## Mídia

Exemplo de um cartão usando uma imagem para reforçar o conteúdo.

{{"demo": "pages/components/cards/MediaCard.js"}}

Por padrão, usamos a combinação de um elemento `<div>` e uma *imagem de fundo* para exibir a mídia. Isto pode ser problemático em algumas situações. Por exemplo, você pode querer exibir um vídeo ou uma imagem responsiva. Use a propriedade `component` para estas situações:

{{"demo": "pages/components/cards/ImgMediaCard.js"}}

> ⚠️ Quando a propriedade `component="img"`, a mídia conta com a propriedade `object-fit` para centralizar a imagem. Não é suportado pelo IE 11.

## Controles de UI

Ações suplementares dentro do cartão são explicitamente chamadas usando ícones, texto e controles de interface do usuário, normalmente colocados na parte inferior do cartão.

Aqui está um exemplo de um controle de mídia do cartão.

{{"demo": "pages/components/cards/MediaControlCard.js"}}