---
product: material-ui
title: React Stack component
components: Stack
githubLabel: 'component: Stack'
---

# Stack

<p class="description">O componente Stack gerencia o leiaute de filhos imediatos ao longo do eixo vertical ou horizontal com espaçamento e/ou divisão opcional entre cada filho.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Uso

`Stack` is concerned with one-dimensional layouts, while [Grid](/material-ui/react-grid/) handles two-dimensional layouts. The default direction is `column` which stacks children vertically.

{{"demo": "BasicStack.js", "bg": true}}

Para controlar o espaço entre os filhos, use a prop `spacing` The spacing value can be any number, including decimals and any string. The spacing value can be any number, including decimals and any string. The prop is converted into a CSS property using the [`theme.spacing()`](/material-ui/customization/spacing/) helper.

## Direção

By default, `Stack` arranges items vertically in a `column`. However, the `direction` prop can be used to position items horizontally in a `row` as well.

{{"demo": "DirectionStack.js", "bg": true}}

## Divisores

Use the `divider` prop to insert an element between each child. This works particularly well with the [Divider](/material-ui/react-divider/) component.

{{"demo": "DividerStack.js", "bg": true}}

## Valores responsivos

You can switch the `direction` or `spacing` values based on the active breakpoint.

{{"demo": "ResponsiveStack.js", "bg": true}}

## Interativo

Abaixo está uma demonstração interativa que permite explorar os resultados visuais das diferentes configurações:

{{"demo": "InteractiveStack.js", "hideToolbar": true, "bg": true}}

## System props

As a CSS utility component, the `Stack` supports all [`system`](/system/properties/) properties. Você pode usá-los como "props" diretamente no componente. For instance, a margin-top:

```jsx
<Stack mt={2}>
```
