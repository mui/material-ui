# パレット

<p class="description">パレットを使用すると、ブランドに合わせてコンポーネントの色を変更できます。</p>

## Intentions

A color intention とは、パレットをアプリケーション内の特定の意図にマッピングすることです。

このテーマは、次の色の目的を明らかにします。

- primary-ユーザのプライマリインタフェース要素を表すために使用します。
- secondary - ユーザーの二次インタフェース要素を表します。
- error-ユーザが認識すべきインタフェース要素を表すために使用されます。

既定のパレットでは、副次的な意図を表すために、先頭に`A`(`A200`など。) が付いたシェーディングが使用されます。 他の目的のために省略されたシェードがあります。

色の詳細については、[色セクション](/customization/color/)をご覧ください。

## カスタムパレット

テーマの一部として `palette` オブジェクトを含めると、パレットの既定値を変更できます。

[` palette.primary`](/customization/default-theme/?expend-path=$.palette.primary) のいずれか、 [` palette.secondary `](/customization/default-theme/?expend-path=$.palette.secondary)または [` palette.error `](/customization/default-theme/?expend-path=$.palette.error) 'intention'オブジェクトが指定されている場合は、デフォルト値が置き換えられます。

Intention値は、 [color](/customization/color/)オブジェクト、または次のTypeScriptインターフェイスで指定されたキーを持つオブジェクトのいずれかです。

```ts
interface PaletteIntention {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
};
```

**カラーオブジェクトを使用する**

意図をカスタマイズする最も簡単な方法は、提供されている1つまたは複数のカラーをインポートすることです。 次のようにパレット意図に適用します。

```js
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
```

上記の例のようにインテンションキーがカラーオブジェクトを受け取った場合、 は次のマッピングを使用して必要なキーを設定します。

```js
palette: {
  primary: {
    light: palette.primary[300],
    main: palette.primary[500],
    dark: palette.primary[700],
    contrastText: getContrastText(palette.primary[500]),
  },
  secondary: {
    light: palette.secondary.A200,
    main: palette.secondary.A400,
    dark: palette.secondary.A700,
    contrastText: getContrastText(palette.secondary.A400),
  },
  error: {
    light: palette.error[300],
    main: palette.error[500],
    dark: palette.error[700],
    contrastText: getContrastText(palette.error[500]),
  },
},
```

この例は、デフォルトのパレット値を再作成する方法を示しています。

```js
import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

// All the following keys are optional, as default values are provided.
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});
```

**色を直接提供する**

よりカスタマイズされた色を提供する場合は、独自の色オブジェクト 作成するか、意図のキーの一部またはすべてに直接色を指定できます。

```js
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});
```

上記の例のように、intentionオブジェクトに `main`、`light`、`dark`または`contrastText`キーは、次のようにマップされます。

- `dark`キーまたは`light`キーを省略すると、その値は`main`から計算されます。 `tonalOffset`値の従います。

- `contrastText`を省略すると、その値は`main`と対比するように計算されます。 これは、`contrastThreshold`の値によって決まります。

`tonalOffset`値と`contrastThreshold`値は、必要に応じてカスタマイズできます。 `tonalOffset`の値を大きくすると、`light`の計算値は明るくなり、`dark`は暗くなります。v `contrastThresholdの高い値`は、バックグラウンドカラーが明るいとみなされるポイントを増やし、暗い`contrastText`が指定されます。

` contrastThreshold `非線形曲線に従います。

## 例

{{"demo": "pages/customization/palette/Palette.js"}}

## カラーツール

インスピレーションが必要ですか？ Material Designチームは、あなたを助ける素晴らしい[パレット設定ツール](/customization/color/#color-tool)を構築しました。

## Type (light /dark theme)

Material-UIには、light（デフォルト）と dark の2つのテーマがあります。

` type`を`dark`に設定して、テーマを暗くすることができます 。 プロパティ値の変更は1つだけですが、内部的には次のキーの値を変更します。

- `palette.text`
- `palette.divider`
- `palette.background`
- `palette.action`

```js
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
```

{{"demo": "pages/customization/palette/DarkTheme.js"}}

## Default values

You can explore the default values of the palette using [the theme explorer](/customization/default-theme/?expend-path=$.palette) or by opening the dev tools console on this page (`window.theme.palette`).