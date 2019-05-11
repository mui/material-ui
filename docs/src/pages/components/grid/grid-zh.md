---
title: React Grid（栅格）组件
components: Grid
---

# Grid（栅格)

<p class="description">Material Design 响应式布局的栅格可适应屏幕大小和方向，确保布局之间的一致性。</p>

[Grid](https://material.io/design/layout/responsive-layout-grid.html): 栅格(Grid)组件能确保不同布局间的视觉一致性，同时在众多不同设计中保持灵活性。 Material Design 的响应式 UI 是基于12列的栅格布局。

## 它是如何工作的

栅格系统使用 `Grid` 组件实现：

- 为了达到高度的灵活性，它运用了用 [CSS 的 Flexible Box 模块](https://www.w3.org/TR/css-flexbox-1/) 。
- 它有两种类型的布局： *containers* ， *items*。
- 项目宽度以百分比设置，因此它们总是相对于其父元素是流动的和变换大小的。
- 子项自带 padding 来和其他元素之间产生间距。
- 有五个网格断点：xs，sm，md，lg 和 xl。

如果你**对 flexbox 不熟悉**，我们建议你阅读：[CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 手册。

## Spacing（间距）

响应式栅格侧重于一致的间距宽度，而不是列宽。 Material design 外边距和列遵循** 8px **的方块形基线栅格。 spacing 属性设置为一个在0和10之间的整数，且并包括0和10。 默认情况下，两个网格项之间的间距遵循这样的线性函数： `output(spacing) = spacing * 8px`，例如 `spacing={2}` 会创建一个 16px 的宽间距。

通过[使用主题](/customization/spacing/)，该变换函数的输出是可定制的。

{{"demo": "pages/components/grid/SpacingGrid.js"}}

## Fluid grids（流式格网）

流式格网使用了可缩放和调整内容大小的列。 使用 breakpoints（断点)，您可以来确定流式格网的布局是否需要大量的更改。

### 基本栅格

列宽适用于所有断点（即 `xs</code 及大于其的值）。</p>

<p>{{"demo": "pages/components/grid/CenteredGrid.js"}}</p>

<h3>有断点的栅格</h3>

<p>一些列会定义多种宽度，这会导致布局会根据定义的端点来改变其宽度。</p>

<p>{{"demo": "pages/components/grid/FullWidthGrid.js"}}</p>

<h2>交互式</h2>

<p>下面是一个交互式的演示，您可让探索不同设置下的视觉结果：</p>

<p>{{"demo": "pages/components/grid/InteractiveGrid.js", "hideHeader": true}}</p>

<h2>自动布局</h2>

<p>自动布局使每个 <em>item</em> 公平地共享可用空间。这也意味着您可以设置一个<em>item</em>的宽度，而其他元素将自动调整其大小。</p>

<p>{{"demo": "pages/components/grid/AutoGrid.js"}}</p>

<h2>复杂的栅格</h2>

<p>以下演示不遵循 Material Design 规范，但说明了如何使用栅格构建复杂的布局。</p>

<p>{{"demo": "pages/components/grid/ComplexGrid.js"}}</p>

<h2>嵌套栅格</h2>

<p><code>container` 和 `item` 属性是两个独立的 booleans（布尔值），而它们可以结合使用。

> 一个 flex **容器** 是通过将 `flex` 或 `inline-flex`的计算显示赋予给一个元素而生成的。 Flex 容器的流入子容器称为 flex **items**， 它们使用 flex 布局模型进行布局。

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js"}}

## 局限性

### 负边距

当我们使用负边距来实现项目之间的间距的时候，会有一个限制。 如果负边距超出`<body>`元素，则会出现水平滚动。 有以下三种解决方法： 1。 不使用 spacing 的特性并且设置成默认的`spacing={0}` 2。 将填充应用于父级元素，并且将至少一半的间距值赋予子级元素：

```jsx
  <body>
    <div style={{ padding: 20 }}>
      <Grid container spacing={5}>
        //...
      </Grid>
    </div>
  </body>
```

1. 3。将父元素设置为 `overflow-x: hidden;`。

### white-space: nowrap;

Flex 项目的初始设置为 `min-width: auto`。当子级使用 `white-space: nowrap;` 时会导致冲突。 您可能遇到以下问题:

```jsx
<Grid item xs>
  <Typography noWrap>
```

为了使项目保持在容器内，您需要设置 `min-width: 0`。在实际操作中, 您可以设置 `zeroMinWidth` 属性:

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js"}}

### direction: column | column-reverse

虽然 `Grid` 组件有 `direction` 属性，所以组件能用这些的值：`row`，`row-reverse`，`column`，和`column-reverse`，但是有些功能是不被 `column` 和`column-reverse` 容器支持的。 一些定义了组件栅格数量的属性会用于一个特定的断点：（ `xs`，`sm`，`md`，`lg` 以及 `xl`) ， 而这这些属性主要来控制宽度，并且**不会**再 `column` 和 `column-reverse` 内产生对高度相同的效果。 如过在 `column` 或者 `column-reverse` 容器内使用这些属性,，将会对 `Grid` 元素产生意想不到的效果。

## CSS 栅格布局

Material-UI 本身不提供任何 CSS Grid 功能，但如下所示，您可以轻松使用 CSS Grid 来布局您的页面。

{{"demo": "pages/components/grid/CSSGrid.js"}}