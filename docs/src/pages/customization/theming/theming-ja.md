# テーマ

<p class="description">あなたが作成したテーマでMaterial-UIをカスタマイズしてください。 色や文字のスタイルなどを変更できます。</p>

テーマはコンポーネントの色、表面の暗さ、影のレベル、インク要素の透明度等を指定します。

テーマを使用することで、アプリに一貫したトーンを適用できます。あなたのビジネスやブランドのニーズに合うようにデザインをカスタマイズすることができます。

アプリ間で一貫性を高めるために、ライトテーマとダークテーマを選択できます。 デフォルトでは、ライトテーマを使用する仕様になっています。

## テーマプロバイダー

テーマをカスタマイズする場合は、`ThemeProvider`コンポーネントを使用して、アプリケーションにテーマを挿入する必要があります。 ただし、これはオプションです。 Material-UIコンポーネントにはデフォルトのテーマが付属しています。

`ThemeProvider`はReactのコンテキスト機能に依存して, テーマをコンポーネントに渡します。 そのため、`ThemeProvider`が、カスタマイズしようとしているコンポーネントの親であることを確認する必要があります。 詳細については、[ APIセクション](/styles/api/#themeprovider) をご覧ください。

## テーマ構成変数(Theme configuration variables)

テーマの構成変数を変更することは、Material-UIをニーズに合わせる最も効果的な方法です。 以下のセクションでは、最も重要なテーマ変数について説明します。

- [パレット](/customization/palette/)
- [タイポグラフィ](/customization/typography/)
- [間隔](/customization/spacing/)
- [ブレークポイント](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [グローバル](/customization/globals/)

[既定のテーマセクション](/customization/default-theme/)をチェックアウトすると、既定のテーマをすべて表示できます。

### カスタム変数

Material-UIのテーマを、[styling solution](/styles/basics/)また[any others](/guides/interoperability/#themeprovider)と一緒に使用する場合。 テーマに変数を追加すると、どこでも使用できるので便利です。 例えば：

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## コンポーネント内のテーマへのアクセス

Reactコンポーネント内のテーマ変数に[アクセスできます](/styles/advanced/#accessing-the-theme-in-a-component) 。

## テーマのネスト

複数のテーマプロバイダーを[ネストできます](/styles/advanced/#theme-nesting)。

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

内部テーマは外側のテーマを**オーバーライドします**。 関数を提供することにより、外側のテーマを拡張できます。

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### パフォーマンスに関する注意

`ThemeProvider`コンポーネントをネストすることによるパフォーマンスへの影響は、JSSの背後で行われる作業に関連しています。 理解すべき主な点は、挿入されたCSSが次のタプル`（styles、theme）`でキャッシュされることです 。

- `theme`: レンダリングのたびに新しいテーマを指定すると、新しいCSSオブジェクトが計算されて注入されます。 UIの一貫性とパフォーマンスの両方のために、限られた数のテーマオブジェクトをレンダリングすることをお勧めします。
- `styles` ：スタイルオブジェクトが大きいほど、より多くの作業が必要になります。

## API

### `createMuiTheme(options) => theme`

受け取ったオプションに基づいてテーマを生成します。

#### 引数

1. `options` (*Object*): 不完全なテーマオブジェクトを取得し、不足している部分を追加します。

#### 戻り値

`theme` (*Object*): すぐに使用できる完全なテーマオブジェクト。

#### 例

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

受け取ったオプションに基づいて、 レスポンシブなtypographyを生成します。

#### 引数

1. `theme` (*Object*): 強化するテーマオブジェクト。
2. `オプション` (*オプジェクト* [任意]):

- `breakpoints` (*Array<string>* [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/customization/breakpoints/) (identifiers).
- `disableAlign` (*Boolean* [optional]): Default to `false`. フォントサイズがわずかに変化して線が表示されるかどうか 高さは保持され、Material Designの4pxライン高さグリッドに位置合わせされます。 これには、テーマのスタイルで単位なしの行の高さが必要です。
- `factor` (*Number* [optional]): Default to `2`. この値は、フォントサイズのサイズ変更の強度を決定します。 値が大きいほど、小さな画面のフォントサイズの差は小さくなります。 値が小さいほど、小さい画面のフォントサイズが大きくなります。 値は1より大きくなければなりません。
- `variants` (*Array<string>* [optional]): Default to all. 処理するタイポグラフィバリアント。

#### 戻り値

`theme` (*Object*): レスポンシブなタイポグラフィを備えた新しいテーマ。

#### 例

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```