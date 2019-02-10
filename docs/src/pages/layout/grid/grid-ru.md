---
title: React-компонент Сетка
components: Сетка
---
# Сетка

<p class="description">Сетка адаптивного макета Material Design адаптируется к размеру экрана и ориентации, обеспечивая согласованность макетов.</p>

[Сетка](https://material.io/design/layout/responsive-layout-grid.html) создает визуальную согласованность между макетами, позволяя гибко адаптироваться к разнообразным дизайнам. Адаптивный пользовательский интерфейс Material Design основан на сетке с 12 колонками.

## Как это работает

Система сетки реализована с помощью компонента `Grid`:

- Она использует [модуль Flexible Box CSS](https://www.w3.org/TR/css-flexbox-1/) для повышеной гибкости.
- Существует два типа макетов: *контейнеры* и *элементы*.
- Ширина элементов задается в процентах, поэтому они всегда гибко изменяют свой размер относительно родительского элемента.
- Элементы имеют отступы для создания промежутков между отдельными элементами.
- Существует пять контрольных точек прерывания сетки: xs, sm, md, lg и xl.

## Интервал

Адаптивная сетка фокусируется на постоянной ширине отступов, а не на ширине столбца. Material Design margins and columns follow an **8px** square baseline grid. The spacing property is an integer between 0 and 10 inclusive. By default, the spacing between two grid items follows a linear function: `output(spacing) = spacing * 8px`, e.g. `spacing={2}` creates a 16px wide gap.

This output transformation function can be customized [using the theme](/customization/themes/#spacing).

{{"demo": "pages/layout/grid/SpacingGrid.js"}}

## Адаптивные сетки

Fluid grids use columns that scale and resize content. A fluid grid’s layout can use breakpoints to determine if the layout needs to change dramatically.

### Базовая сетка

The column widths apply at all breakpoints (i.e. `xs` and up).

{{"demo": "pages/layout/grid/CenteredGrid.js"}}

### Сетка с точками прерывания

Some columns have multiple widths defined, causing the layout to change at the defined breakpoint.

{{"demo": "pages/layout/grid/FullWidthGrid.js"}}

## Интерактивность

Ниже приведена интерактивная демонстрация, которая позволяет вам увидеть результаты различных настроек:

{{"demo": "pages/layout/grid/InteractiveGrid.js"}}

## Авто-разметка

The Auto-layout makes the *items* equitably share the available space. That also means you can set the width of one *item* and the others will automatically resize around it.

{{"demo": "pages/layout/grid/AutoGrid.js"}}

## Сложная сетка

The following demo doesn't follow the Material Design specification, but illustrates how the grid can be used to build complex layouts.

{{"demo": "pages/layout/grid/ComplexGrid.js"}}

## CSS макет сетки

**CSS Grid Layout** excels at dividing a page into major regions, or defining the relationship in terms of size, position, and layer, between parts of a control built from HTML primitives.

⚠️ Unfortunately, CSS grid is only supported by the most recent browsers.

{{"demo": "pages/layout/grid/CSSGrid.js"}}

## Вложенная сетка

The `container` and `item` properties are two independent booleans. They can be combined.

> Flex **контейнер** представляет собой блок, созданный элементом с вычисляемым свойством display `flex` или `inline-flex`. Дочерние элементы flex контейнера называются flex **элементы** и размещаются используя flex-модель.

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/layout/grid/NestedGrid.js"}}

## Ограничения

### Отрицательный margin

There is one limitation with the negative margin we use to implement the spacing between items. A horizontal scroll will appear if a negative margin goes beyond the `<body>`. There are 3 available workarounds: 1. Not using the spacing feature and implementing it in user space `spacing={0}` (default). 2. Applying padding to the parent with at least half the spacing value applied to the child:

```jsx
  <body>
    <div style={{ padding: 20 }}>
      <Grid container spacing={5}>
        //...
      </Grid>
    </div>
  </body>
```

1. Добавление `overflow-x: hidden;` к родителю.

### white-space: nowrap;

The initial setting on flex items is `min-width: auto`. It's causing a positioning conflict when the children is using `white-space: nowrap;`. You can experience the issue with:

```jsx
<Grid item xs>
  <Typography noWrap>
```

In order for the item to stay within the container you need to set `min-width: 0`. In practice, you can set the `zeroMinWidth` property:

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/layout/grid/AutoGridNoWrap.js"}}