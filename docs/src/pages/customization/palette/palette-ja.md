# パレット

<p class="description">パレットを使用すると、ブランドに合わせてコンポーネントの色を変更できます。</p>

## Intentions

A color intention とは、パレットをアプリケーション内の特定の意図にマッピングすることです。 このテーマは、次の色の目的を明らかにします。

- primary-ユーザのプライマリインタフェース要素を表すために使用します。
- secondary - ユーザーの二次インタフェース要素を表します。
- error-ユーザが認識すべきインタフェース要素を表すために使用されます。
- warning - used to represent potentially dangerous actions or important messages.
- info - used to present information to the user that is neutral and not necessarily important.
- success - used to indicate the successful completion of an action that user triggered.

既定のパレットでは、副次的な意図を表すために、先頭に`A`(`A200`など。) が付いたシェーディングが使用されます。 他の目的のために省略されたシェードがあります。

色の詳細については、[色セクション](/customization/color/)をご覧ください。

{{"demo": "pages/customization/palette/Intentions.js", "bg": "inline"}}

### カスタマイズ

テーマの一部として palette オブジェクトを含めると、パレットの既定値を変更できます。

If any of the [`palette.primary`](/customization/default-theme/?expand-path=$.palette.primary), [`palette.secondary`](/customization/default-theme/?expand-path=$.palette.secondary), [`palette.error`](/customization/default-theme/?expand-path=$.palette.error), [`palette.warning`](/customization/default-theme/?expand-path=$.palette.warning), [`palette.info`](/customization/default-theme/?expand-path=$.palette.info) or [`palette.successs`](/customization/default-theme/?expand-path=$.palette.successs) 'intention' objects are provided, they will replace the defaults.

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
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});
```

As in the example above, if the intention object contains custom colors using any of the "main", "light", "dark" or "contrastText" keys, these map as follows:

- If the "dark" and / or "light" keys are omitted, their value(s) will be calculated from "main", according to the "tonalOffset" value.
- If "contrastText" is omitted, its value will be calculated to contrast with "main", according to the"contrastThreshold" value.

Both the "tonalOffset" and "contrastThreshold" values may be customized as needed. A higher value for "tonalOffset" will make calculated values for "light" lighter, and "dark" darker. A higher value for "contrastThreshold" increases the point at which a background color is considered light, and given a dark "contrastText".

Note that "contrastThreshold" follows a non-linear curve.

### 例

{{"demo": "pages/customization/palette/Palette.js"}}

## カラーツール

インスピレーションが必要ですか？ Material Designチームは、あなたを助ける素晴らしい[パレット設定ツール](/customization/color/#color-tool)を構築しました。

## Dark mode

Material-UI comes with two palette types, light (the default) and dark. You can make the theme dark by setting `type: 'dark'`. While it's only a single property value change, internally it modifies several palette values.

```js
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
```

{{"demo": "pages/customization/palette/DarkTheme.js", "bg": "inline", "defaultCodeOpen": false}}

### User preference

Users might have specified a preference for a light or dark theme. The method by which the user expresses their preference can vary. It might be a system-wide setting exposed by the Operating System, or a setting controlled by the User Agent.

You can leverage this preference dynamically with the [useMediaQuery](/components/use-media-query/) hook and the [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query.

For instance, you can enable the dark mode automatically:

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/core/styles';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
```

## デフォルト値

You can explore the default values of the palette using [the theme explorer](/customization/default-theme/?expand-path=$.palette) or by opening the dev tools console on this page (`window.theme.palette`).