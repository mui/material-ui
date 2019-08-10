# よくある質問と回答

<p class="description">特定の問題で立ち往生していますか？ よくある質問でこれらのよくある問題のいくつかを最初に確認してください。</p>

もし探しているものがまだ見つからない場合、 [Spectrum](https://spectrum.chat/material-ui)にある我々のコミュニティに質問ができます 使い方の質問やその他重要ではない問題は、Github issuesではなく[StackOverflow](https://stackoverflow.com/questions/tagged/material-ui)を使ってください。 `material-ui`というStackOverflowタグがあります。 質問にはそのタグをつけてください。

## productionビルドでコンポーネントが正しくレンダリングされないのはなぜですか？

これは、コードがproduction bundleに入った後にクラス名が競合するために発生する可能性があるn°1の問題です。 Material-UIが機能するためには、`className`ページ上のすべてのコンポーネントの値は、[クラス名ジェネレータ](/styles/advanced/#class-names)の単一インスタンスによって生成される必要があります。

この問題を解決するには、ページ上のすべてのコンポーネントを初期化して、それらの間の**クラス名ジェネレータが1つだけ**存在するようにする必要があります。

さまざまなシナリオで、誤って2つのクラス名ジェネレータを使用することになる事例

- 誤ってMaterial-UIの2つのバージョンを**bundle**してしまっている場合、 依存関係がMaterial-UIを対の依存関係として正しく設定されていない可能性があります
- Reactツリーの**サブセット**に`StylesProvider`を使用している場合
- バンドラーを使用していて、それが原因で複数のクラス名ジェネレータインスタンスが作成されるようにコードを分割している場合。

> If you are using webpack with the [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/), try configuring the [`runtimeChunk` setting under `optimizations`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk).

全体として、各Material-UIアプリケーションをコンポーネントツリーの最上部にある[`StylesProvider`](/styles/api/#stylesprovider)コンポーネントでWrapし、**コンポーネントツリー間で共有される単一のクラス名ジェネレータを使用することで**、この問題を簡単に解決できます。

## モーダルを開くと、fixed positionされたDOMが移動するのはなぜですか？

モーダルが開かれるとすぐにスクロールをブロックします。 モーダルが唯一のインタラクティブなコンテンツであるべき場合、backgroundとの連動を防ぎます。しかし、スクロールバーを取り除くことで**fixed positionされたDOM**を動かすことができます。 この場合、Material-UIにこれらのDOMを処理するように伝えるために、グローバルな `.mui-fixed`クラス名を適用することができます。

## 波紋アニメーションをグローバルに無効にする方法は？

波紋アニメーションは、BaseButtonコンポーネントからのみ発生しています。 テーマに次のように指定することで、波紋アニメーションをグローバルに無効にすることができます。

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});
```

## How can I disable transitions globally?

You can disable transitions globally by providing the following in your theme:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
});
```

テスト中やローエンドデバイスなどで、条件付きでこの動作を有効にしたい場合があります。この場合は、テーマの値を動的に変更できます。

You can go one step further by disabling all the transitions, animations and the ripple effect:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
  overrides: {
    // Name of the component ⚛️
    MuiCssBaseline: {
      // Name of the rule
      '@global': {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application!
    },
  },
});
```

## アプリのスタイルを設定するにはJSSを使用する必要がありますか？

No, it's not required. But this dependenency comes built in, so carries no additional bundle size overhead.

しかし、おそらくすでに別のスタイルライブラリを使用してアプリケーションにいくつかのMaterial-UIコンポーネントを追加している、 またはすでに別のAPIを使用している場合には、新しいものを学びたくはないでしょう？ その場合は、[スタイルライブラリの相互運用](/guides/interoperability/)セクションで、Material-UIコンポーネントを別のスタイルのライブラリでスタイル変更することがいかに簡単であるかを示します。

## When should I use inline-style vs CSS?

経験則として、動的styleプロパティにはinline-styleのみを使用してください。 CSSの代替手段は、次のようなより多くの利点を提供します。

- auto-prefixing
- デバックのしやすさ
- メディアクエリ
- keyframes

## react-routerの使い方は？

私達は[サードパーティ製ルーティングライブラリ](/components/buttons/#third-party-routing-library)で`ButtonBase`コンポーネントの使い方をドキュメント化しました。 多くのインタラクティブなコンポーネントを内部的に使っています：`Button`, `MenuItem`, `<ListItem button />`, `Tab` それらの例を参考にしてください。

## どうやってDOM要素にアクセスできますか？

All Material-UI components that should render something in the DOM forward their ref to the underlying DOM component. This means that you can get DOM elements by reading the ref attached to Material-UI components:

```jsx
// or a ref setter function
const ref = React.createRef();
// render
<Button ref={ref} />;
// usage
const element = ref.current;
```

If you're not sure if the Material-UI component in question forwards its ref you can check the API documentation under "Props" e.g. the [Button API](/api/button/#props) includes

> The ref is forwarded to the root element.

indicating that you can access the DOM element with a ref.

## I have several instances of styles on the page

If you are seeing a warning message in the console like the one below, you probably have several instances of `@material-ui/styles` initialized on the page.

> It looks like there are several instances of `@material-ui/styles` initialized in this application. This may cause theme propagation issues, broken class names, specificity issues, and makes your application bigger without a good reason.

### Possible reasons

There are several common reasons for this to happen:

- You have another `@material-ui/styles` library somewhere in your dependencies.
- You have a monorepo structure for your project (e.g, lerna, yarn workspaces) and `@material-ui/styles` module is a dependency in more than one package (this one is more or less the same as the previous one).
- You have several applications that are using `@material-ui/styles` running on the same page (e.g., several entry points in webpack are loaded on the same page).

### Duplicated module in node_modules

If you think that the issue is in duplicated @material-ui/styles module somewhere in your dependencies, there are several ways to check this. You can use `npm ls @material-ui/styles`, `yarn list @material-ui/styles` or `find -L ./node_modules | grep /@material-ui/styles/package.json` commands in your application folder.

If none of these commands identified the duplication, try analyzing your bundle for multiple instances of @material-ui/styles. You can just check your bundle source, or use a tool like [source-map-explorer](https://github.com/danvk/source-map-explorer) or [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

If you identified that duplication is the issue that you are encountering there are several things you can try to solve it:

If you are using npm you can try running `npm dedupe`. This command searches the local dependencies and tries to simplify the structure by moving common dependencies further up the tree.

If you are using webpack, you can change the way it will [resolve](https://webpack.js.org/configuration/resolve/#resolve-modules) the @material-ui/styles module. You can overwrite the default order in which webpack will look for your dependencies and make your application node_modules more prioritized than default node module resolution order:

```diff
  resolve: {
+   alias: {
+     "@material-ui/styles": path.resolve(appFolder, "node_modules", "@material-ui/styles"),
+   }
  }
```

### Usage with Lerna

One possible fix to get @material-ui/styles to run in a Lerna monorepo across packages, is to [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) shared dependencies to the root of your monorepo file. Try running the bootstrap option with the --hoist flag.

```sh
lerna bootstrap --hoist
```

Alternatively, you can remove @material-ui/styles from your package.json file and hoist it manually to your top-level package.json file.

Example of a package.json file in a Lerna root folder

```json
{
  "name": "my-monorepo",
  "devDependencies": {
    "lerna": "latest"
  },
  "dependencies": {
    "@material-ui/styles": "^4.0.0"
  },
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "clean": "lerna clean",
    "start": "lerna run start",
    "build": "lerna run build"
  }
}
```

### Running multiple applications on one page

If you have several applications running on one page, consider using one @material-ui/styles module for all of them. If you are using webpack, you can use [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) to create an explicit [vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), that will contain the @material-ui/styles module:

```diff
  module.exports = {
    entry: {
+     vendor: ["@material-ui/styles"],
      app1: "./src/app.1.js",
      app2: "./src/app.2.js",
    },
    plugins: [
+     new webpack.optimize.CommonsChunkPlugin({
+       name: "vendor",
+       minChunks: Infinity,
+     }),
    ]
  }
```

## My App doesn't render correctly on the server

If it doesn't work, in 99% of cases it's a configuration issue. A missing property, a wrong call order, or a missing component. We are very strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup, check out our [reference implementations](/guides/server-rendering/#reference-implementations), bit by bit.

### CSS works only on first load then is missing

The CSS is only generated on the first load of the page. Then, the CSS is missing on the server for consecutive requests.

#### Action to Take

We rely on a cache, the sheets manager, to only inject the CSS once per component type (if you use two buttons, you only need the CSS of the button one time). You need to create **a new `sheets` instance for each request**.

*example of fix:*

```diff
-// Create a sheets instance.
-const sheets = new ServerStyleSheets();

function handleRender(req, res) {

+ // Create a sheets instance.
+ const sheets = new ServerStyleSheets();

  //…

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
```

### React class name hydration mismatch

There is a class name mismatch between the client and the server. It might work for the first request. Another symptom is that the styling changes between initial page load and the downloading of the client scripts.

#### Action to Take

The class names value relies on the concept of [class name generator](/styles/advanced/#class-names). The whole page needs to be rendered with **a single generator**. This generator needs to behave identically on the server and on the client. For instance:

- You need to provide a new class name generator for each request. But you shouldn't share a `createGenerateClassName()` between different requests:

*example of fix:*

```diff
-// Create a new class name generator.
-const generateClassName = createGenerateClassName();

function handleRender(req, res) {

+ // Create a new class name generator.
+ const generateClassName = createGenerateClassName();

  //…

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
```

- You need to verify that your client and server are running the **exactly the same version** of Material-UI. It is possible that a mismatch of even minor versions can cause styling problems. To check version numbers, run `npm list @material-ui/core` in the environment where you build your application and also in your deployment environment.
    
    You can also ensure the same version in different environments by specifying a specific MUI version in the dependencies of your package.json.

*example of fix (package.json):*

```diff
  "dependencies": {
    ...

-   "@material-ui/core": "^4.0.0",
+   "@material-ui/core": "4.0.0",
    ...
  },
```

- You need to make sure that the server and the client share the same `process.env.NODE_ENV` value.

## 私が見ている色とこのサイトで見ている色が違うのはなぜですか？

ドキュメントサイトはカスタムテーマを使用しています。 したがって、カラーパレットがあるMaterial-UIが提供しているデフォルトのテーマは異なります。 テーマのカスタマイズについて学ぶには、この[ページ](/customization/theming/)を参照してください。

## Material-UIは最高です。 プロジェクトを支援するにはどのようにできますか？

Material-UIをサポートする方法はたくさんあります。

- [ドキュメント](https://github.com/mui-org/material-ui/tree/master/docs)を改善する 
- 他の人が始めるのを手伝う
- [ライブラリを布教する](https://twitter.com/MaterialUI) 
- [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui)や[Spectrum](https://spectrum.chat/material-ui)で質問に答える

商用プロジェクトでMaterial-UIを使用していて、スポンサーになることによってその継続的な開発を支援したい場合は、 あるいはサブや趣味のプロジェクトで**スポンサー**になりたい場合は、[OpenCollective](https://opencollective.com/material-ui)を使って行うことができます。

集められた資金はすべて透過的に管理され、スポンサーはREADMEとMaterial-UIのホームページで表彰されます。

## Why does component X require a DOM node in a prop instead of a ref object?

Components like the [Portal](/api/portal/#props) or [Popper](/api/popper/#props) require a DOM node in the `container` or `anchorEl` prop respectively. It seems convenient to simply pass a ref object in those props and let Material-UI access the current value. This works in a simple scenario:

```jsx
function App() {
  const container = React.useRef(null);

  return (
    <div className="App">
      <Portal container={container}>
        <span>portaled children</span>
      </Portal>
      <div ref={container} />
    </div>
  );
}
```

where `Portal` would only mount the children into the container when `container.current` is available. Here is a naive implementation of Portal:

```jsx
function Portal({ children, container }) {
  const [node, setNode] = React.useState(null);

  React.useEffect(() => {
    setNode(container.current);
  }, [container]);

  if (node === null) {
    return null;
  }
  return ReactDOM.createPortal(children, node);
}
```

With this simple heuristic `Portal` might re-render after it mounts because refs are up-to-date before any effects run. However, just because a ref is up-to-date doesn't mean it points to a defined instance. If the ref is attached to a ref forwarding component it is not clear when the DOM node will be available. In the above example the `Portal` would run run an effect once but might not re-render because `ref.current` is still `null`. This is especially apparent for React.lazy components in Suspense. The above implementation could also not account for a change in the DOM node.

This is why we require a prop with the actual DOM node so that React can take care of determining when the `Portal` should re-render:

```jsx
function App() {
  const [container, setContainer] = React.useState(null);
  const handleRef = React.useCallback(instance => setContainer(instance), [setContainer])

  return (
    <div className="App">
      <Portal container={container}>
        <span>Portaled</span>
      </Portal>
      <div ref={handleRef} />
    </div>
  );
}
```