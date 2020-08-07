# テーマ

<p class="description">あなたが作成したテーマでMaterial-UIをカスタマイズしてください。 色や文字のスタイルなどを変更できます。</p>

テーマはコンポーネントの色、表面の暗さ、影のレベル、インク要素の透明度等を指定します。

テーマを使用することで、アプリに一貫したトーンを適用できます。あなたのビジネスやブランドのニーズに合うようにデザインをカスタマイズすることができます。

アプリ間で一貫性を高めるために、ライトテーマとダークテーマを選択できます。 デフォルトでは、ライトテーマを使用する仕様になっています。

## テーマプロバイダー

`ThemeProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to pass the theme down to the components, so you need to make sure that `ThemeProvider` is a parent of the components you are trying to customize. 詳細については、[ APIセクション](/styles/api/#themeprovider) をご覧ください。

詳細については、[ APIセクション](/styles/api/#themeprovider) をご覧ください。 `ThemeProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to pass the theme down to the components, so you need to make sure that `ThemeProvider` is a parent of the components you are trying to customize.

## テーマ構成変数(Theme configuration variables)

テーマの構成変数を変更することは、Material-UIをニーズに合わせる最も効果的な方法です。 以下のセクションでは、最も重要なテーマ変数について説明します。 以下のセクションでは、最も重要なテーマ変数について説明します。

- [パレット](/customization/palette/)
- [タイポグラフィ](/customization/typography/)
- [間隔](/customization/spacing/)
- [ブレークポイント](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [グローバル](/customization/globals/)

[既定のテーマセクション](/customization/default-theme/)をチェックアウトすると、既定のテーマをすべて表示できます。

### カスタム変数

When using Material-UI's theme with the [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider), it can be convenient to add additional variables to the theme so you can use them everywhere. 例えば：

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## コンポーネント内のテーマへのアクセス

Reactコンポーネント内のテーマ変数に[アクセスできます](/styles/advanced/#accessing-the-theme-in-a-component) 。

## テーマのネスト

複数のテーマプロバイダーを[ネストできます](/styles/advanced/#theme-nesting)。

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

内部テーマは外側のテーマを**オーバーライドします**。 関数を提供することにより、外側のテーマを拡張できます。 内部テーマは外側のテーマを**オーバーライドします**。 関数を提供することにより、外側のテーマを拡張できます。

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### パフォーマンスに関する注意

Otherwise you'll encounter `Error: Function component cannot be given refs`. See also: [Composition: Caveat with refs](/guides/composition/#caveat-with-refs).

- `theme`: レンダリングのたびに新しいテーマを指定すると、新しいCSSオブジェクトが計算されて注入されます。 UIの一貫性とパフォーマンスの両方のために、限られた数のテーマオブジェクトをレンダリングすることをお勧めします。 UIの一貫性とパフォーマンスの両方のために、限られた数のテーマオブジェクトをレンダリングすることをお勧めします。
- `styles` ：スタイルオブジェクトが大きいほど、より多くの作業が必要になります。

## API

### `createMuiTheme(options, ...args) => theme`

受け取ったオプションに基づいてテーマを生成します。

#### 引数

1. `options` (*Object*): 不完全なテーマオブジェクトを取得し、不足している部分を追加します。
2. `...args` (*Array*): Deep merge the arguments with the about to be returned theme.

#### 戻り値

`theme` (*Object*): すぐに使用できる完全なテーマオブジェクト。

#### 例

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

受け取ったオプションに基づいて、 レスポンシブなtypographyを生成します。

#### 引数

1. `theme` (*Object*): 強化するテーマオブジェクト。
2. `オプション` (*オプジェクト* [任意]):

- Array of [breakpoints](/customization/breakpoints/) (identifiers). `breakpoints` (*Array\<String\>* [optional]): Default to `['sm', 'md', 'lg']`.
- `variants` (*Array\<String\>* [optional]): Default to all. フォントサイズがわずかに変化して線が表示されるかどうか 高さは保持され、Material Designの4pxライン高さグリッドに位置合わせされます。 これには、テーマのスタイルで単位なしの行の高さが必要です。 これには、テーマのスタイルで単位なしの行の高さが必要です。
- `variants` (*Array\<String\>* [optional]): Default to all. この値は、フォントサイズのサイズ変更の強度を決定します。 値が大きいほど、小さな画面のフォントサイズの差は小さくなります。 値が小さいほど、小さい画面のフォントサイズが大きくなります。 値は1より大きくなければなりません。
- `factor` (*Number* [optional]): Default to `2`. 処理するタイポグラフィバリアント。

#### 戻り値

`theme` (*Object*): レスポンシブなタイポグラフィを備えた新しいテーマ。

#### 例

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**WARNING**: Do not use this method in production.

Generates a theme that reduces the amount of warnings inside [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) like `Warning: findDOMNode is deprecated in StrictMode`.

#### Requirements

Using `unstable_createMuiStrictModeTheme` restricts the usage of some of our components.

##### `component` prop

The component used in the `component` prop of the following components need to forward their ref:

- [`Collapse`](/api/collapse/)

Otherwise you'll encounter `Error: Function component cannot be given refs`. See also: [Composition: Caveat with refs](/guides/composition/#caveat-with-refs).

##### `children` prop

The `children` of the following components need to forward their ref:

- [`Fade`](/api/fade/)
- [`Grow`](/api/grow/)
- [`Zoom`](/api/zoom/)

```diff
-function TabPanel(props) {
+const TabPanel = React.forwardRef(function TabPanel(props, ref) {
  return <div role="tabpanel" {...props} ref={ref} />;
-}
+});

function Tabs() {
  return <Fade><TabPanel>...</TabPanel></Fade>;
}
```

Otherwise the component will not animate properly and you'll encounter the warning that `Function components cannot be given refs`.

#### Disable StrictMode compatibility partially

If you still see `Error: Function component cannot be given refs` then you're probably using a third-party component for which the previously mentioned fixes aren't applicable. You can fix this by applying `disableStrictModeCompat`. You'll see deprecation warnings again but these are only warnings while `Function component cannot be given refs` actually breaks the documented behavior of our components.

```diff
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

function ThirdPartyTabPanel(props) {
  return <div {...props} role="tabpanel">
}

const theme = unstable_createMuiStrictModeTheme();

function Fade() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>

-        <Fade>
+        <Fade disableStrictModeCompat>
          <ThirdPartyTabPanel />
        </Fade>
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```

#### 引数

1. `options` (*Object*): 不完全なテーマオブジェクトを取得し、不足している部分を追加します。
2. `...args` (*Array*): Deep merge the arguments with the about to be returned theme.

#### 戻り値

`theme` (*Object*): すぐに使用できる完全なテーマオブジェクト。

#### 例

```js
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```