---
title: Divider React component
components: Divider
---
# Dividers (Divisores)

<p class="description">Um divisor é uma linha fina que agrupa conteúdo em listas e layouts.</p>

[Dividers](https://material.io/design/components/dividers.html) separate content into clear groups.

## Divisores de lista

The divider renders as a `<hr>` by default. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/demos/dividers/ListDividers.js"}}

## Especificação HTML5

We need to make sure the `Divider` is rendered as a `li` to match the HTML5 specification. The examples below show two ways of achieving this.

## Divisores de inserção

The `inset` property has now been deprecated. You should now use `variant="inset"`

{{"demo": "pages/demos/dividers/InsetDividers.js"}}

## Divisores Subheader

{{"demo": "pages/demos/dividers/SubheaderDividers.js"}}

## Divisores médios

{{"demo": "pages/demos/dividers/MiddleDividers.js"}}