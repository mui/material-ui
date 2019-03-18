---
title: Chip React component
components: Chip
---
# Chips (Navios)

<p class="description">Chips são elementos compactos que representam uma entrada, atributo ou ação.</p>

[Chips](https://material.io/design/components/chips.html) permitirá que usuários insiram informações, façam seleções, filtrem conteúdo ou acionem gatilhos.

Embora incluído aqui como um componente independente, o uso mais comum será em alguma forma de entrada, portanto, alguns dos comportamentos demonstrados aqui não são mostrados no contexto.

## Chip

Exemplo do uso do Chips em Avatar, Avatar ícone SVG, "Carta" e (string) Avatar.

- Chips com propriedade `onClick` definida, mudará o foco da aparência, suspensão e clique.
- Chips with the `onDelete` property defined will display a delete icon which changes appearance on hover.

{{"demo": "pages/demos/chips/Chips.js"}}

### Outlined Chips

Chips delineados oferecem uma alternativa de estilo.

{{"demo": "pages/demos/chips/OutlinedChips.js"}}

## Chip array

Um exemplo de renderização de múltiplos Chips de uma matriz de valores. Deletando um chip removerá da matriz. Observe que uma vez nenhuma propriedade `onClick` definida, o Chip pode ser focado, mas não terá ganhos profundos quando clicado ou tocado.

{{"demo": "pages/demos/chips/ChipsArray.js"}}

## Chip Playground

{{"demo": "pages/demos/chips/ChipsPlayground.js", "hideHeader": true}}