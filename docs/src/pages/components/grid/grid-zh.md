---
title: React Grid（栅格）组件
components: Grid
---

# Grid 栅格

<p class="description">Material Design 响应式布局的栅格可适应屏幕大小和方向，确保布局在不同尺寸之间的一致性。</p>

[栅格](https://material.io/design/layout/responsive-layout-grid.html) 既能够确保在不同布局下的一致性，同时也能够在众多不同设计中保持其灵活性。 Material Design 的响应式 UI 是基于 12 列的栅格布局。

> ⚠️ `栅格` 组件不要与承载大量数据的表格（data grid）进行混淆；这个组件更倾向于在布局中使用。 如果需使用承载大量数据的表格，请看这里的 [ `数据表格` 组件](/components/data-grid/)。

## 工作原理

栅格系统是通过 `Grid` 组件实现的：

- 为了高度的灵活性，组件使用了 [CSS 的 Flexible Box 模块](https://www.w3.org/TR/css-flexbox-1/) 。
- 它有两种类型的布局： *containers* ， *items*。
- 而项目宽度以百分比设置，因此相对于其父元素，它们总是流动的和变换大小的。
- 子项目（items）使用内边距来保持和其他块（items）的间距。
- 其中五个断点可供使用：xs，sm，md，lg 和 xl。

若你**对 flexbox 不太熟悉**，我们建议你阅读 [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 手册。

## Spacing 间距

响应式栅格布局追求块与块之间统一的间距，而非块本身的宽度。 Material design 外边距（margins）和列（col）都遵循** 8px **的方块形基线栅格。 你可以将间距（spacing）的属性值设置为一个在0和10之间的整数，且并包括0和10。 默认情况下，两个网格项之间的间距遵循这样的线性函数： `output(spacing) = spacing * 8px`，例如 `spacing={2}` 会创建一个 16px 的宽间距。

通过[使用主题](/customization/spacing/)，该变换函数的输出是可定制的。

{{"demo": "pages/components/grid/SpacingGrid.js", "bg": true}}

## Fluid grids 流式网格

流式网格可以通过列（column）来缩放和调整内容的大小。 而其布局则可以通过使用断点（breakpoints）来决定布局是否需要进行较大的调整。

### 基本栅格

列宽（column widths）适用于所有的断点（例如，`xs` 及大于其的值）。

{{"demo": "pages/components/grid/CenteredGrid.js", "bg": true}}

### 有断点的栅格

一些列（columns）会定义多种宽度，这会导致布局会根据事先定义的断点（breakpoint）来改变其宽度。

{{"demo": "pages/components/grid/FullWidthGrid.js", "bg": true}}

## 交互式

下面是一个交互式的演示，你也可以探索不同设置下的视觉结果：

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## 自适应布局

自适应布局可以让 *子项（items）* 之间平均地利用空间。 这也意味着你可以显式设置一个 *子项（item）* 的宽度，而使其他项的大小根据其宽度自动进行调整。

{{"demo": "pages/components/grid/AutoGrid.js", "bg": true}}

## 复杂的栅格

以下的演示不遵循 Material Design 规范，但说明了如何使用栅格构建复杂的布局。

{{"demo": "pages/components/grid/ComplexGrid.js", "bg": true}}

## 嵌套栅格

`容器（container）` 和 `子项（item）` 是栅格两个独立的属性。 它们可以组合起来使用。

> 通过将计算过的 `flex` 或 `inline-flex` 的显示赋予给一个元素，你可以生成一个 flex 的 **容器（container ）** 。 Flex 容器（container）的流入子容器称为 flex ** 项（items**， 它们的布局基于 flex 布局模型。

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js", "bg": true}}

## 设计局限

### 负边距

当我们使用负边距来实现项目之间的间距的时候，会有一个限制。 如果负边距超出`<body>`元素，则会出现水平滚动。 我们提供了 3 种解决方案：

1. 不使用 spacing 的特性，并且在用户层面设置成`spacing={0}`。
2. 将间距（padding）应用于父级元素，并且将至少一半的间距值赋予子级元素：

```jsx
  <body>
    <div style={{ padding: 20 }}>
      <Grid container spacing={5}>
        //...
      </Grid>
    </div>
  </body>
```

3. 在父元素上添加 `overflow-x: hidden;`。

### white-space: nowrap;

我们规定了 flex 元素的默认属性值为 `min-width：auto`。 当子元素使用 `white-space: nowrap;`时，则会出现位置的冲突。 以下的案例直观的反应了这个问题：

```jsx
<Grid item xs>
  <Typography noWrap>
```

若想让子项继续在容器内展示，您需要设置 `min-width: 0`。 事实上，您也可以通过设置 `zeroMinWidth` 属性来解决这个问题：

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

虽然 `Grid` 组件有 `direction` 属性，所以组件能用这些的值：`row`，`row-reverse`，`column`，和`column-reverse`，但是有些功能是不被 `column` 和`column-reverse` 容器支持的。 一些定义了组件栅格数量的属性会用于一个特定的断点：（ `xs`，`sm`，`md`，`lg` 以及 `xl`)，而这这些属性主要来控制宽度，并且**不会**再 `column` 和 `column-reverse` 内产生对高度相同的效果。 如过在 `column` 或者 `column-reverse` 容器内使用这些属性,，将会对 `Grid` 元素产生意想不到的效果。

## CSS 栅格布局

Material-UI 本身不提供任何 CSS Grid 功能，但如下所示，您可以轻松使用 CSS Grid 来布局您的页面。

{{"demo": "pages/components/grid/CSSGrid.js", "bg": true}}