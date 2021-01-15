---
title: Componente React Chip
components: Chip
---

# Chip

<p class="description">Chips são elementos compactos que representam uma entrada, atributo ou ação.</p>

[Chips](https://material.io/design/components/chips.html) permitirão que usuários insiram informações, façam seleções, filtrem conteúdo ou acionem gatilhos.

Embora incluído aqui como um componente independente, o uso mais comum será em alguma forma de entrada, portanto, alguns dos comportamentos demonstrados aqui não são mostrados considerando um contexto.

## Chip

Exemplo de Chips, usando uma imagem de Avatar, Ícone SVG, "Letra" e Avatar (texto).

- Chips com a propriedade `onClick` definida, mudará a aparência do foco, ao passar por cima (hover) e clique.
- Chips com a propriedade `onDelete` definida irá exibir um ícone de remoção no qual modificará a aparência ao passar por cima (hover).

{{"demo": "pages/components/chips/Chips.js"}}

### Chips Delineados

Chips Delineados oferecem um estilo alternativo.

{{"demo": "pages/components/chips/OutlinedChips.js"}}

## Matriz de Chip (Array)

Um exemplo de renderização de vários Chips a partir de uma matriz de valores. Deletando um chip irá remove-lo da matriz. Observe que mesmo que a propriedade `onClick` não esteja definida, o Chip pode ser focado, mas não irá ganhar efeito de profundidade quando clicado ou tocado.

{{"demo": "pages/components/chips/ChipsArray.js", "bg": true}}

## Chip Pequeno

Você pode usar a propriedade `size` para definir um Chip pequeno.

### Variante Default

{{"demo": "pages/components/chips/SmallChips.js"}}

### Variante Outlined

{{"demo": "pages/components/chips/SmallOutlinedChips.js"}}

## Chip - Exemplo interativo

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideToolbar": true}}

## Acessibilidade

Se o Chip é deletável ou clicável, então é como um botão na ordem da tabulação. Quando o Chip está focado (ex. quando tabulando) pressionando (evento `keyup`) `Backspace` ou `Delete` irá chamar o evento manipulador `onDelete`, enquanto liberando com a tecla `Escape` irá tirar o foco do Chip.