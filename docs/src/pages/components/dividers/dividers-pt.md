---
title: Componente React para Divisores
components: Divider
---

# Divisores

<p class="description">Um divisor é uma linha fina que agrupa conteúdo em listas e leiautes.</p>

[Divisores](https://material.io/design/components/dividers.html) separam grupos de conteúdos.

## Divisores de lista

O divisor é renderizado como `<hr>` por padrão. Você pode também renderizar este elemento DOM usando a propriedade `divider` em um componente `ListItem`.

{{"demo": "pages/components/dividers/ListDividers.js"}}

## Especificação HTML5

Precisamos garantir que o `Divider` seja renderizado como `li` para corresponder à especificação do HTML5. Os exemplos abaixo mostram duas maneiras de conseguir isso.

## Divisores de inserção

{{"demo": "pages/components/dividers/InsetDividers.js"}}

## Divisores de subtítulo

{{"demo": "pages/components/dividers/SubheaderDividers.js"}}

## Divisores médios

{{"demo": "pages/components/dividers/MiddleDividers.js"}}