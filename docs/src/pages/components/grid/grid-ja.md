---
title: Grid コンポーネント
components: Grid
---

# Grid

<p class="description">Material Designのレスポンシブレイアウトグリッドは、画面サイズと向きに適応し、レイアウト間の一貫性を保証します。</p>

[grid](https://material.io/design/layout/responsive-layout-grid.html) は、レイアウト間の視覚的な一貫性を実現しながら、さまざまなデザインでの柔軟性を可能にします。 Material DesignのレスポンシブUIは12列のグリッドレイアウトに基づいています。

## 仕組み

グリッドシステムは `Grid` コンポーネントで実装されています。

- 高い柔軟性のために [CSSのFlexible Boxモジュール](https://www.w3.org/TR/css-flexbox-1/) を使用します。
- レイアウトには* containers * と * items*の2種類あります 。
- アイテムの幅はパーセンテージで設定されているので、それらは常に親要素に対して流動的でサイズが決まっています。
- アイテムには、個々のアイテム間の間隔を空けるための余白があります。
- xs、sm、md、lg、およびxlの5つのグリッドブレークポイントがあります。

**flexboxに不慣れ**な場合、 [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) を読むことをおすすめします。

## Spacing

レスポンシブグリッドは、列幅ではなく、一貫した間隔幅に焦点を当てています。 材料設計の余白と列は **8px** の四角いベースライングリッドに従います。 Spacingプロパティは、0から10までの整数です。 デフォルトでは、2つの格子項目間の間隔が線形関数に従う： `output(spacing) = spacing * 8px`、例えば `spacing={2}`では16pxに広いギャップを作成します。

この出力変換関数は、[テーマを使う](/customization/spacing/)ことでカスタマイズできます。

{{"demo": "pages/components/grid/SpacingGrid.js", "bg": true}}

## Fluid grids

Fluid gridsでは、コンテンツの尺度とサイズを変更する列を使用します。 流体グリッドのレイアウトでは、ブレークポイントを使用して、レイアウトを大幅に変更する必要があるかどうかを判断できます。

### Basic grid

列幅はすべてのブレークポイント（つまり `xs` ）に適用されます。

{{"demo": "pages/components/grid/CenteredGrid.js", "bg": true}}

### ブレークポイント付きGrid

一部の列では複数の幅が定義されているため、定義されたブレークポイントでレイアウトが変更されます。

{{"demo": "pages/components/grid/FullWidthGrid.js", "bg": true}}

## インタラクティブ

以下は、さまざまな設定の視覚的な結果を調べることができるインタラクティブなデモです。

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideHeader": true, "bg": true}}

## 自動レイアウト

自動レイアウトにより、 *items* が使用可能なスペースを均等に共有します。 それはまた、あなたが1つの *item* 幅を設定することができ、他のものはそれの周りに自動的にサイズ変更されることを意味します。

{{"demo": "pages/components/grid/AutoGrid.js", "bg": true}}

## 複雑なグリッド

以下のデモは、Material Designには従っていませんが、グリッドを使用して複雑なレイアウトを構築する方法を示しています。

{{"demo": "pages/components/grid/ComplexGrid.js", "bg": true}}

## Nested Grid

`container`プロパティと`item`プロパティは、それぞれ独立したブール値です。 それらは組み合わせることができます。

> Flex ** container ** は、 `flex` または `inline-flex`を持つ要素によって生成されたボックスです。 フレックスコンテナのインフローの子は、flex ** items ** と呼ばれ、flexレイアウトモデルを使用してレイアウトされます。

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js", "bg": true}}

## 制限事項

### Negative margin

項目間の間隔を実装するために使用する負のマージンには1つ制限があります。 負のマージンが `<body>`を超えると水平スクロールが表示されます。 回避策は3つあります。

1. スペーシング機能を使用し、ユーザ空間でそれを実装していない ` spacing ={0}` （デフォルト）。
2. 子に適用された間隔値の少なくとも半分を使用して、親にパディングを適用します。

```jsx
  <body>
    <div style={{ padding: 20 }}>
      <Grid container spacing={5}>
        //...
      </Grid>
    </div>
  </body>
```

3. `overflow-x: hidden;`を親に追加する

### white-space: nowrap;

フレックスアイテムの初期設定は `min-width：auto`です。 子要素が`white-space: nowrap;`を使っているときに、位置のコンフリクトが起きます。 この問題は、次の場合に発生します:

```jsx
<Grid item xs>
  <Typography noWrap>
```

アイテムがコンテナ内に収まるようにするには、 `min-width：0`を設定する必要があります。 実際には、 `zeroMinWidth` プロパティを設定できます。

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

`Grid`コンポーネントは`row`, `row-reverse`, `column`, `column-reverse`のいずれかの値を持つ`direction`プロパティを持っています。 しかし、` column `および` column-reverse `コンテナではサポートされていない機能がいくつかあります。 コンポーネントは、所与のブレークポイントに使用するグリッドの数定義するプロパティ （`Xs`、 `Sm`、 `Md`、 `Lg`、及び `Xl`）幅の制御に焦点を当てている と実行 しない ` column ` および ` column-reverse` コンテナ内の高さにも同様の影響があります。 ` column ` または `column-reverse` コンテナ内で使用された場合、これらのプロパティは `Grid` 要素の幅に望ましくない影響を与える可能性があります。

## CSS Grid Layout

Material-UI自体はCSSグリッド機能自体を提供しませんが、以下に示すように、CSSグリッドを使用してページをレイアウトすることは簡単にできます。

{{"demo": "pages/components/grid/CSSGrid.js", "bg": true}}