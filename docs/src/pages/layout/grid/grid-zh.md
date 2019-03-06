---
title: React 栅格(Grid)组件
components: 栅格(Grid)
---
# 栅格(Grid)

<p class="description">Material Design 响应式布局的栅格可适应屏幕大小和方向，确保布局之间的一致性。</p>

[Grid](https://material.io/design/layout/responsive-layout-grid.html): 栅格(Grid)组件能确保不同布局间的视觉一致性，同时在众多不同设计中保持灵活性。 Material Design 的响应式 UI 是基于12列的栅格布局。

## 它是如何工作的

栅格系统使用 `Grid` 组件实现：

- 为了达到高度的灵活性，它运用了用 [CSS 的 Flexible Box 模块](https://www.w3.org/TR/css-flexbox-1/) 。
- 它有两种类型的布局： *containers* ， *items*。
- 项目宽度以百分比设置，因此它们总是相对于其父元素是流动的和大小的。
- 项目具有填充以创建单个项目之间的间距。
- 有五个网格断点：xs，sm，md，lg和xl。

## 间距

响应式栅格侧重于一致的间距宽度，而不是列宽。 Material design 外边距和列遵循** 8dp **方形基线栅格。 spacing属性是0到10之间的整数，包括0和10。 默认情况下，两个网格项之间的间距遵循线性函数： `output(spacing) = spacing * 8px`，例如 `spacing = {2}` 创建16px宽间距。

该输出变换函数可定制 [使用中的主题](/customization/themes/#spacing)。

{{"demo": "pages/layout/grid/SpacingGrid.js"}}

## 流体栅格

流体栅格使用可缩放和调整内容大小的列。 流体栅格布局可以使用断点来确定布局是否需要显着更改。

### 基本栅格

列宽适用于所有断点（即` xs `及以上）。

{{"demo": "pages/layout/grid/CenteredGrid.js"}}

### 有断点的栅格

一些列定义有多种宽度，定义断点之后布局会根据不同宽度改变。

{{"demo": "pages/layout/grid/FullWidthGrid.js"}}

## 交互式

下面是一个交互式演示，可让您探索不同设置的可视结果：

{{"demo": "pages/layout/grid/InteractiveGrid.js"}}

## 自动布局

自动布局使每个*item*公平地共享可用空间。这也意味着您可以设置一个*item*，其他元素将自动调整其大小。

{{"demo": "pages/layout/grid/AutoGrid.js"}}

## 复杂栅格

以下演示不遵循Material Design规范，但说明了如何使用栅格构建复杂的布局。

{{"demo": "pages/layout/grid/ComplexGrid.js"}}

## CSS栅格布局

** CSS栅格布局**擅长将页面划分为主要区域，或者在从HTML基元构建的控件的各个部分之间定义大小，位置和图层之间的关系。

⚠️遗憾的是，CSS网格仅受最新浏览器的支持。

{{"demo": "pages/layout/grid/CSSGrid.js"}}

## 嵌套栅格

`container`和` item `属性是两个独立的布尔值，它们可以结合使用。

> flex **容器** 是由具有 `flex` 或 `inline-flex`的计算显示的元素生成的框。 Flex容器的流入子容器称为flex **items** 并使用flex布局模型进行布局。

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/layout/grid/NestedGrid.js"}}

## 局限性

### 负边距

我们使用负边距来实现项目之间的间距有一个缺点。 如果负边距超出`<body>`元素，则会出现水平滚动。 有三种解决方法：1. 不使用spacing特性并且设置成默认的`spacing={0}` 2。 将填充应用于父级元素，并且至少将一半的间距值应用于子级元素：

```jsx
  <body>
    <div style={{ padding: 20 }}>
      <Grid container spacing={5}>
        //...
      </Grid>
    </div>
  </body>
```

1. 在父元素上设置`overflow-x: hidden;`

### 白色空间：nowrap;

Flex 项目的初始设置为 `min-width: auto`。当子级使用 `white-space: nowrap;`时会导致冲突。 您可能遇到以下问题:

```jsx
<Grid item xs>
  <Typography noWrap>
```

为了使项目保持在容器内, 您需要设置 `min-width: 0`。在实践中, 您可以设置 `zeroMinWidth` 属性:

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/layout/grid/AutoGridNoWrap.js"}}

### direction: column | column-reverse

Though the `Grid` component has a `direction` property that allows values of `row`, `row-reverse`, `column`, and `column-reverse`, there are some features that are not supported within `column` and `column-reverse` containers. The properties which define the number of grids the component will use for a given breakpoint (`xs`, `sm`, `md`, `lg`, and `xl`) are focused on controlling width and do **not** have similar effects on height within `column` and `column-reverse` containers. If used within `column` or `column-reverse` containers, these properties may have undesirable effects on the width of the `Grid` elements.