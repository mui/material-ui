# よくある質問と回答

<p class="description">特定の問題で立ち往生していますか？ よくある質問でこれらのよくある問題のいくつかを最初に確認してください。</p>

それでも探しているものが見つからない場合は、[gitter](https://gitter.im/mui-org/material-ui)というコミュニティに質問することができます。 使い方の質問やその他重要ではない問題は、Github issuesではなく[StackOverflow](https://stackoverflow.com/questions/tagged/material-ui)を使ってください。 `material-ui`というStackOverflowタグがあります。 質問にはそのタグをつけてください。

## productionビルドでコンポーネントが正しくレンダリングされないのはなぜですか？

これは、コードがproduction bundleに入った後にクラス名が競合するために発生する可能性があるn°1の問題です。 Material-UIが機能するためには、`className`ページ上のすべてのコンポーネントの値は、[クラス名ジェネレータ](/css-in-js/advanced/#class-names)の単一インスタンスによって生成される必要があります。

この問題を解決するには、ページ上のすべてのコンポーネントを初期化して、それらの間の**クラス名ジェネレータが1つだけ**存在するようにする必要があります。

さまざまなシナリオで、誤って2つのクラス名ジェネレータを使用することになる事例

- 誤ってMaterial-UIの2つのバージョンを**bundle**してしまっている場合、 依存関係がMaterial-UIを対の依存関係として正しく設定されていない可能性があります
- Reactツリーの**サブセット**に`StylesProvider`を使用している場合
- You are using a bundler and it is splitting code in a way that causes multiple class name generator instances to be created.

> If you are using webpack with the [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/), try configuring the [`runtimeChunk` setting under `optimizations`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk).

全体として、各Material-UIアプリケーションをコンポーネントツリーの最上部にある[`StylesProvider`](/css-in-js/api/#stylesprovider)コンポーネントでWrapし、**コンポーネントツリー間で共有される単一のクラス名ジェネレータを使用することで**、この問題を簡単に解決できます。

⚠️ If you are in a hurry, we provide an option to make the class names **deterministic** as a quick escape hatch: [`dangerouslyUseGlobalCSS`](/css-in-js/advanced/#deterministic-class-names).

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

## アプリのスタイルを設定するにはJSSを使用する必要がありますか？

強くお勧めします。

- ビルトインのため、追加のbundleサイズのオーバーヘッドはありません
- 速い & メモリ効率が良い
- 明瞭で一貫性のある[API](https://cssinjs.org/json-api/)
- ネイティブでも[プラグイン](https://cssinjs.org/plugins/)でも、多くの高度な機能をサポートします。

しかし、おそらくすでに別のスタイルライブラリを使用してアプリケーションにいくつかのMaterial-UIコンポーネントを追加している、 またはすでに別のAPIを使用している場合には、新しいものを学びたくはないでしょう？ その場合は、[スタイルライブラリの相互運用](/guides/interoperability/)セクションで、Material-UIコンポーネントを別のスタイルのライブラリでスタイル変更することがいかに簡単であるかを示します。

## inline-styleもしくはclassesどちらを使うべきですか？

経験則として、動的styleプロパティにはinline-styleのみを使用してください。 CSSの代替手段は、次のようなより多くの利点を提供します。

- auto-prefixing
- デバックのしやすさ
- メディアクエリ
- keyframes

## react-routerの使い方は？

私達は[サードパーティ製ルーティングライブラリ](/demos/buttons/#third-party-routing-library)で`ButtonBase`コンポーネントの使い方をドキュメント化しました。 私たちのインタラクティブなコンポーネントの多くはButtonBaseコンポーネントを内部的に使っています：`Button`, `MenuItem`, `<ListItem button />`, `Tab`, などなど。 それらの例を参考にしてください。

## `withStyles()`と`withTheme`HOCはどうやって結合すればいいですか？

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
  withStyles(styles)
)(Modal);
```

**生の関数チェーン：**

```js
export default withTheme(withStyles(styles)(Modal));
```

## どうやってDOM要素にアクセスできますか？

コンポーネントを[`RootRef`](/api/root-ref/)ヘルパーでWrapします。

## 私が見ている色とこのサイトで見ている色が違うのはなぜですか？

ドキュメントサイトはカスタムテーマを使用しています。 したがって、カラーパレットがあるMaterial-UIが提供しているデフォルトのテーマは異なります。 テーマのカスタマイズについて学ぶには、この[ページ](/customization/themes/)を参照してください。

## Material-UIは最高です。 プロジェクトを支援するにはどのようにできますか？

Material-UIをサポートする方法はたくさんあります。

- [ドキュメント](https://github.com/mui-org/material-ui/tree/next/docs)を改善する 
- 他の人が始めるのを手伝う
- [ライブラリを布教する](https://twitter.com/MaterialUI) 
- [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui)や[Spectrum](https://spectrum.chat/material-ui)で質問に答える

商用プロジェクトでMaterial-UIを使用していて、スポンサーになることによってその継続的な開発を支援したい場合は、 あるいはサブや趣味のプロジェクトで**スポンサー**になりたい場合は、[OpenCollective](https://opencollective.com/material-ui)を使って行うことができます。

集められた資金はすべて透過的に管理され、スポンサーはREADMEとMaterial-UIのホームページで表彰されます。