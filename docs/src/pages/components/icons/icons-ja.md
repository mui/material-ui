---
title: Icon コンポーネント
components: Icon, SvgIcon
---

# Icons

<p class="description">Material-UIでアイコンを使用するためのガイダンスと提案です。</p>

[system icon](https://material.io/design/iconography/system-icons.html) またはUI icon、コマンド、ファイル、デバイス、またはディレクトリを表示できます。 System iconsは、ゴミ箱、印刷、保存などの一般的な操作を表すためにも使用され、 はアプリケーションバー、ツールバー、ボタン、リストによく見られます。 これらはグーグルのガイドラインに従う [Material icons](https://material.io/tools/icons/?style=baseline) が提供しています。

Material-UIは、System iconsをレンダリングするための2つのコンポーネントを提供します： SVG pathをレンダリングするための` SvgIcon` 、およびSystem iconsをレンダリングするための `Icon`があります。

## SVG Icons

`SvgIcon` コンポーネントは、その子としてSVG `path` 要素を受け取り、それをパスを表示するReactコンポーネントに変換します。また、アイコンのスタイルを設定し、マウスイベントに応答できるようにします。 SVG要素は24x24pxのビューポートに合わせて拡大縮小する必要があります。

結果のアイコンはそのまま使用することも、アイコンを使用する他のMaterial-UIコンポーネントの子として含めることもできます。 デフォルトでは、アイコンは現在のテキストの色を継承します。 必要に応じて、テーマの色特性のいずれかを使用して、アイコンの色を設定することができます。： `primary`, `secondary`, `action`, `error` & `disabled`.

{{"demo": "pages/components/icons/SvgIcons.js"}}

### SVG Material icons

カスタムアイコンを実装するのに必要なビルディングブロックがあるのは面白いですが、プリセットはどうでしょうか。 これは別のnpmパッケージを提供しています [ @ material-ui / icons ](https://www.npmjs.com/package/@material-ui/icons)、 これには、1,000以上の公式[材料アイコン](https://material.io/tools/icons/?style=baseline)が` SvgIcon `コンポーネントに変換されて含まれています。

<a href="https://material.io/tools/icons/?icon=3d_rotation&style=baseline">
  <img src="/static/images/icons/icons.png" alt="公式の素材アイコン" style="width: 566px" />
</a>

#### 使い方

特定のアイコンを見つけるために [material.io/tools/icons](https://material.io/tools/icons/?style=baseline) を使用できます。 アイコンをインポートするときは、アイコンの名前が `PascalCase`であることに注意してください。

- [` delete `](https://material.io/tools/icons/?icon=delete&style=baseline) は `@material-ui/icons/Delete`として公開されています。
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) は `@material-ui/icons/DeleteForever`として公開されます。

For *"themed"* icons, append the theme name to the icon name. For instance with the

- Outlined [ ` delete ` ](https://material.io/tools/icons/?icon=delete&style=outline)アイコンは`@material-ui/icons/DeleteOutlined`
- The Rounded [`delete`](https://material.io/tools/icons/?icon=delete&style=rounded)アイコンは`@material-ui/icons/DeleteRounded`
- Two Tone [`delete`](https://material.io/tools/icons/?icon=delete&style=twotone) アイコンは `@material-ui/icons/DeleteTwoTone`
- Sharp [`delete`](https://material.io/tools/icons/?icon=delete&style=sharp) アイコンは`@material-ui/icons/DeleteSharp`

この規則には例外があります。

- [`3d_rotation`](https://material.io/tools/icons/?icon=3d_rotation&style=baseline)アイコンは`@material-ui/icons/ThreeDRotation`
- [`4k`](https://material.io/tools/icons/?icon=4k&style=baseline) アイコンは`@material-ui/icons/FourK`
- [`360`](https://material.io/tools/icons/?icon=360&style=baseline) アイコンは`@material-ui/icons/ThreeSixty`

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

#### Imports

- あなたの環境がツリーシェイクをサポートしていない場合、アイコンをインポートするための **推奨される** 方法は次のとおりです。

```jsx
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

- あなたの環境がツリーシェイクをサポートしている場合は、この方法でアイコンをインポートすることもできます。

```jsx
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
```

注：この方法で名前付きエクスポートをインポートすると、アイコン</em> ごと *のコードがプロジェクトに含まれるので、 [tree-shaking](https://webpack.js.org/guides/tree-shaking/)を構成しない限りお勧めできません。 ホットモジュールリロードのパフォーマンスにも影響する可能性があります。</p> 

### 他の SVG icons

さらに多くのSVGアイコンをお探しですか？ さらにたくさんのプロジェクトがあります。[https://materialdesignicons.com](https://materialdesignicons.com/)では2,000以上の公式やコミュニティによってアイコンが提供されています。 [mdi-material-ui ](https://github.com/TeamWertarbyte/mdi-material-ui) パッケージは、これらのアイコンを、[@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons)が公式アイコンに対して行うのとほぼ同じ方法で、Material-UI SvgIconsとしてパッケージ化します。

## Font Icons

`Icon` コンポーネントは、合字をサポートする任意のアイコンフォントのアイコンを表示できます。 前提条件として、たとえば、Google Web Fontsを介して、 [Material icon font](https://google.github.io/material-design-icons/#icon-font-for-the-web) プロジェクトをプロジェクトに含める必要があります。

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` will set the correct class name for the Material icon font. For other fonts, you must supply the class name using the Icon component's `className` property.

アイコンを使用するには、単純にアイコン名（フォントの合字）を `Icon` コンポーネントでラップします。例えば：

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

デフォルトでは、アイコンは現在のテキストの色を継承します。 必要に応じて、テーマの色特性のいずれかを使用して、アイコンの色を設定することができます。： `primary`, `secondary`, `action`, `error` & `disabled`.

### Font Material icons

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) は、 `Icon` コンポーネントとともに、次のように使用することができます。

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Font vs SVG. Which approach to use?

どちらの方法でも問題なく動作しますが、特にパフォーマンスとレンダリング品質の点で、わずかな違いがいくつかあります。 コード分割を可能にし、より多くのアイコンをサポートし、より速くより良くレンダリングするので、可能な限りSVGが優先されます。

詳しくは、[why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/)をご覧ください。

## アクセシビリティ

アイコンはあらゆる種類の意味のある情報を伝えることができるので、可能な限り多くの人に届くことが重要です。 There are two use cases you’ll want to consider:

- **Decorative Icons** are only being used for visual or branding reinforcement. それらがページから削除された場合でも、ユーザーはあなたのページを理解して使用することができます。
- **Semantic Icons** are ones that you’re using to convey meaning, rather than just pure decoration. これには、ボタン、フォーム要素、トグルなど、インタラクティブコントロールとして使用されるテキストのないアイコンが含まれます。

### Decorative SVG Icons

If your icons are purely decorative, you’re already done! We add the `aria-hidden=true` attribute so that your icons are properly accessible (invisible).

### Semantic SVG Icons

あなたのアイコンが意味的な意味を持っているなら、あなたがする必要があるのは `titleAccess="meaning"` プロパティを投入することだけです。 あなたのアイコンが正しくアクセスできるように `role="img"` 属性と `<title>` 要素を追加します。

アイコンボタンと一緒に使用したときのようにフォーカス可能なインタラクティブ要素の場合は、 `aria-label` プロパティを使用できます。

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

### Decorative Font Icons

If your icons are purely decorative, you’re already done! We add the `aria-hidden=true` attribute so that your icons are properly accessible (invisible).

### Semantic Font Icons

アイコンに意味的な意味がある場合は、支援技術にしか見えない代替テキストを提供する必要があります。

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Create a user</Typography>
```

### リファレンス

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/