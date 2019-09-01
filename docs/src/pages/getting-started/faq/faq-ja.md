# よくある質問と回答

<p class="description">特定の問題で立ち往生していますか？ Check some of these common gotchas first in the FAQ.</p>

もし探しているものがまだ見つからない場合、 [Spectrum](https://spectrum.chat/material-ui)にある我々のコミュニティに質問ができます 使い方の質問やその他重要ではない問題は、Github issuesではなく[StackOverflow](https://stackoverflow.com/questions/tagged/material-ui)を使ってください。 `material-ui`というStackOverflowタグがあります。 質問にはそのタグをつけてください。

## productionビルドでコンポーネントが正しくレンダリングされないのはなぜですか？

これは、コードがproduction bundleに入った後にクラス名が競合するために発生する可能性があるn°1の問題です。 Material-UIが機能するためには、`className`ページ上のすべてのコンポーネントの値は、[クラス名ジェネレータ](/styles/advanced/#class-names)の単一インスタンスによって生成される必要があります。

この問題を解決するには、ページ上のすべてのコンポーネントを初期化して、それらの間の**クラス名ジェネレータが1つだけ**存在するようにする必要があります。

さまざまなシナリオで、誤って2つのクラス名ジェネレータを使用することになる事例

- 誤ってMaterial-UIの2つのバージョンを**bundle**してしまっている場合、 依存関係がMaterial-UIを対の依存関係として正しく設定されていない可能性があります
- Reactツリーの**サブセット**に`StylesProvider`を使用している場合
- バンドラーを使用していて、それが原因で複数のクラス名ジェネレータインスタンスが作成されるようにコードを分割している場合。

> Webパックで[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)を使用している場合は、[`最適化`で`runtimeChunk`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk)設定を構成してみてください。

全体として、各Material-UIアプリケーションをコンポーネントツリーの最上部にある[`StylesProvider`](/styles/api/#stylesprovider)コンポーネントでWrapし、**コンポーネントツリー間で共有される単一のクラス名ジェネレータを使用することで**、この問題を簡単に解決できます。

## モーダルを開くと、fixed positionされたDOMが移動するのはなぜですか？

Scroll is blocked as soon as a modal is opened. モーダルが唯一のインタラクティブなコンテンツであるべき場合、backgroundとの連動を防ぎます。しかし、スクロールバーを取り除くことで**fixed positionされたDOM**を動かすことができます。 この場合、Material-UIにこれらのDOMを処理するように伝えるために、グローバルな `.mui-fixed`クラス名を適用することができます。

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

## 移行をグローバルに無効にするにはどうすればよいですか？

テーマに次の項目を指定すると、推移をグローバルに無効にできます。

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

トランジション、アニメーション、およびリプル効果をすべて無効にすると、さらに一歩進めることができます。

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

いいえ、必須ではありません。 しかし、この依存性は組み込まれているため、追加のバンドルサイズのオーバーヘッドはありません。

しかし、おそらくすでに別のスタイルライブラリを使用してアプリケーションにいくつかのMaterial-UIコンポーネントを追加している、 またはすでに別のAPIを使用している場合には、新しいものを学びたくはないでしょう？ その場合は、[スタイルライブラリの相互運用](/guides/interoperability/)セクションで、Material-UIコンポーネントを別のスタイルのライブラリでスタイル変更することがいかに簡単であるかを示します。

## インラインスタイルとCSSのどちらを使用すべきか

経験則として、動的styleプロパティにはinline-styleのみを使用してください。 CSSの代替手段は、次のようなより多くの利点を提供します。

- auto-prefixing
- デバックのしやすさ
- メディアクエリ
- keyframes

## react-routerの使い方は？

How to use a [third-party routing library](/components/buttons/#third-party-routing-library) is documented with the `ButtonBase` component. A lot of the interactive components use it internally: `Link`, `Button`, `MenuItem`, `<ListItem button />`, `Tab`, etc. それらの例を参考にしてください。

## どうやってDOM要素にアクセスできますか？

DOM内の何かを描画するすべてのMaterial-UIコンポーネントは、そのrefを基礎となるDOMコンポーネントに転送します。 つまり、Material-UIコンポーネントにアタッチされたrefを読み取ることでDOM要素 を取得できます。

```jsx
// or a ref setter function
const ref = React.createRef();
// render
<Button ref={ref} />;
// usage
const element = ref.current;
```

問題のMaterial-UIコンポーネントがそのrefを転送するかどうかわからない場合は、 [Button API](/api/button/#props)など、「プロパティ」のAPIドキュメントを確認できます。 含む

> Refはルート要素に転送されます。

refを使用してDOM要素にアクセスできることを示します。

## ページにスタイルのインスタンスがいくつかあります

次のような警告メッセージがコンソールに表示される場合は、ページ上で`@material-ui/styles`のインスタンスがいくつか初期化されている可能性があります。

> It looks like there are several instances of `@material-ui/styles` initialized in this application. This may cause theme propagation issues, broken class names, specificity issues, and makes your application bigger without a good reason.

### 考えられる理由:

これが起こる一般的な理由はいくつかあります。

- 依存関係のどこかに別の`@material-ui/styles`ライブラリがあります。
- プロジェクト(例：yarn workspaces)にmonorepo構造があり、`@material-ui/styles`モジュールが複数のパッケージ(これは前のとだいたい同じです)に依存しています。
- `@material-ui/styles`を使用する複数のアプリケーションが同じページ(たとえば、webpackの複数のエントリポイントが同じページにロードされる。)で実行されています。

### node_modulesの重複モジュール

依存関係のどこかにあるduplicated@material-ui/styles モジュールに問題があると考えられる場合、これをチェックする方法がいくつかあります。 You can use `npm ls @material-ui/styles`, `yarn list @material-ui/styles` or `find -L ./node_modules | grep /@material-ui/styles/package.json` commands in your application folder.

これらのコマンドで重複が識別されない場合は、バンドルを分析して@material-ui/stylesの複数のインスタンスを探してください。 これらのコマンドで重複が識別されない場合は、バンドルを分析して@material-ui/stylesの複数のインスタンスを探してください。

重複が発生している問題であることがわかった場合は、いくつかの解決方法があります。

Npmを使用している場合は、`npm dedupe`を実行してみてください。 このコマンドは、ローカルの依存関係を検索し、共通の依存関係をツリーの上位に移動して構造を単純化しようとします。

Webパックを使用している場合は、@material-ui/stylesモジュールを[解決](https://webpack.js.org/configuration/resolve/#resolve-modules)する方法を変更できます。 Webpackが依存関係を検索するデフォルトの順序を上書きし、アプリケーションのnode_modulesをデフォルトのノードモジュール解決順序よりも優先させることができます。

```diff
  resolve: {
+   alias: {
+     "@material-ui/styles": path.resolve(appFolder, "node_modules", "@material-ui/styles"),
+   }
  }
```

### Lernaでの使用

@material-ui/stylesをLerna monorepoの複数のパッケージで動作させるための一つの解決策は、共有されている依存関係をmonorepoファイルのルートに [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) することです。 --hoistフラグを指定してbootstrap option を実行してみてください。

```sh
lerna bootstrap --hoist
```

または、パッケージから@material-ui/stylesを削除することもできます。jsonファイルを作成し、手動で最上位のパッケージに上げます。jsonファイルを使用します。

Lernaルートフォルダー内のpackage.jsonファイルの例

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

### 1つのページで複数のアプリケーションを実行する

1つのページで複数のアプリケーションを実行している場合は、それらすべてに1つの@material-ui/stylesモジュールを使用することを検討してください。 Webパックを使用している場合は、[CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)を使用して@material-ui/stylesモジュールを含む明示的な[vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), を作成できます。

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

## サーバーでアプリが正しくレンダリングされない

動作しない場合は、99%のケースで設定の問題になります。 欠落しているプロパティー、誤った呼び出し順序、または欠落しているコンポーネント。 Server side rendering is strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup, check out the [reference implementations](/guides/server-rendering/#reference-implementations), bit by bit.

### CSSは最初のロードでのみ機能し、その後欠落します

CSSは、ページの最初のロード時にのみ生成されます。 この場合、CSSは連続した要求に対してサーバに存在しません。

#### 実行するアクション

The styling solution relies on a cache, the *sheets manager*, to only inject the CSS once per component type (if you use two buttons, you only need the CSS of the button one time). 要求ごとに**新しい`シート`インスタンスを作成する必要があります**。

*修正の例：*

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

### Reactクラス名のハイドレーションの不一致

クライアントとサーバーの間にクラス名の不一致があります。 最初の要求で機能する場合があります。 う1つの症状は、初期ページ・ロードとクライアント・スクリプトのダウンロードの間でスタイル設定が変更されることです。

#### 実行するアクション

クラス名の値は、[class name generator](/styles/advanced/#class-names)の概念に基づいています。 ページ全体を**単一のジェネレーターでレンダリングする必要があります** 。 このジェネレーターは、サーバーとクライアントで同じように動作する必要があります。 例えば：

- 要求ごとに新しいクラス名ジェネレータを提供する必要があります。 しかし、異なるリクエスト間で`createGenerateClassName()`を共有すべきではありません。

*修正の例：*

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

- しかし、異なるリクエスト間で**createGenerateClassName()**を共有すべきではありません。 マイナーバージョンの不一致でも、スタイルの問題が発生する可能性があります。 バージョン番号を確認するには、アプリケーションを構築する環境と配備環境で`npm list@material-ui/core`を実行します
    
    Package.jsonの依存関係に特定のMUIバージョンを指定することで、異なる環境で同じバージョンを使用することもできます。

*修正の例（package.json）：*

```diff
  "dependencies": {
    ...

-   "@material-ui/core": "^4.0.0",
+   "@material-ui/core": "4.0.0",
    ...
  },
```

- サーバーとクライアントが同じ`process.env.NODE_ENV` valueを共有していることを確認する必要があります。

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

## Component Xがrefオブジェクトの代わりにpropでDOMノードを必要とするのはなぜですか？

[Portal](/api/portal/#props)または[Popper](/api/popper/#props)のようなコンポーネントでは、それぞれ `container` または`anchorEl`プロパティにDOMノードが必要です。 これらのプロップにrefオブジェクトを渡し、Material-UIに現在の値にアクセスさせると便利です。 これは、次のような単純なシナリオで機能します。

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

ここで、`Portal`は、`container.current`が使用可能の場合にのみ、子をコンテナーにマウントします。 ポータルの単純な実装は次のとおりです。

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

この単純なヒューリスティックな` Portal ` refはエフェクトが実行される前に最新であるため、マウント後に再レンダリングされる可能性があります。 ただし、refが最新であるからといって、定義済みインスタンスを指しているわけではありません。 refがref転送コンポーネントに接続されている場合、DOMノードがいつ使用可能になるかは不明です。 上記の例では、`Portal`は効果を一度だけ実行しますが、`ref.current`はまだ`null`です。 これは特に 遅延（Suspense）のReact.lazy components の場合に顕著です。 上記の実装では、DOMノードの変更も考慮できませんでした。

このため、Reactが`Portal`をいつ再レンダリングするかを決定できるように、実際のDOMノードを持つプロップが必要です。

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

## Clsxの依存関係は何ですか？

[clsx](https://github.com/lukeed/clsx)は、条件付きで`className`文字列を構築するための小さなユーティリティです。

Instead of writing:

```jsx
return (
  <div
    className={`MuiButton-root ${disabled ? 'Mui-disabled' : ''} ${selected ? 'Mui-selected' : ''}`}
  />
);
```

you can do:

```jsx
import clsx from 'clsx';

return (
  <div
    className={clsx('MuiButton-root', {
      'Mui-disabled': disabled,
      'Mui-selected': selected,
    })}
  />
);
```