# タイポグラフィ

<p class="description">このテーマには、一緒に使用できるタイプサイズのセットと、レイアウトグリッドがあります。</p>

## フォントファミリー

You can change the font family with the `theme.typography.fontFamily` property.

For instance, this demo uses the system font instead of the default Roboto font:

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

### Self-hosted fonts

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

Next, you need to change the theme to use this new font. In order to globally define Raleway as a font face, the [`CssBaseline`](/components/css-baseline/) component can be used (or any other CSS solution of your choice).

```js
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
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

Material-UIでは、フォントサイズに`rem`単位を使用します。 The browser `<html>` element default font size is `16px`, but browsers have an option to change this value, so `rem` units allow us to accommodate the user's settings, resulting in a better accessibility support. ユーザーは、視力の低下から最適な設定の選択まで、さまざまな理由でフォントサイズの設定を変更できます。サイズや表示距離が大幅に異なるデバイスにも対応できます。

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

### HTMLフォントサイズ

`<html>`要素のデフォルトのフォントサイズを変更することもできます。 たとえば、[ 10pxの単純化を使用する場合](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/) 。 An `htmlFontSize` theme property is provided for this use case, which tells Material-UI what the font-size on the `<html>` element is. This is used to adjust the `rem` value so the calculated font-size always match the specification.

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

### レスポンシブフォントサイズ

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

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```

{{"demo": "pages/customization/typography/ResponsiveFontSizes.js"}}

### 滑らかなフォントサイズ

完了予定：[＃15251 ](https://github.com/mui-org/material-ui/issues/15251) 。

## バリアント

The typography object comes with [13 variants](/components/typography/#component) by default:

- h1
- h2
- h3
- h4
- h5
- h6
- subtitle1
- サブタイトル2
- body1
- body2
- ボタン
- キャプション
- オーバーライン

これらのバリアントは各々個別にカスタマイズ可能です。

```js
const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});
```

{{"demo": "pages/customization/typography/TypographyVariants.js"}}

## デフォルト値

You can explore the default values of the typography using [the theme explorer](/customization/default-theme/?expand-path=$.typography) or by opening the dev tools console on this page (`window.theme.typography`).