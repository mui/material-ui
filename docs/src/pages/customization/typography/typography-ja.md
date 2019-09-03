# タイポグラフィ

<p class="description">このテーマには、一緒に使用できるタイプサイズのセットと、レイアウトグリッドがあります。</p>

次の例に、テーマの体裁の[default values](/customization/default-theme/?expend-path=$.typography)を変更する方法を示します。 [Typography component](/components/typography/)の使用方法については、専用ページを参照してください。

{{"demo": "pages/customization/typography/TypographyTheme.js"}}

## フォントファミリー

デフォルトのRobotoフォントの代わりにシステムフォントを使用できます。

```js
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
```

## セルフホストフォント

セルフホストフォントを作成するには、`ttf`、`woff`、または`woff2`形式のフォントファイルをダウンロードし、コードに読み込みます。

⚠️これには、ビルドプロセスに`ttf`、` woff ` 、および ` woff2 `の読み込みを処理できるプラグインまたはローダーが必要です。 フォントはバンドルに*埋め込まれません*。 それらは、 CDNの代わりにWebサーバーからロードされます。

```js
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';

const raleway = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${RalewayWoff2}) format('woff2')
  `,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};
```

次に、この新しいフォントを使用するようにテーマを変更できます。 Ralewayをフォントフェースとしてグローバルに定義するには、[`CssBaseline`](/components/css-baseline/)コンポーネントを使用する必要があります。

```js
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Raleway',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [raleway],
      },
    },
  },
});
```

## フォントサイズ

Material-UIでは、フォントサイズに`rem`単位を使用します。 ブラウザ`<html>`要素のデフォルトのフォントサイズは`16px`ですが、ブラウザにはこの値を変更するオプションがあります。 そのため、`rem`ユニットを使用することで、ユーザの設定に対応し、より優れたユーザエクスペリエンスを実現できます。 ユーザーは、視力の低下から最適な設定の選択まで、さまざまな理由でフォントサイズの設定を変更できます。サイズや表示距離が大幅に異なるデバイスにも対応できます。

Material-UIのフォントサイズを変更するには、` fontSize `プロパティを。 デフォルト値は` 14pxです` 。

```js
const theme = createMuiTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
});
```

ブラウザで計算されるフォントサイズは、次の数式に従います。

![フォント サイズ](/static/images/font-size.gif) <!-- https://latex.codecogs.com/gif.latex?computed&space;=&space;specification&space;\frac{typography.fontSize}{14}&space;\frac{html&space;font&space;size}{typography.htmlFontSize} -->

## HTMLフォントサイズ

`<html>`要素のデフォルトのフォントサイズを変更することもできます。 たとえば、[ 10pxの単純化を使用する場合](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/) 。 この使用例には、`htmlFontSize`テーマのプロパティが用意されています。 Material-UIに、`<html>`要素のfont-sizeが何であるかを伝えています。 これは`rem`値を調整するために使用され、計算されたfont-sizeが常に指定と一致するようにします。

```js
const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});
```

```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

*以下のデモを正しく表示するには、このページのhtml要素に上記のCSSを適用する必要があります*

{{"demo": "pages/customization/typography/FontSizeTheme.js"}}

## レスポンシブフォントサイズ

Typographyバリアント型プロパティは、生成されたCSSに直接マップされます。 [media queries](/customization/breakpoints/#api) を使用できます：

```js
const theme = createMuiTheme();

theme.typography.h1 = {
  fontSize: '3rem',
  '@media (min-width:600px)': {
    fontSize: '4.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '6rem',
  },
};
```

この設定を自動化するには、[`responsiveFontSizes()`](/customization/theming/#responsivefontsizes-theme-options-theme)ヘルパーを使用して、テーマのタイポグラフィフォントサイズを応答可能にします。

{{"demo": "pages/customization/typography/ResponsiveFontSizesChart.js", "hideHeader": true}}

以下の例で実際にこれを見ることができます。 ブラウザのウィンドウサイズを調整し、幅が異なる[ブレークポイント](/customization/breakpoints/)を横切るときにフォントサイズがどのように変化するかを確認します。

{{"demo": "pages/customization/typography/ResponsiveFontSizes.js"}}

## 滑らかなフォントサイズ

完了予定：[＃15251 ](https://github.com/mui-org/material-ui/issues/15251) 。