---
product: material-ui
title: Componente React Grade
components: Grid
githubLabel: 'component: Grid'
materialDesign: https://m2.material.io/design/layout/understanding-layout.html
---

# Grid

<p class="description">O leiaute responsivo da grade do Material Design se adapta ao tamanho e orientação da tela, garantindo a consistência entre leiautes.</p>

Uma [grade](https://m2.material.io/design/layout/responsive-layout-grid.html) cria consistência visual entre leiautes, enquanto permite flexibilidade em uma ampla variedade de projetos. A UI responsiva do Material Design é baseada em uma grade de 12 colunas.

{{"component": "modules/components/ComponentLinkHeader.js"}}

:::warning
⚠️ The `Grid` component shouldn't be confused with a data grid; it is closer to a layout grid. For a data grid head to [the `DataGrid` component](/x/react-data-grid/).
:::

## Como funciona

The grid system is implemented with the `Grid` component:

- Ela usa [o módulo CSS de box flexível](https://www.w3.org/TR/css-flexbox-1/) para alta flexibilidade.
- Existem dois tipos de leiautes: _contêineres_ e _itens_.
- Larguras de itens são definidas em porcentagens, desse modo são sempre fluidas e dimensionadas de acordo os seus elementos pai.
- Itens têm preenchimento para criar o espaçamento entre itens individuais.
- Existem cinco pontos de quebra (breakpoints) na grade: xs, sm, md, lg e xl.
- Integer values can be given to each breakpoint, indicating how many of the 12 available columns are occupied by the component when the viewport width satisfies the [breakpoint constraints](/material-ui/customization/breakpoints/#default-breakpoints).

If you are **new to or unfamiliar with flexbox**, we encourage you to read this [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) guide.

## Grades fluídas

Fluid grids use columns that scale and resize content. A fluid grid's layout can use breakpoints to determine if the layout needs to change dramatically.

### Grade básica

Column widths are integer values between 1 and 12; they apply at any breakpoint and indicate how many columns are occupied by the component.

A value given to a breakpoint applies to all the other breakpoints wider than it (unless overridden, as you can read later in this page). For example, `xs={12}` sizes a component to occupy the whole viewport width regardless of its size.

{{"demo": "BasicGrid.js", "bg": true}}

### Grade com pontos de quebra

Components may have multiple widths defined, causing the layout to change at the defined breakpoint. Width values given to larger breakpoints override those given to smaller breakpoints.

For example, `xs={12} sm={6}` sizes a component to occupy half of the viewport width (6 columns) when viewport width is [600 or more pixels](/material-ui/customization/breakpoints/#default-breakpoints). For smaller viewports, the component fills all 12 available columns.

{{"demo": "FullWidthGrid.js", "bg": true}}

## Espaçamento

To control space between children, use the `spacing` prop. The spacing value can be any positive number, including decimals and any string. The prop is converted into a CSS property using the [`theme.spacing()`](/material-ui/customization/spacing/) helper.

{{"demo": "SpacingGrid.js", "bg": true}}

### Row & column spacing

The `rowSpacing` and `columnSpacing` props allow for specifying the row and column gaps independently. It's similar to the `row-gap` and `column-gap` properties of [CSS Grid](/system/grid/#row-gap-amp-column-gap).

{{"demo": "RowAndColumnSpacing.js", "bg": true}}

## Valores responsivos

You can switch the props' value based on the active breakpoint. For instance, we can implement the ["recommended"](https://m2.material.io/design/layout/responsive-layout-grid.html) responsive layout grid of Material Design.

{{"demo": "ResponsiveGrid.js", "bg": true}}

Responsive values is supported by:

- `colunas`
- `espaçoDeColuna`
- `direção`
- `espaçoDeLinha`
- `spacing`
- todas as outras propriedades do sistema [other props](#system-props)

:::warning
⚠️ When using a responsive `columns` prop, each grid item needs its corresponding breakpoint. For instance, this is not working. The grid item misses the value for `md`:

```jsx
<Grid container columns={{ xs: 4, md: 12 }}>
  <Grid item xs={2} />
</Grid>
```

:::

## Interativo

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## Leiaute Automático

The Auto-layout makes the _items_ equitably share the available space. That also means you can set the width of one _item_ and the others will automatically resize around it.

{{"demo": "AutoGrid.js", "bg": true}}

### Margem negativa

Set one of the size breakpoint props to `"auto"` instead of `true` / a `number` to size a column based on the natural width of its content.

{{"demo": "VariableWidthGrid.js", "bg": true}}

## Grade Complexa

The following demo doesn't follow the Material Design guidelines, but illustrates how the grid can be used to build complex layouts.

{{"demo": "ComplexGrid.js", "bg": true}}

## Grade Aninhada

The `container` and `item` props are two independent booleans; they can be combined to allow a Grid component to be both a flex container and child.

:::info
A flex **container** is the box generated by an element with a computed display of `flex` or `inline-flex`. In-flow children of a flex container are called flex **items** and are laid out using the flex layout model.
:::

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "NestedGrid.js", "bg": true}}

⚠️ Defining an explicit width to a Grid element that is flex container, flex item, and has spacing at the same time lead to unexpected behavior, avoid doing it:

```jsx
<Grid spacing={1} container item xs={12}>
```

If you need to do such, remove one of the props.

## Colunas

You can change the default number of columns (12) with the `columns` prop.

{{"demo": "ColumnsGrid.js", "bg": true}}

## Limitações

### Margem negativa

The spacing between items is implemented with a negative margin. This might lead to unexpected behaviors. For instance, to apply a background color, you need to apply `display: flex;` to the parent.

### white-space: nowrap;

The initial setting on flex items is `min-width: auto`. It's causing a positioning conflict when the children is using `white-space: nowrap;`. You can experience the issue with:

```jsx
<Grid item xs>
  <Typography noWrap>
```

In order for the item to stay within the container you need to set `min-width: 0`. In practice, you can set the `zeroMinWidth` prop:

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

The `xs`, `sm`, `md`, `lg`, and `xl` props are **not supported** within `direction="column"` and `direction="column-reverse"` containers.

They define the number of grids the component will use for a given breakpoint. They are intended to control **width** using `flex-basis` in `row` containers but they will impact height in `column` containers. If used, these props may have undesirable effects on the height of the `Grid` item elements.

## Leiaute de Grade CSS

The `Grid` component is using CSS flexbox internally. But as seen below, you can easily use [the system](/system/grid/) and CSS Grid to layout your pages.

{{"demo": "CSSGrid.js", "bg": true}}

## System props

As a CSS utility component, the `Grid` supports all [`system`](/system/properties/) properties. You can use them as props directly on the component. For instance, a padding:

```jsx
<Grid item p={2}>
```
