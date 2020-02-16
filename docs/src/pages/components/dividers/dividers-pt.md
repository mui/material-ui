---
title: Componente React para Divisores
components: Divider
---

# Divider (divisor)

<p class="description">Um divisor é uma linha fina que agrupa conteúdo em listas e leiautes.</p>

[Divisores](https://material.io/design/components/dividers.html) separam grupos de conteúdos.

## Divisores de lista

O divisor renderiza como um `<hr>` por padrão. Você pode salvar a renderização desse elemento DOM usando a propriedade `divider` no componente `ListItem`.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## Especificação HTML5

Em uma lista, você deve garantir que o `Divisor` seja renderizado como um elemento `<li>` para corresponder à especificação HTML5. Os exemplos abaixo mostram duas maneiras de conseguir isso.

## Divisores de inserção

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Divisores de subtítulo

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Divisores médios

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Vertical Dividers

You can also render a divider vertically using the `orientation` prop. Note the use of the `flexItem` prop to accommodate for the flex container.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}