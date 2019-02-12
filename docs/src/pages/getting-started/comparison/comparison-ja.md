# 他のライブラリとの比較

<p class="description">Material-UIがあなたの抱える問題をよりよく解決できるかどうかを知りたいはずです。 これらはここにいるあなたに答えたいことです。</p>

これはガイドの中でも間違いなく書くのが難しいページの1つですが、重要なことだと感じています。 思うに、あなたは抱えている問題を解決しようとして別のライブラリを使ったことがあります。

JavaScriptの世界は急速に変わっていきます、このドキュメントを最新の状態に保てるようにご協力をお願いします。 もし正しくないと思われる記述に気づいた場合は、[issueを開いて](https://github.com/mui-org/material-ui/issues/new?title=[docs]+Inaccuracy+in+comparison+guide)私たちにお知らせください。

以下のライブラリについて記述しています。

- [Material-UI](#material-ui)
- [Material Design Lite (MDL)](#material-design-lite-mdl)
- [Material Components Web (MDC-web)](#material-components-web-mdc-web)
- [Materialize](#materialize)
- [React Toolbox](#react-toolbox)

## Material-UI

![Stars](https://img.shields.io/github/stars/mui-org/material-ui.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/@material-ui/core.svg)

バイアスがかかることを避けたいと思いますが、コアチームとしては明らかにMaterial-UIがとても好きです。❤️ 他の何よりもよく解決できると考えているいくつかの問題があります。そう信じていなければ、私たちは取り組んでいません。 

しかし、私たちは公平で正確であることを望んでいるので、他のライブラリが大きな利点として上げていることについて、記述しようとします。

## Material Design Lite (MDL)

![Stars](https://img.shields.io/github/stars/google/material-design-lite.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/material-design-lite.svg)

Material Design Liteは、非常によく考え抜かれたMaterial Designの実装で、 主にGoogleの開発者関係によってメンテナンスされてきました。 今日、**このプロジェクトはもはやメンテナンスされていません**。 何が起こったのでしょうか。

Material Components Webの開発チームはMDL v2としてMDC-webの開発を始めました、しかし、数ヶ月のためにそれに協力した後、両チームは、Material Designの開発チームの下でプロジェクトを進めることが最善だと感じました。 この移行は、再方向の目的が単にWebサイトに「Material Designのルックアンドフィールの追加」から離れ、Webプラットフォーム全体の為の正しい実装の目的に向かっていくことを意味します。

## Material Components Web (MDC-web)

![Stars](https://img.shields.io/github/stars/material-components/material-components-web.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/material-components-web.svg)

このプロジェクトがGoogleとそのデザインチームにサポートされていることを嬉しく思います。 彼らがサポートし続けてくれている限り、それはMaterial Designの仕様に準拠しているという明確な証明になります。

### フレームワークとライブラリ

Material-UIはReactライブラリに注力してサポートをしてはいますが、私達は同等のAPIを持つ、Preactもすぐにサポートしたいと考えています。 1つのフレームワークにサポートを注力することは作業量を減らすことができ、効果的です。

これにはさまざまなメリットがあります

- 制約が少ないので、対象のフレームワークに固有のトレードオフを作成できます。 考慮する局所的な問題は少なくなります。
- Reactのユースケースの課題解決にもっと時間をかけることができます。

MDC-webは、サードパーティのJSフレームワークおよびライブラリと完全に互換性があるようにゼロから設計されました。 彼らは、githubの[README](https://github.com/material-components/material-components-web/#material-components-for-the-web)にサードパーティーのフレームワーク統合プロジェクトをリストしています。

### スタイルの解決

[ Material-UIはスタイルを重視してきました](https://github.com/oliviertassinari/a-journey-toward-better-style) 。 私たちの最初期のリリースは、LESSを使用していますが、この解決方法では限界が見えていたので、我々はすぐに代替案を検討して始めました。 最初の移行は、inline-styleで解決することでした。 これは有望でした：

- それは私達が私達のユーザーのためのLESSツールチェーンへの依存を取り除くことを可能にしました。 私達は取付けプロセスの1つの重要な摩擦を取り除きました。 （**シンプルに** ）
- 実行時にテーマを変更したり、さまざまなテーマをネストしたり、動的なスタイルを設定したりすることができました。 （**よりパワフルに** ）
- コード分割を可能にするために、大きなモノリシックCSSファイルを分割することでロード時間を短縮しました。 （**より速く** ）
- CSSの特定性の問題から解放されたので、スタイルのオーバーライドの方式はより直感的になりました。 （**シンプルに** ）

やがて、私たちはinline-styleの限界に達し、CSS-in-JSでの解決へと移行しました。 This transition was made without losing the enhancements the first migration introduced ** CSS-in-JSはWebプラットフォームの未来だと強く思います** 。 ドキュメントで私たちの[新しいスタイリングソリューションについてもっと学ぶことができます](/customization/css-in-js/)。

MDC-webはBootstrap v4としてSCSSに依存しています。 SCSSアーキテクチャーは、LESSにかなり近いものです。（私たちが限界だと感じて置き換えた技術です。）

### ビジョン

私たちのビジョンは、** Material Designのガイドライン**をエレガントに実装することです。

> Material Designのガイドラインは信じられない出発点ですが、アプリケーションのすべての側面やニーズに関するガイダンスを提供するわけではありません。 ガイドライン特有の実装に加えて、Material-UIは、すべてMaterial Designガイドラインの準拠した基で、アプリケーション開発に一般的に役立つものになることを望んでいます。
> 
> *[ドキュメントの[ビジョンセクション](/discover-more/vision/)から抜粋したもの]*

私たちは、企業がユーザーに素晴らしいUIをMaterial-UIを利用しながらも自分たちのブランドに合わせてリリースして成功するところを見てみたいと思っています。私たちはMaterial-UIのカスタマイズ機能に多くを投資しています。

MDC-Webの唯一の目的は、Webプラットフォーム用のMaterial Design実装です。 **それ以上、それ以下でもありません** 。 彼らは、マテリアルデザインのコアな部分を壊すことを犠牲にして追加の柔軟性を促進するであろうコンポーネントへの変更、特にUXの変更を行うことは考えていません、それはプロジェクトの目標ではないからです。 *[ソース](https://github.com/mui-org/material-ui/issues/6799#issuecomment-299925174)*

### テスト

どちらのプロジェクトもテストに多額の投資をしています。 これを書いている時点では、どちらのプロジェクトも99％以上のテストカバレッジを持っています。

- Material-UIは、Chrome 49、Firefox 45、Safari 10、およびEdge 14で1200以上の単体テストを実行しています。
- MDC-webは、すべての主要ブラウザで1200以上のユニットテストを実行しています。

それでも、Material-UIを際立たせることが1つあり、それが重要です。 Material-UIには[何百もの視覚的回帰テスト](https://www.argos-ci.com/mui-org/material-ui)があります、対してMDC-webには何もありません。 視覚的回帰テストでは、トレードオフをする必要はありません。

- 全てのコントリビューションが予想外のデグレを招く時間を短縮することができます。 1回のコントリビューションに費やす時間が**少なければ少ない**ほど、受け入れることができるコントリビューションは**より多く**なります。
- あなたは多くの労力をかけることなく新しいコントリビューションを享受することができます。 事実上、あなたはユーザーがデグレを報告するのを待つ必要がありません。 それは**効率的**で、**ライブラリの品質を向上させます** 。

## Materialize

![Stars](https://img.shields.io/github/stars/Dogfalo/materialize.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/materialize-css.svg)

### ブラウザサポート

Materialiseは、Material-UIよりも幅広いブラウザをサポートしています。例えば、[Material-UIはIE 11のみをサポート](/getting-started/supported-platforms/)していますが、MaterialiseはIE 10をサポートしています。 IE 11のみをサポートすることで、flexboxのレイアウトを最大限に活用できます。 IE 10にはflexboxに関する多くの問題があります。

### スタイルの解決

MaterialiseはSCSSを使用しています。これは2年前からMaterial-UIのスタイルアーキテクチャを廃止したものです。 その理由を上記の[MDC-webセクションで説明しています](#styling-solution)。

## React Toolbox

![Stars](https://img.shields.io/github/stars/react-toolbox/react-toolbox.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/react-toolbox.svg)

### スタイルの解決

React ToolboxとMaterial-UIの両方がCSS-in-JSに賭けていますが、私たちは異なるトレードオフを取りました。 React Toolboxが**styled-components**でライブラリを書き換え始めたのに対し、Material-UIは**JSS**を選択しました。 次の理由から、styled-components よりもJSSを選択しました。

- JSSは低レベルのAPIを公開します 
  - 私たちは独自のニーズに合わせて自由にそれをモデル化することができます
  - `styled-components`のようにReactと結合されていません。 サードパーティのJSフレームワークやライブラリに統合する可能性があります。 SCSSを使用して並列化することができます。 SCSSは、あらゆるJavaScriptフレームワークやライブラリと互換性があり、コミュニティの注目を集めるのに役立ちます
- JSSはstyled-componentsよりもコンポーネントのマウント速度が[2倍速く](https://github.com/A-gambit/CSS-IN-JS-Benchmarks/blob/master/RESULT.md)、すべての最適化がオンになっています。

これは、Material-UIがユーザが自分のスタイルをどのように書くかについて意見を述べたということではありません。 あなたがそうしたいのならstyled-componentsを使うことができます。