---
title: Componente React Chip
components: Chip
---

# Chips

<p class="description">Chips são elementos compactos que representam uma entrada, atributo ou ação.</p>

[Chips](https://material.io/design/components/chips.html) permitirá que usuários insiram informações, façam seleções, filtrem conteúdo ou acionem gatilhos.

Embora incluído aqui como um componente independente, o uso mais comum será em alguma forma de entrada, portanto, alguns dos comportamentos demonstrados aqui não são mostrados no contexto.

## Chip

Exemplo de Chips, usando uma imagem de Avatar, Ícone SVG, "Letra" e Avatar (texto).

- Chips com a propriedade `onClick` definida, mudará a aparência do foco, ao passar por cima (hover) e clique.
- Chips com a propriedade `onDelete` definida irá exibir um ícone de remoção no qual modificará a aparência ao passar por cima (hover).

{{"demo": "pages/components/chips/Chips.js"}}

### Chips Delineados

Chips Delineados oferecem um estilo alternativo.

{{"demo": "pages/components/chips/OutlinedChips.js"}}

## Matriz de Chip (Array)

Um exemplo de renderização de vários Chips em uma matriz de valores. Deletando um chip irá remove-lo da matriz. Observe que mesmo que a propriedade `onClick` não esteja definida, o Chip pode ser focado, mas não irá ganhar efeito de profundidade quando clicado ou tocado.

{{"demo": "pages/components/chips/ChipsArray.js"}}

## Chip Pequeno

Você pode usar a propriedade `size` para definir um Chip pequeno.

### Variante Default

{{"demo": "pages/components/chips/SmallChips.js"}}

### Variante Outlined

{{"demo": "pages/components/chips/SmallOutlinedChips.js"}}

## Chip - Live Demo

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideHeader": true}}