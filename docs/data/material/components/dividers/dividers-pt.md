---
product: material-ui
title: Componente React Divisor
components: Divider
githubLabel: 'component: divider'
materialDesign: https://m2.material.io/components/dividers
---

# Divider

<p class="description">Um divisor é uma linha fina que agrupa conteúdo em listas e leiautes.</p>

[Divisores](https://m2.material.io/components/dividers) separam conteúdos em grupos correspondentes.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Divisores de lista

O divisor renderiza como um `<hr>` por padrão. Você pode adicionar a renderização desse elemento no DOM usando a propriedade `divider` no componente `ListItem`.

{{"demo": "ListDividers.js", "bg": true}}

## Especificação HTML5

Em uma lista, você deve garantir que o `Divider` seja renderizado como um elemento `<li>` para corresponder à especificação HTML5. Os exemplos abaixo mostram duas maneiras de conseguir isso.

## Divisores de inclusão

{{"demo": "InsetDividers.js", "bg": true}}

## Divisores de subtítulo

{{"demo": "SubheaderDividers.js", "bg": true}}

## Divisores médios

{{"demo": "MiddleDividers.js", "bg": true}}

## Divisores com texto

Você também pode renderizar um divisor com conteúdo.

{{"demo": "DividerText.js"}}

:::info
**Accessibility tips**: When using the `Divider` component for visual decoration, such as in a heading, explicitly specify `role="presentation"` to the divider to make sure screen readers can announce its content:

```js
<Divider component="div" role="presentation">
  {/* any elements nested inside the role="presentation" preserve their semantics. */}
  <Typography variant="h2">My Heading</Typography>
</Divider>
```

:::

## Divisor vertical

You can also render a divider vertically using the `orientation` prop.

{{"demo": "VerticalDividers.js", "bg": true}}

:::info
Note the use of the `flexItem` prop to accommodate for the flex container.
:::

### Vertical with variant middle

You can also render a vertical divider with `variant="middle"`.

{{"demo": "VerticalDividerMiddle.js", "bg": true}}

### Vertical com texto

You can also render a vertical divider with content.

{{"demo": "VerticalDividerText.js"}}
