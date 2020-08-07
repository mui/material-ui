# ブレークポイント

<p class="description">さまざまなコンテキストでブレークポイントを使用できるようにするAPI。</p>

最適なユーザーエクスペリエンスを得るには、material designインターフェイスがさまざまなブレークポイントでレイアウトを調整できる必要があります。 最適なユーザーエクスペリエンスを得るには、material designインターフェイスがさまざまなブレークポイントでレイアウトを調整できる必要があります。 Material-UIは、元の仕様の**簡易**[実装](https://material.io/design/layout/responsive-layout-grid.html#breakpoints)を使用します。

ブレークポイントは、さまざまなコンポーネントで応答性を高めるために内部的に使用されますが、[Grid](/components/grid/)および[Hidden](/components/hidden/)コンポーネントを使用してアプリケーションのレイアウトを制御する場合にも利用できます。

## Default breakpoints

各ブレークポイント(a key) は、*固定(a value) 画面幅*と一致します。

- **xs,** extra-small: 0px
- **sm,** small: 600px
- **md,** medium: 960px
- **lg,** large: 1280px
- **xl,** extra-large: 1920px

These breakpoint values are used to determine breakpoint ranges. 範囲は、ブレークポイント値を含む範囲から、次のブレークポイント値を除く範囲までです。

```js
value         |0px     600px    960px    1280px   1920px
key           |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
```

These values can be [customized](#custom-breakpoints).

## CSSメディアクエリ

CSS media queries are the idiomatic approach to make your UI responsive. The theme provides four styles helpers to do so:

- [theme.breakpoints.up(key)](#theme-breakpoints-up-key-media-query)
- [theme.breakpoints.down(key)](#theme-breakpoints-down-key-media-query)
- [theme.breakpoints.only(key)](#theme-breakpoints-only-key-media-query)
- [theme.breakpoints.between(start, end)](#theme-breakpoints-between-start-end-media-query)

次のデモでは、画面の幅に基づいて背景色(赤色、青色 、緑色) を変更します。

```jsx
const styles = theme => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: green[500],
    },
  },
});
```

{{"demo": "pages/customization/breakpoints/MediaQuery.js"}}

## JavaScriptメディアクエリ

CSSだけでは不十分な場合もあります。 CSSだけでは不十分な場合もあります。 JavaScriptで、ブレークポイントの値に基づいてReactレンダリングツリーを変更できます。

### useMediaQueryフック

詳細については、 [useMediaQuery](/components/use-media-query/) ページを参照してください。

### withWidth()

> ⚠️この高次コンポーネントは、[ useMediaQueryフック](/components/use-media-query/)では非推奨になります。

```jsx
import withWidth from '@material-ui/core/withWidth';

function MyComponent(props) {
  return <div>{`Current width: ${props.width}`}</div>;
}

export default withWidth()(MyComponent);
```

次のデモでは、画面の幅に基づいてレンダリングされたDOM要素(*em*、<u>u</u>、~~del~~& span) を変更します。

{{"demo": "pages/customization/breakpoints/WithWidth.js"}}

## Custom breakpoints

You define your project's breakpoints in the `theme.breakpoints` section of your theme.

- [`theme.breakpoints.values`](/customization/default-theme/?expand-path=$.breakpoints.values): Default to the [above values](#default-breakpoints). The keys are your screen names, and the values are the min-width where that breakpoint should start.
- `theme.breakpoints.unit`: Default to `px`. The unit used for the breakpoint's values.
- `theme.breakpoints.step`: Default to 5 (`0.05px`). The increment used to implement exclusive breakpoints.

If you change the default breakpoints's values, you need to provide them all:

```jsx
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})
```

Feel free to have as few or as many breakpoints as you want, naming them in whatever way you'd prefer for your project.

```js
const theme = createMuiTheme({
  breakpoints: {
    values: {
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});
```

If you are using TypeScript, you would also need to use [module augmentation](/guides/typescript/#customization-of-theme) for the theme to accept the above values.

```ts
declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}
```

## API

### `theme.breakpoints.up(key) => media query`

#### 引数

1. `key` (*String* | *Number*)：ブレークポイントキー（`xs` 、`sm`など）またはピクセル単位の画面幅の数値。

#### 戻り値

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths greater than and including the screen size given by the breakpoint key.

#### 例

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, ∞)
    //       [960px, ∞)
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.down(key) => media query`

#### 引数

1. `key` (*String* | *Number*)：ブレークポイントキー（`xs` 、`sm`など）またはピクセル単位の画面幅の数値。

#### 戻り値

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths less than and including the screen size given by the breakpoint key.

#### 例

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [0, md + 1)
    //       [0, lg)
    //       [0, 1280px)
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.only(key) => media query`

#### 引数

1. `key` (*String*)：ブレークポイントキー（`xs` 、`sm`など）。

#### 戻り値

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths including the screen size given by the breakpoint key.

#### 例

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, md + 1)
    //       [md, lg)
    //       [960px, 1280px)
    [theme.breakpoints.only('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.between(start, end) => media query`

#### 引数

1. `start` (*String*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixels.
2. `end` (*String*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixels.

#### 戻り値

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths greater than the screen size given by the breakpoint key in the first argument and less than the the screen size given by the breakpoint key in the second argument.

#### 例

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [sm, md + 1)
    //       [sm, lg)
    //       [600px, 1280px[
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `withWidth([options]) => higher-order component`

`width`プロパティを挿入します。 渡されたコンポーネントは変更されません。; 代わりに、新しいコンポーネントを返します。 この`width`ブレークポイントのプロパティは、現在の画面の幅に一致します。 次のブレークポイントのいずれかです。

```ts
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

注意が必要な実装の詳細は、次のとおりです。

- *non React static* プロパティを転送するので、このHOCはより「透明」です。 たとえば、`getInitialProps()`静的メソッド (next.js) を定義するために使用できます。 たとえば、`getInitialProps()`静的メソッド (next.js) を定義するために使用できます。

#### 引数

1. `オプション` (*オプジェクト* [任意]): 
  - `options.withTheme` (*ブール値* [任意]): デフォルト値 `false`. `theme`オブジェクトをプロパティとしてコンポーネントに提供します。
  - `options.noSSR` (*ブール値* [任意]): デフォルト値 `false`. サーバー側のレンダリング調整を実行するには、2回レンダリングする必要があります。 1回目は何もない状態で、2回目は子要素と一緒です。 このダブルパスレンダリングサイクルには欠点があります。 UIが点滅することがあります。 サーバサイドレンダリングを実行しない場合は、このフラグを`true`に設定できます。
  - ` options.initialWidth ` （*Breakpoint* [optional]）： As ` window.innerWidth `サーバーでは使用できません デフォルトでは、最初のマウント時に空のコンポーネントがレンダリングされます。 ヒューリスティックを使用して、次の値を近似できます。 クライアント・ブラウザの画面幅。 たとえば、ユーザーエージェントまたはクライアントヒントを使用できます。 https://caniuse.com/#search=client%20hint、[`テーマにカスタムプロパティを使用して初期幅
グローバルに設定することもできます`](/customization/globals/#default-props)。 InitialWidthを設定するには、この形状のカスタムプロパティを渡す必要があります。

```js
const theme = createMuiTheme({
  props: {
    // withWidth component ⚛️
    MuiWithWidth: {
      // Initial width property
      initialWidth: 'lg', // Breakpoint being globally set 🌎!
    },
  },
});
```

- `options.resizeInterval` (*Number* [optional]): 既定は166で、60Hzで10フレームに対応します。 画面サイズ変更イベントに応答するまでに待機するミリ秒数。 画面サイズ変更イベントに応答するまでに待機するミリ秒数。

#### 戻り値

注意が必要な実装の詳細は、次のとおりです。

#### 例

```jsx
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

function MyComponent(props) {
  if (isWidthUp('sm', props.width)) {
    return <span />
  }

  return <div />;
}

export default withWidth()(MyComponent);
```

## デフォルト値

You can explore the default values of the breakpoints using [the theme explorer](/customization/default-theme/?expand-path=$.breakpoints) or by opening the dev tools console on this page (`window.theme.breakpoints`).