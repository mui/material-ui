# よくある質問と回答

<p class="description">特定の問題で立ち往生していますか？ よくある質問でこれらのよくある問題のいくつかを最初に確認してください。</p>

それでも探しているものが見つからない場合は、[gitter](https://gitter.im/mui-org/material-ui)というコミュニティに質問することができます。 使い方の質問やその他重要ではない問題は、Github issues ではなく[StackOverflow](https://stackoverflow.com/questions/tagged/material-ui)を使ってください。 `material-ui`という StackOverflow タグがあります。 質問にはそのタグをつけてください。

## production ビルドでコンポーネントが正しくレンダリングされないのはなぜですか？

これは、コードが production bundle に入った後にクラス名が競合するために発生する可能性がある n°1 の問題です。 Material-UI が機能するためには、`className`ページ上のすべてのコンポーネントの値は、[クラス名ジェネレータ](/css-in-js/advanced/#class-names)の単一インスタンスによって生成される必要があります。

この問題を解決するには、ページ上のすべてのコンポーネントを初期化して、それらの間の**クラス名ジェネレータが 1 つだけ**存在するようにする必要があります。

さまざまなシナリオで、誤って 2 つのクラス名ジェネレータを使用することになる事例

- 誤って Material-UI の 2 つのバージョンを**bundle**してしまっている場合、 依存関係が Material-UI を対の依存関係として正しく設定されていない可能性があります
- React ツリーの**サブセット**に`StylesProvider`を使用している場合
- You are using a bundler and it is splitting code in a way that causes multiple class name generator instances to be created.

> If you are using webpack with the [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/), try configuring the [`runtimeChunk` setting under `optimizations`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk).

全体として、各 Material-UI アプリケーションをコンポーネントツリーの最上部にある[`StylesProvider`](/css-in-js/api/#stylesprovider)コンポーネントで Wrap し、**コンポーネントツリー間で共有される単一のクラス名ジェネレータを使用することで**、この問題を簡単に解決できます。

⚠️ If you are in a hurry, we provide an option to make the class names **deterministic** as a quick escape hatch: [`dangerouslyUseGlobalCSS`](/css-in-js/advanced/#deterministic-class-names).

## モーダルを開くと、fixed position された DOM が移動するのはなぜですか？

モーダルが開かれるとすぐにスクロールをブロックします。 モーダルが唯一のインタラクティブなコンテンツであるべき場合、background との連動を防ぎます。しかし、スクロールバーを取り除くことで**fixed position された DOM**を動かすことができます。 この場合、Material-UI にこれらの DOM を処理するように伝えるために、グローバルな `.mui-fixed`クラス名を適用することができます。

## 波紋アニメーションをグローバルに無効にする方法は？

波紋アニメーションは、BaseButton コンポーネントからのみ発生しています。 テーマに次のように指定することで、波紋アニメーションをグローバルに無効にすることができます。

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application
    },
  },
});
```

## アニメーションをグローバルに無効にする方法

テーマに次のように指定することで、アニメーションをグローバルに無効にすることができます。

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

## アプリのスタイルを設定するには JSS を使用する必要がありますか？

強くお勧めします。

- ビルトインのため、追加の bundle サイズのオーバーヘッドはありません
- 速い & メモリ効率が良い
- 明瞭で一貫性のある[API](https://cssinjs.org/json-api/)
- ネイティブでも[プラグイン](https://cssinjs.org/plugins/)でも、多くの高度な機能をサポートします。

しかし、おそらくすでに別のスタイルライブラリを使用してアプリケーションにいくつかの Material-UI コンポーネントを追加している、 またはすでに別の API を使用している場合には、新しいものを学びたくはないでしょう？ その場合は、[スタイルライブラリの相互運用](/guides/interoperability/)セクションで、Material-UI コンポーネントを別のスタイルのライブラリでスタイル変更することがいかに簡単であるかを示します。

## inline-style もしくは classes どちらを使うべきですか？

経験則として、動的 style プロパティには inline-style のみを使用してください。 CSS の代替手段は、次のようなより多くの利点を提供します。

- auto-prefixing
- デバックのしやすさ
- メディアクエリ
- keyframes

## react-router の使い方は？

私達は[サードパーティ製ルーティングライブラリ](/demos/buttons/#third-party-routing-library)で`ButtonBase`コンポーネントの使い方をドキュメント化しました。 私たちのインタラクティブなコンポーネントの多くは ButtonBase コンポーネントを内部的に使っています：`Button`, `MenuItem`, `<ListItem button />`, `Tab`, などなど。 それらの例を参考にしてください。

## `withStyles()`と`withTheme`HOC はどうやって結合すればいいですか？

さまざまなオプションがあります。

**`withTheme`オプション:**

```js
export default withStyles(styles, { withTheme: true })(Modal);
```

**`compose()`ヘルパー関数:**

```js
import { compose } from 'recompose';

export default compose(
  withTheme,
  withStyles(styles),
)(Modal);
```

**生の関数チェーン：**

```js
export default withTheme(withStyles(styles)(Modal));
```

## どうやって DOM 要素にアクセスできますか？

コンポーネントを[`RootRef`](/api/root-ref/)ヘルパーで Wrap します。

## 私が見ている色とこのサイトで見ている色が違うのはなぜですか？

ドキュメントサイトはカスタムテーマを使用しています。 したがって、カラーパレットがある Material-UI が提供しているデフォルトのテーマは異なります。 テーマのカスタマイズについて学ぶには、この[ページ](/customization/themes/)を参照してください。

## Material-UI は最高です。 プロジェクトを支援するにはどのようにできますか？

Material-UI をサポートする方法はたくさんあります。

- [ドキュメント](https://github.com/mui-org/material-ui/tree/next/docs)を改善する
- 他の人が始めるのを手伝う
- [ライブラリを布教する](https://twitter.com/MaterialUI)
- [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui)や[Spectrum](https://spectrum.chat/material-ui)で質問に答える

商用プロジェクトで Material-UI を使用していて、スポンサーになることによってその継続的な開発を支援したい場合は、 あるいはサブや趣味のプロジェクトで**スポンサー**になりたい場合は、[OpenCollective](https://opencollective.com/material-ui)を使って行うことができます。

集められた資金はすべて透過的に管理され、スポンサーは README と Material-UI のホームページで表彰されます。
