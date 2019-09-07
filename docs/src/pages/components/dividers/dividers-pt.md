---
title: Componente React para Divisores
components: Divider
---

# Divisores

<p class="description">Um divisor é uma linha fina que agrupa conteúdo em listas e leiautes.</p>

[Divisores](https://material.io/design/components/dividers.html) separam grupos de conteúdos.

## Divisores de lista

The divider renders as an `<hr>` by default. Você pode salvar a renderização desse elemento DOM usando a propriedade `divider` no componente `ListItem`.

{{"demo": "pages/components/dividers/ListDividers.js"}}

## Especificação HTML5

In a list, you should ensure the `Divider` is rendered as an `<li>` to match the HTML5 specification. Os exemplos abaixo mostram duas maneiras de conseguir isso.

## Divisores de inserção

{{"demo": "pages/components/dividers/InsetDividers.js"}}

## Divisores de subtítulo

{{"demo": "pages/components/dividers/SubheaderDividers.js"}}

## Divisores médios

{{"demo": "pages/components/dividers/MiddleDividers.js"}}