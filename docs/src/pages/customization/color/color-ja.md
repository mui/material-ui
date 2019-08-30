# カラー

<p class="description">色で意味を伝えます。 最初からMaterial Design仕様のすべての色にアクセスできます。</p>

Material Design[color system](https://material.io/design/color/)を使用すると、自分のブランドやスタイルを反映した色のテーマを作成できます。

## カラーシステム (Color system)

### 重要な用語

#### "パレット"

パレットは色のコレクション、つまり色相とその色合いです。 Material-UIは、Material Designガイドラインのすべてのカラーを提供します。 [このカラーパレット](#color-palette)は、互いに調和する色でデザインされています。

#### "色相" & "シェード"

パレット内の単色は、「赤」などの色相と「500」などのシェードで構成されます。 "red 50" は赤(*pink!*) の最も明るいシェードで、"red 900"は最も暗いシェードです。 また、ほとんどの色相には、先頭に`A`を持つ「アクセント」シェードが使用されます。

### 例

Material Design　カラーパレットは、イラストやブランドカラーの作成に使用できる原色とアクセント色で構成されています。 それらは互いに調和するように設計されています。

たとえば、次のように補足的な原色とアクセント色(例:'red 500'&'purple A200') を参照できます。

```js
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #F44336
const accent = purple['A200']; // #E040FB
const accent = purple.A200; // #E040FB (alternative method)
```

### カラー・パレット

* HUEが与えられた場合* （赤、ピンクなど）および* SHADE * （500、600など）次のように色をインポートできます。

```jsx
import HUE from '@material-ui/core/colors/HUE';

const color = HUE[SHADE];
```

{{"demo": "pages/customization/color/Color.js", "hideHeader": true}}

## Color tool

[ material.io/design/colorをテストするには](https://material.io/design/color/) Material-UIのドキュメントの配色では、以下のパレットとスライダーを使用してカラーを選択するだけです。 または、プライマリおよびセカンダリテキストフィールドに16進値を入力できます。

{{"demo": "pages/customization/color/ColorTool.js", "hideHeader": true}}

カラーサンプルに示されている出力は、[`createMuiTheme()`](/customization/theming/#createmuitheme-options-theme)関数([`MuiThemeProvider`](/customization/theming/#theme-provider)で使用される) に直接貼り付けることができます。

```jsx
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: '#f44336',
    },
  },
});
```

他の色は [Theme customization](/customization/palette/)セクションで説明されているように`createMuiTheme()`によって計算されるので、`main`シェーディングのみを提供する必要があります(`light`、`dark`、`contrastText`をさらにカスタマイズする場合を除きます)。

デフォルトの一次または二次シェード、あるいはその両方を使用している場合にカラーオブジェクトを指定すると、`createMuiTheme()`はメイン、ライト、およびダークにマテリアルカラーからの適切なシェードを使用します。

### 公式カラーツール

Material Designチームは素晴らしいパレット設定ツール、[materialio/tools/color](https://material.io/tools/color/)も開発しました。 これにより、UIのカラーパレットを作成したり、任意のカラー組み合わせのアクセシビリティレベルを測定したりできます。

<a href="https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336">
  <img src="/static/images/color/colorTool.png" alt="公式カラーツール" style="width: 574px" />
</a>

出力は、`createMuiTheme()`関数に渡すことができます。

```jsx
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
```

### コミュニティによるツール

- [create-mui-theme](https://react-theming.github.io/create-mui-theme/)はMaterial Design Color Toolを使用してMaterial-UIテーマを作成するためのオンラインツールです。
- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/)は、カラーを選択してライブプレビューを表示するだけで、Material-UIアプリケーションのテーマを生成するツールです。
- [マテリアルパレットジェネレータ](https://material.io/inline-tools/color/)　: マテリアルパレットジェネレータを使用して、入力した任意のカラーのパレットを生成できます。