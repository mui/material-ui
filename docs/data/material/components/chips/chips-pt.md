---
product: material-ui
title: Componente React Chip
components: Chip
githubLabel: 'component: chip'
materialDesign: https://m2.material.io/components/chips
---

# Chip

<p class="description">Chips são elementos compactos que representam uma entrada, atributo ou ação.</p>

[Chips](https://m2.material.io/components/chips) permitirão que usuários insiram informações, façam seleções, filtrem conteúdo ou acionem gatilhos.

Embora incluído aqui como um componente independente, o uso mais comum será em alguma forma de entrada, portanto, alguns dos comportamentos demonstrados aqui não são mostrados considerando um contexto.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Chip básico

O componente `Chip` oferece suporte a estilos contornados e preenchidos.

{{"demo": "BasicChips.js"}}

## Ações do Chip

Você pode usar as seguintes ações.

- Chips com a propriedade `onClick` definida, mudará a aparência com foco, ao passar por cima e com clique.
- Chips com a propriedade `onDelete` definida irá exibir um ícone de remoção, no qual modificará a aparência ao passar por cima.

### Clicável

{{"demo": "ClickeableChips.js"}}

### Deletável

{{"demo": "DeleteableChips.js"}}

### Clicável e deletável

{{"demo": "ClickableAndDeletableChips.js"}}

### Link clicável

{{"demo": "ClickeableLinkChips.js"}}

### Ícone de exclusão personalizado

{{"demo": "CustomDeleteIconChips.js"}}

## Chip adornments

You can add ornaments to the beginning of the component.

Use the `avatar` prop to add an avatar or use the `icon` prop to add an icon.

### Avatar chip

{{"demo": "AvatarChips.js"}}

### Icon chip

{{"demo": "IconChips.js"}}

## Color chip

You can use the `color` prop to define a primary or secondary color.

{{"demo": "ColorChips.js"}}

## Sizes chip

Você pode usar a propriedade `size` para definir um Chip pequeno.

{{"demo": "SizesChips.js"}}

## Matriz de Chip (Array)

An example of rendering multiple chips from an array of values. Deletando um chip irá remove-lo da matriz. Note that since no `onClick` prop is defined, the `Chip` can be focused, but does not gain depth while clicked or touched.

{{"demo": "ChipsArray.js", "bg": true}}

## Chip playground

{{"demo": "ChipsPlayground.js", "hideToolbar": true}}

## Acessibilidade

Se o Chip é deletável ou clicável, então é como um botão na ordem da tabulação. Quando o Chip está focado (ex. quando tabulando) pressionando (evento `keyup`) `Backspace` ou `Delete` irá chamar o evento manipulador `onDelete`, enquanto liberando com a tecla `Escape` irá tirar o foco do Chip.
