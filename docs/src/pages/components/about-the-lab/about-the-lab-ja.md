# About the lab

<p class="description">このパッケージは、まだコアに移動する準備ができていないインキュベーター・コンポーネントをホストします。</p>

Labパッケージとcoreパッケージの明確な違いはどのようにバージョン管理されるかです。 Coreパッケージは[slower-moving policy](https://material-ui.com/versions/#release-frequency). Labパッケージとcoreパッケージの明確な違いはどのようにバージョン管理されるかです。 Coreパッケージは[slower-moving policy](https://material-ui.com/versions/#release-frequency).

開発者としてlabパッケージのコンポーネントをテスト/使用し、不具合や、使いにくさ、デザインなどについて報告する事ができます。そうする事によってLab パッケージのコンポーネントをより良くする事ができます。 みなさんが使ってくれれば使ってくれるほど、将来的に起きうる重大な問題を早期に発見・改善する事ができます。

Coreパッケージに移るためには以下の基準を考慮します。

- **使用されている**必要があります。 **使用されている**必要があります。 The Material-UI team uses Google Analytics stats among other metrics to evaluate the usage of each component. 実験的なコンポーネントで使用率が低いものは、動作が不完全であるか需要がないかのどちらかを意味します。
- Coreコンポーネントと同**品質**である必要が あります。 Coreパッケージに含まれるほど完璧である必要はないが、開発者が頼れる信頼性はひつようです。
  - 各コンポーネントが**型定義**を持つこと。 現在、Labパッケージへの採用基準に型はひつようないですが、Coreパッケージに移すためには必要です。
  - 十分な**テスト網羅度**がひつようです。 Labコンポーネントのいくつかは十分なテストコードが現在ありません。
- ユーザーが最新のメジャーバージョンにアップデートするほどの**影響力**として使えるか? コミュニティが分断されないほど、良い。
- 短/中期的に**破壊的変更**が起きる可能性が少ないことが必要。 たとえば、新しい機能を追加するのに破壊的変更が必要な可能性があれば、そのコンポーネントのCoreへの移動は遅らせた方がよい。

## インストール

次を使用して、プロジェクトディレクトリにパッケージをインストールします。

```sh
// with npm
npm install @material-ui/lab

// with yarn
yarn add @material-ui/lab
```

このラボには、コアコンポーネントへのピア依存関係があります。 プロジェクトでまだMaterial-UIを使用していない場合は、次のコマンドでインストールできます。

```sh
// npmの場合
npm install @material-ui/core

// yarnの場合
yarn add @material-ui/core
```

## TypeScript

[CSS overrides](/customization/globals/#css)と[default prop customization](/customization/globals/#default-props)の恩恵を受けるために、TypeScriptユーザーは以下の型をインポートする必要があります  内部的には、[module augmentation](/guides/typescript/#customization-of-theme)を使って、デフォルトのテーマ構造をLabで利用可能なコンポーネントに拡張します

```tsx
import '@material-ui/lab/themeAugmentation';

const theme = createMuiTheme({
  components: {
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
});
```
