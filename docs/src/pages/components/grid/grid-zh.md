---
title: React 栅格组件
components: Grid
githubLabel:
  component: Grid
materialDesign: https://material.io/design/layout/understanding-layout.html
---

# Grid

<p class="description">Material Design 响应式布局的栅格可适应屏幕大小和方向，确保布局之间的一致性。</p>

[Grid 栅格组件](https://material.io/design/layout/responsive-layout-grid.html)能确保不同布局间的视觉层面的舒适感，同时在众多不同设计中保持灵活性。 Material Design 的响应式 UI 是基于12列的栅格系统。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 它是如何工作的的呢

栅格系统使用 `Grid` “盒子”组件实现：

- 为了达到高度的灵活性，盒子组件运用了用 [CSS 的 Flexible Box 模块](https://www.w3.org/TR/css-flexbox-1/) 。
- 它有两种类型的布局： *containers* ， *items*。
- 而项目宽度以百分比设置，因此相对于其父元素，它们总是流动的和变换大小的。
- 子元素则自带 padding 来和其他元素间隔。
- 你可以找到五个网格断点：xs，sm，md，lg 和 xl。
- 你可以为每个断点提供整数值，表示当视口宽度满足 [断点约束](/customization/breakpoints/#default-breakpoints) 时，12 个可用列中有多少列被组件占用。

若你对 **flexbox 不太熟悉**，我们建议你阅读 [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 手册。

## Spacing（间距）

响应式栅格侧重于的一致的水平间距，而不是列宽。 Material design 外边距（margins）和列（col）都遵循 **8px** 的方块形基线栅格。 你可以将 `spacing` 的属性值设置为一个在 0 到 10 之间的整数 默认情况下，两个网格项之间的间距遵循这样的线性函数： `output(spacing) = spacing * 8px`，例如 `spacing={2}` 会创建一个 16px 的宽间距。

通过[使用主题](/customization/spacing/)，该变换函数的输出是可定制的。

{{"demo": "pages/components/grid/SpacingGrid.js", "bg": true}}

## Fluid grids 流式网格

流式网格可以通过列（column）来缩放和调整内容的大小。 而其布局则可以通过使用断点（breakpoints）来决定布局是否需要明显的变化。

### 基本栅格

每一列的宽度是 1 到 12 之间的整数值；它们适用于任何断点，并且表明了组件占用多少列。

你可以给定一个断点值来应用于比它更宽的所有其他断点（除非被覆盖，你可以在本页的后面部分阅读被覆盖后的行为）。 例如，无论组件的大小如何，`xs={12}` 都会占据整个视口的宽度。

{{"demo": "pages/components/grid/CenteredGrid.js", "bg": true}}

### 有断点的栅格

一些列（columns）会定义多种宽度，这会导致布局会根据事先定义的断点（breakpoint）来改变其宽度。 你可以给较大断点指定宽度值。那么它会覆盖给较小断点指定的宽度值。

例如，`xs={12} sm={6}` 表示当视口宽度为 [600 或更多像素](/customization/breakpoints/#default-breakpoints) 时，将组件的大小调整为占据视口宽度的一半（6列）。 对于较小的视口，该组件将填充所有 12 个可用的列。

{{"demo": "pages/components/grid/FullWidthGrid.js", "bg": true}}

## 交互式

下面是一个交互式的演示，你也可以探索不同设置下的视觉结果：

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## 自适应布局

自适应布局让 *项（items ）* 平均地使用空间。 这也意味着你可以显式设置一个 *项* 的宽度，而使其他项的大小自动进行调整。

{{"demo": "pages/components/grid/AutoGrid.js", "bg": true}}

## 复杂的栅格

以下的演示不遵循 Material Design 规范，但说明了如何使用栅格构建复杂的布局。

{{"demo": "pages/components/grid/ComplexGrid.js", "bg": true}}

## 嵌套栅格

`容器（container）`和`项（item）`属性分别是两个独立的布尔值。 它们可以组合起来使用。

> 通过将计算过的将 `flex` 或 `inline-flex` 的显示赋予给一个元素，你可以生成一个 flex 的**容器（container ）** 。 Flex 容器（container）的流入子容器称为 flex ** 项（items**， 它们的布局基于 flex 布局模型。

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js", "bg": true}}

## 局限性

### 负边距

当我们使用负边距来实现项目之间的间距的时候，会有一个限制。 如果负边距超出`<body>`元素，则会出现水平滚动。 我们提供了有3种可用的解决方案供以参考：

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

3. 将父元素设置为 `overflow-x: hidden;`。

### white-space: nowrap;

我们规定了 flex 元素的默认属性值为 `min-width：auto`。 当子元素使用 `white-space: nowrap;`时，则会出现位置的冲突。 以下的案例直观的反应了这个问题：

```jsx
<Grid item xs>
  <Typography noWrap>
```

若想让子项继续在容器内展示，您需要设置 `min-width: 0`。 若想让子项继续在容器内展示，您需要设置 `min-width: 0`。

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
