---
title: Divider React component
components: Divider
---
# Dividers (Divisores)

<p class="description">Um divisor é uma linha fina que agrupa conteúdo em listas e layouts.</p>

[Dividers (Divisores)](https://material.io/design/components/dividers.html) separam grupos de conteúdos.

## Divisores de lista

The divider renders as a `<hr>` by default. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/demos/dividers/ListDividers.js"}}

## Especificação HTML5

Precisamos garantir que o `Divider` seja renderizado como `li` para corresponder à especificação do HTML5. Os exemplos abaixo mostram duas maneiras de conseguir isso.

## Divisores de inserção

{{"demo": "pages/demos/dividers/InsetDividers.js"}}

## Divisores de subtítulo

{{"demo": "pages/demos/dividers/SubheaderDividers.js"}}

## Divisores médios

{{"demo": "pages/demos/dividers/MiddleDividers.js"}}