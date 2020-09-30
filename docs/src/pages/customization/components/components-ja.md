# コンポーネントのカスタマイズ

<p class="description">Material-UIコンポーネントの外観を簡単にカスタマイズできます。</p>

コンポーネントはさまざまなコンテキストで使用できるため、これにはいくつかのアプローチがあります。 最小のユースケースから最大のユースケースまで、次をご覧ください

1. [一時的な状況の特定のバリエーション](#1-specific-variation-for-a-one-time-situation)
1. [一時的な状況の動的変化](#2-dynamic-variation-for-a-one-time-situation)
1. 異なるコンテキストで再使用される[特定のバリエーションのコンポーネント](#3-specific-variation-of-a-component)
1. [Material Design variations](#4-material-design-variations)のボタンコンポーネントなど
1. [グローバルテーマバリエーション](#5-global-theme-variation)

## 1. 一時的な状況の特定のバリエーション

次のソリューションを使用できる特定の実装のコンポーネントのスタイルを変更する必要がある場合があります。

### クラス名classNameでスタイルをオーバーライドする

コンポーネントのスタイルをオーバーライドする最初の方法は、**class names**を使用することです。 すべてのコンポーネントには、常にルート要素に適用される`className`プロパティがあります。

この例では、[`withStyles()`](/styles/basics/#higher-order-component-api)の高次(higher-order) を使用します。 コンポーネントの`classes`プロパティを使用して、カスタムスタイルをDOMに挿入し、クラス名を`ClassNames`コンポーネントに渡します。 他のスタイリングソリューション</a>、またはプレーンCSSを選択してスタイルを作成することもできますが、必ず CSSがDOMに注入されるときの[CSS注入順序](/styles/advanced/#css-injection-order)を考えてみてください。 Material-UIを使用してコンポーネントをスタイル設定すると、`<link>`が下に挿入されるため、高い特異性が得られます。 の`<head />`を使用して、コンポーネントが常に正しくレンダリングされるようにします。

{{"demo": "pages/customization/components/ClassNames.js"}}

### クラスclassesによるスタイルのオーバーライド

`className`プロパティでは不十分で、より深い要素にアクセスする必要がある場合は、`classes`オブジェクトプロパティを利用して、特定のコンポーネントに対してMaterial-UIによって注入されるすべてのCSSをカスタマイズできます。

それぞれのクラスのリスト コンポーネントについては、コンポーネントAPIページの**CSS section**および**rule name column**を参照してください。 例えば、[Button CSS API](/api/button/#css)で見ることができます。 または、[ブラウザの開発ツール](#using-the-dev-tools)を使用することもできます。

この例では、`withStyles()`も使用していますが、ここでは、`ClassesNesting`(上記参照) は`Button`の`classes` prop を使用して、 オーバーライドするクラスの**名**を適用するCSSクラス名(スタイルルール) にマップするオブジェクトを提供します(values)。 コンポーネントの既存のクラスは引き続き注入されるため、必要なのは特定のスタイルを指定することだけです。 追加またはオーバーライドします。

ボタンのスタイル設定に加えて、ボタンのラベルの大文字と小文字が変更されていることに注意してください。

{{"demo": "pages/customization/components/ClassesNesting.js"}}

### グローバルクラス名でスタイルをオーバーライドする

[このセクションに従ってください](/styles/advanced/#with-material-ui-core) 。

### 開発ツール(dev tools) を使用する

ブラウザ開発ツールを使えば、時間を大幅に節約できます。 Material-UIのクラス名は、開発モードでは[ a simple patternに従います](/styles/advanced/#class-names)。 `Mui[component name]-[style rule name]-[UUID]`。

上記のデモに戻りましょう。 ボタン・ラベルを上書きする方法は?

![dev-tools](/static/images/customization/dev-tools.png)

開発ツールを使用して、`Button`コンポーネントと`label`スタイルルールをターゲットにする必要があることがわかります。

```jsx
<Button classes={{ label: 'my-class-name' }} />
```

### ショートハンド

上記のコード例は、子コンポーネントとして**同じCSS API**を使用することで要約できます。 この例では、`withStyles()`の上位(高次) コンポーネントは、[`Button`コンポーネント](/api/button/#css)が使用する`classes`プロパティーを注入しています。

```jsx
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);
```

{{"demo": "pages/customization/components/ClassesShorthand.js"}}

### 擬似クラス

*hover*、*focus*、*disabled*、*selected*などのコンポーネントの特殊状態は、より高いCSS 特異性(specificity) が設定されています。 [特異性の重み](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)は、特定のCSS宣言に適用されます。

コンポーネントの特別な状態をオーバーライドするには、**特異性を高める必要があります** 。 *disable*状態と、 **pseudo-class**(`:disabled`)を使用したボタンコンポーネントの例を示します。

```css
.Button {
  color: black;
}
.Button:disabled { /* Increase the specificity */
  color: white;
}
```

```jsx
<Button disabled className="Button">
```

時にはこのプラットフォームではstateとして**pseudo-class**は使うことができない。 メニュー項目の構成要素と*選ばれた*例として述べる。 ネストされた要素にアクセスする以外にも、`classes`プロパティを使用して、Material-UIコンポーネントの特殊な状態をカスタマイズできます。

```css
.MenuItem {
  color: black;
}
.MenuItem.selected { /* Increase the specificity */
  color: blue;
}
```

```jsx
<MenuItem selected classes={{ root: 'MenuItem', selected: 'selected' }}>
```

#### 1つのコンポーネント状態をオーバーライドするために、特異性を高める必要があるのはなぜですか。

設計上、CSS仕様では疑似クラスを使用することで、特定性を高めています。 一貫性を保つために、Material-UIはそのカスタム擬似クラスの特異性を高めます。 これには1つの重要な利点があり、カスタマイズしたい状態を簡単に選択できます。

#### より少ない定型文を必要とする別のAPIを使用できますか?

`classes` prop APIに値を指定する代わりに、Material-UIによって生成される[the global class names](/styles/advanced/#with-material-ui-core) を使用できます。 これらすべてのカスタム擬似クラスを実装します。

| クラスキー(class key) | グローバルクラス名(global class name) |
|:---------------- |:---------------------------- |
| checked          | Mui-checked                  |
| disabled         | Mui-disabled                 |
| error            | Mui-error                    |
| focused          | Mui-focused                  |
| focusVisible     | Mui-focusVisible             |
| required         | Mui-required                 |
| expanded         | Mui-expanded                 |
| selected         | Mui-selected                 |

```css
.MenuItem {
  color: black;
}
.MenuItem.Mui-selected { /* Increase the specificity */
  color: blue;
}
```

```jsx
<MenuItem selected className="MenuItem">
```

### 同じスタイルシート内のローカルルールを参照するには、`$ruleName`を使用します

⚠️DOMを機能させるには、生成された二つのクラス名(`root`&`disabled`) を適用する必要があります。

```js
const styles = {
  root: {
    '&$disabled': {
      color: 'white',
    },
  },
  disabled: {},
};
```

コンパイル結果：

```css
.root-x.disable-x {
  color: white;
}
```

コンポーネントのスタイルをオーバーライドするもう一つの方法は、 **inline-style**アプローチを使用することです。 すべてのコンポーネントには、`style` プロパティがあります。 これらのプロパティは常にルート要素に適用されます。

```jsx
<Button
  disabled
  classes={{
    root: classes.root, // class name, e.g. `root-x`
    disabled: classes.disabled, // class name, e.g. `disabled-x`
  }}
>
```

{{"demo": "pages/customization/components/ClassesState.js"}}

### インラインスタイルでオーバーライドする

コンポーネントのスタイルをオーバーライドするもう一つの方法は、 **inline-style**アプローチを使用することです。 すべてのコンポーネントには、`style` プロパティがあります。 これらのプロパティは常にルート要素に適用されます。

インラインスタイルは通常のCSSよりも優先されるため、CSSの特異性について心配する必要はありません。

{{"demo": "pages/customization/components/InlineStyle.js"}}

[inline-styleもしくはclassesどちらを使うべきですか？](/getting-started/faq/#when-should-i-use-inline-style-vs-css)

## 2. 一時的な状況の動的変化

前のセクションでMaterial-UIコンポーネントのスタイルをオーバーライドする方法を学習しました。 では、これらのオーバーライドを動的にする方法を見てみましょう。 では、これらのオーバーライドを動的にする方法を見てみましょう。 Here are five alternatives; each has its pros and cons.

### 動的CSS

{{"demo": "pages/customization/components/DynamicCSS.js"}}

### クラス名のブランチ

{{"demo": "pages/customization/components/DynamicClassName.js"}}

### CSS変数

{{"demo": "pages/customization/components/DynamicCSSVariables.js"}}

### インラインスタイル

{{"demo": "pages/customization/components/DynamicInlineStyle.js"}}

### テーマのネスティング

{{"demo": "pages/customization/components/DynamicThemeNesting.js"}}

## 3. コンポーネントの特定のバリエーション

コンポーネントのバリエーションを作成し、製品ページのカラフルなボタンなど、さまざまなコンテキストで使用する必要があるかもしれませんが、コードは[*DRYにしておいた方がよいでしょう*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)。

Material Design仕様には、ボタンの形状が異なるなど、特定のコンポーネントのさまざまなバリエーションが記載されています。たとえば、[text](https://material.io/design/components/buttons.html#text-button)(以前の"flat")、[contained](https://material.io/design/components/buttons.html#contained-button)(以前の "raised")、[FAB](https://material.io/design/components/buttons-floating-action-button.html)などです。

{{"demo": "pages/customization/components/Component.js", "hideEditButton": true}}

## 4. Material Designのバリエーション

コンポーネント間の一貫性を促進し、ユーザーインターフェイスの外観全体を管理するために、Material-UIはグローバルな変更を適用するメカニズムを提供します。

Material-UIは、これらすべてのバリエーションを実装しようとします。 Material-UIは、これらすべてのバリエーションを実装しようとします。 サポートされているMaterial Design コンポーネントの現状については、[Supported Components](/getting-started/supported-components/)のマニュアルを参照してください。

## 5. グローバルテーマバリエーション

[テーマ設定変数を調整できます](/customization/theming/#theme-configuration-variables) 。

このセクションのデモでは、ボタンのフォントサイズを変更する方法について説明します。

### テーマ変数

`theme`の`overrides`キーを利用すると、Material-UIによってDOMに注入されるすべてのスタイルを潜在的に変更できます。 詳細については、ドキュメントの[テーマセクションをご覧ください](/customization/globals/#css)。

```jsx
const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"demo": "pages/customization/components/ThemeVariables.js"}}

### グローバルCSSのオーバーライド

CSSを使用してコンポーネントのすべてのインスタンスをカスタマイズすることもできます。 CSSを使用してコンポーネントのすべてのインスタンスをカスタマイズすることもできます。 Components expose [global class names](/styles/advanced/#with-material-ui-core) to enable this. これを可能にするために、コンポーネントは[グローバルクラス名](/styles/advanced/#with-material-ui-core)を公開します。 Bootstrapをカスタマイズする方法と非常によく似ています。

```jsx
const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiButton-root': {
      fontSize: '1rem',
    },
  },
})(() => null);

// …

<GlobalCss />
```

{{"demo": "pages/customization/components/GlobalCssOverride.js", "iframe": true, "height": 70}}

### グローバルテーマのオーバーライド

`theme`の`overrides`キーを利用すると、Material-UIによってDOMに注入されるすべてのスタイルを潜在的に変更できます。 詳細については、ドキュメントの[テーマセクションをご覧ください](/customization/globals/#css)。

```jsx
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
  },
});
```

{{"demo": "pages/customization/components/GlobalThemeOverride.js"}}

### Adding new component variants

You can take advantage of the `variants` key in the `theme`'s components section to add new variants to Material-UI components. These new variants, can specify which styles the component should have, if specific props are defined together.

The definitions are specified in an array, under the component's name. For every one of them a class is added in the head. The order is **important**, so make sure that the styles that should win will be specified lastly.

```jsx
const theme = createMuiTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed grey${blue[500]}`,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: `4px dashed ${red[500]}`,
          },
        },
      ],
    },
  },
});
```

If you are using TypeScript, you will need to specify your new variants/colors, using module augmentation.

```tsx
declare module '@material-ui/core/Button/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
```

{{"demo": "pages/customization/components/GlobalThemeVariants.js"}}
