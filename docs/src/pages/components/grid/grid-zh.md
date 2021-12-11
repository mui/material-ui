---
title: React Grid（栅格）组件
components: Grid
githubLabel: 'component: Grid'
materialDesign: https://material.io/design/layout/understanding-layout.html
---

# Grid 栅格

<p class="description">Material Design 响应式布局的栅格可适应屏幕大小和方向，确保布局在不同尺寸之间的一致性。</p>

[Grid 栅格组件](https://material.io/design/layout/responsive-layout-grid.html) 能确保不同布局间的视觉层面的舒适感，同时在众多不同设计中保持灵活性。 Material Design 基于 12 列的网格布局来做到 UI 的响应式。

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

> ⚠️ `栅格` 组件不要与承载大量数据的表格（data grid）进行混淆；这个组件更倾向于在布局中使用。 如果需使用承载大量数据的表格，请看这里的 [ `数据表格` 组件](/components/data-grid/)。

## 工作原理

栅格系统是通过 `Grid` 组件实现的：

- 它使用 [CSS 弹性盒子模块](https://www.w3.org/TR/css-flexbox-1/) 来做到高度灵活。
- 它有两种类型的布局： _containers_ ， _items_。
- 每项的宽度是按百分比设置的，所以它们的大小总是相对于它们的父元素流动。
- 子项目（items）使用内边距来保持和其他块（items）的间距。
- 其中五个断点可供使用：xs，sm，md，lg 和 xl。
- 你可以为每个断点提供整数值，表示当视口宽度满足 [断点约束](/customization/breakpoints/#default-breakpoints) 时，12 个可用列中有多少列被组件占用。

若你对 **flexbox 不太熟悉**，我们建议你阅读 [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 手册。

## Fluid grids 流式网格

流式网格可以通过列（column）来缩放和调整内容的大小。 在使用流式网格布局时，可以通过断点来决定该布局是否需要大幅改变。

### 基本栅格

每一列的宽度是 1 到 12 之间的整数值；这些宽度应用于任何断点，且表明了组件占用多少列。

你可以给定一个断点值来应用于比它更宽的所有其他断点（除非被覆盖，你可以在本页的后半部分了解被覆盖后的行为）。 例如，无论组件的大小如何，`xs={12}` 都会占据整个视口的宽度。

{{"demo": "pages/components/grid/BasicGrid.js", "bg": true}}

### Grid with multiple breakpoints

组件可能会定义多种宽度，用来根据事先定义的断点（breakpoint）来改变其宽度。 你可以给较大的断点指定宽度值。那么它会覆盖给较小断点指定的宽度值。

例如，`xs={12} sm={6}` 表示当视口宽度为 [600 或更多像素](/customization/breakpoints/#default-breakpoints) 时，将组件的大小调整为占据视口宽度的一半（6列）。 对于较小的视口，该组件将填充所有 12 个可用的列。

{{"demo": "pages/components/grid/FullWidthGrid.js", "bg": true}}

## Spacing

要控制子组件之间的空间，请使用 `spacing` 属性。 间距值可以是任何数字（包括浮点数）和字符串。 该属性借助 [`theme.spaming()`](/customization/spacing/) 被转换为 CSS 属性。

{{"demo": "pages/components/grid/SpacingGrid.js", "bg": true}}

### 行、列间距

The `rowSpacing` and `columnSpacing` props allow for specifying the row and column gaps independently. It's similar to the `row-gap` and `column-gap` properties of [CSS Grid](/system/grid/#row-gap-amp-column-gap).

{{"demo": "pages/components/grid/RowAndColumnSpacing.js", "bg": true}}

## Responsive values

You can switch the props' value based on the active breakpoint. For instance, we can implement the ["recommended"](https://material.io/design/layout/responsive-layout-grid.html) responsive layout grid of Material Design.

{{"demo": "pages/components/grid/ResponsiveGrid.js", "bg": true}}

Responsive values is supported by:

- `columns`
- `columnSpacing`
- `direction`
- `rowSpacing`
- `spacing`
- 系统中的所有[其它属性](#system-props)

> ⚠️ 当使用响应 `column` 属性时，每个网格项目需要其对应的断点。 例如，这种做法行不通。 网格项目丢失了 `md` 的值：
> 
> ```jsx
> <Grid container columns={{ xs: 4, md: 12 }}>
>    <Grid item xs={2} />
> > </Grid>
> ```

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## 自适应布局

自适应布局可以让 _子项（items）_ 之间平均地利用空间。 这也意味着你可以显式设置一个 _子项（item）_ 的宽度，而使其他项的大小根据其宽度自动进行调整。

{{"demo": "pages/components/grid/AutoGrid.js", "bg": true}}

### Variable width content

Set one of the size breakpoint props to `"auto"` instead of `true` / a `number` to size a column based on the natural width of its content.

{{"demo": "pages/components/grid/VariableWidthGrid.js", "bg": true}}

## 复杂的栅格

The following demo doesn't follow the Material Design guidelines, but illustrates how the grid can be used to build complex layouts.

{{"demo": "pages/components/grid/ComplexGrid.js", "bg": true}}

## 嵌套栅格

The `container` and `item` props are two independent booleans; they can be combined to allow a Grid component to be both a flex container and child.

> 一个 flex **容器** 是通过将 `flex` 或 `inline-flex`的计算显示赋予给一个元素而生成的。 Flex 容器的流入子容器称为 flex **items**， 它们使用 flex 布局模型进行布局。

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js", "bg": true}}

⚠️ Defining an explicit width to a Grid element that is flex container, flex item, and has spacing at the same time lead to unexpected behavior, avoid doing it:

```jsx
<Grid spacing={1} container item xs={12}>
```

If you need to do such, remove one of the props.

## Columns

You can change the default number of columns (12) with the `columns` prop.

{{"demo": "pages/components/grid/ColumnsGrid.js", "bg": true}}

## Limitations

### 负边距

The spacing between items is implemented with a negative margin. This might lead to unexpected behaviors. For instance, to apply a background color, you need to apply `display: flex;` to the parent.

### white-space: nowrap;

弹性布局元素的默认属性值为 `min-width：auto`。 当子元素使用 `white-space: nowrap;`时会出现布局冲突。 您可以从以下内容看到这个问题：

```jsx
<Grid item xs>
  <Typography noWrap>
```

为了使项留在容器内，您需要设置 `min-width: 0`。 In practice, you can set the `zeroMinWidth` prop:

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

The `xs`, `sm`, `md`, `lg`, and `xl` props are **not supported** within `direction="column"` and `direction="column-reverse"` containers.

They define the number of grids the component will use for a given breakpoint. They are intended to control **width** using `flex-basis` in `row` containers but they will impact height in `column` containers. If used, these props may have undesirable effects on the height of the `Grid` item elements.

## CSS 栅格布局

The `Grid` component is using CSS flexbox internally. But as seen below, you can easily use [the system](/system/grid/) and CSS Grid to layout your pages.

{{"demo": "pages/components/grid/CSSGrid.js", "bg": true}}

## System props

As a CSS utility component, the `Grid` supports all [`system`](/system/properties/) properties. You can use them as props directly on the component. For instance, a padding:

```jsx
<Grid item p={2}>
```
