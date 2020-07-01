---
title: Icon コンポーネント
components: Icon, SvgIcon
---

# Icons

<p class="description">Material-UIでアイコンを使用するためのガイダンスと提案です。</p>

Material-UI provides icons support in three ways:

1. Standardized [Material Design icons](#material-icons) exported as React components (SVG icons).
1. With the [SvgIcon](#svgicon) component, a React wrapper for custom SVG icons.
1. With the [Icon](#icon-font-icons) component, a React wrapper for custom font icons.

## マテリアルアイコン（Material Icons）

Material Design has standardized over 1,100 official icons, each in five different "themes" (see below). For each SVG icon, we export the respective React component from the @material-ui/icons package. You can [search the full list of these icons](/components/material-icons/).

### インストール

次を使用して、プロジェクトディレクトリにパッケージをインストールします。

```sh
// with npm
npm install @material-ui/icons

// with yarn
yarn add @material-ui/icons
```

These components use the Material-UI SvgIcon component to render the SVG path for each icon, and so they have a peer-dependency on the next release of Material-UI.

If you are not already using Material-UI in your project, you can add it with:

```sh
// npmの場合
npm install @material-ui/core

// yarnの場合
yarn add @material-ui/core
```

### 使い方

Import icons using one of these two options:

- Option 1:

  ```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- Option 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

The safest is Option 1 but Option 2 can yield the best developer experience. Make sure you follow the [minimizing bundle size guide](/guides/minimizing-bundle-size/#option-2) before using the second approach. The configuration of a Babel plugin is encouraged.

Each icon also has a "theme": Filled (default), Outlined, Rounded, Two tone and Sharp. If you want to import the icon component with a theme other than default, append the theme name to the icon name. For example `@material-ui/icons/Delete` icon with:

- Filled theme (default) is exported as `@material-ui/icons/Delete`,
- Outlined theme is exported as `@material-ui/icons/DeleteOutlined`,
- Rounded theme is exported as `@material-ui/icons/DeleteRounded`,
- Twotone theme is exported as `@material-ui/icons/DeleteTwoTone`,
- Sharp theme is exported as `@material-ui/icons/DeleteSharp`.

> Note: The Material Design specification names the icons using "snake_case" naming (for example `delete_forever`, `add_a_photo`), while `@material-ui/icons` exports the respective icons using "PascalCase" naming (for example `DeleteForever`, `AddAPhoto`). There are three exceptions to this naming rule: `3d_rotation` exported as `ThreeDRotation`, `4k` exported as `FourK`, and `360` exported as `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

## SvgIcon

If you need a custom SVG icon (not available in the Material Icons [default set](/components/material-icons/)) you can use the `SvgIcon` wrapper. This component extends the native `<svg>` element:

- It comes with built-in accessibility.
- SVG elements should be scaled for a 24x24px viewport, so the resulting icon can be used as is, or included as a child for other Material-UI components that use icons. (This can be customized with the `viewBox` attribute).
- By default, the component inherits the current color. Optionally, you can apply one of the theme colors using the `color` prop.

```jsx
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
```

### カラー

{{"demo": "pages/components/icons/SvgIconsColor.js"}}

### Size

{{"demo": "pages/components/icons/SvgIconsSize.js"}}

### Component prop

You can use the `SvgIcon` wrapper even if your icons are saved in the `.svg` format. [svgr](https://github.com/smooth-code/svgr) has loaders to import SVG files and use them as React components. For example, with webpack:

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}

// ---
import StarIcon from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

It's also possible to use it with "url-loader" or "file-loader". It's the approach used by Create React App.

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack', 'url-loader'],
}

// ---
import { ReactComponent as StarIcon } from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

### ライブラリ

#### Material Design (recommended)

Material Design has standardized over [1,100 official icons](#material-icons).

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) provides over 2,000 icons. For the wanted icon, copy the SVG `path` they provide, and use it as the child of the `SvgIcon` component.

Note: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) has already wrapped each of these SVG icons with the `SvgIcon` component, so you don't have to do it yourself.

## Icon (Font icons)

`Icon` will set the correct class name for the Material icon font. 他のフォントの場合、Iconコンポーネントの `className` プロパティを使用して クラス名を指定する必要があります。

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` will set the correct class name for the Material icon font. 他のフォントの場合、Iconコンポーネントの `className` プロパティを使用して クラス名を指定する必要があります。

アイコンを使用するには、単純にアイコン名（フォントの合字）を `Icon` コンポーネントでラップします。例えば：

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

デフォルトでは、アイコンは現在のテキストの色を継承します。 デフォルトでは、アイコンは現在のテキストの色を継承します。 必要に応じて、テーマの色特性のいずれかを使用して、アイコンの色を設定することができます。： `primary`, `secondary`, `action`, `error` & `disabled`.

### Font Material icons

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) は、 `Icon` コンポーネントとともに、次のように使用することができます。

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Font vs SVG どのアプローチを使用しますか？

どちらの方法でも問題なく動作しますが、特にパフォーマンスとレンダリング品質の点で、わずかな違いがいくつかあります。 どちらの方法でも問題なく動作しますが、特にパフォーマンスとレンダリング品質の点で、わずかな違いがいくつかあります。 コード分割を可能にし、より多くのアイコンをサポートし、より速くより良くレンダリングするので、可能な限りSVGが優先されます。

詳しくは、[why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/)をご覧ください。

## アクセシビリティ

アイコンはあらゆる種類の意味のある情報を伝えることができるので、可能な限り多くの人に届くことが重要です。 次の2つの使用例を検討してください。
- **セマンティックアイコン** は、単なる装飾ではなく、意味を伝えるために使用しているものです。 これには、ボタン、フォーム要素、トグルなど、インタラクティブコントロールとして使用されるテキストのないアイコンが含まれます。 それらがページから削除された場合でも、ユーザーはあなたのページを理解して使用することができます。
- **セマンティックアイコン** は、単なる装飾ではなく、意味を伝えるために使用しているものです。 これには、ボタン、フォーム要素、トグルなど、インタラクティブコントロールとして使用されるテキストのないアイコンが含まれます。 これには、ボタン、フォーム要素、トグルなど、インタラクティブコントロールとして使用されるテキストのないアイコンが含まれます。

### Decorative SVG Icons

`Icon` will set the correct class name for the Material icon font. 他のフォントの場合、Iconコンポーネントの `className` プロパティを使用して クラス名を指定する必要があります。

### Semantic SVG Icons

import Icon from '@material-ui/core/Icon'; import Typography from '@material-ui/core/Typography'; // ...
&lt;Icon&gt;add_circle&lt;/Icon&gt;
&lt;Typography variant="srOnly"&gt;Create a user&lt;/Typography&gt;

アイコンボタンと一緒に使用したときのようにフォーカス可能なインタラクティブ要素の場合は、 `aria-label` プロパティを使用できます。

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...
```

### Decorative Font Icons

`Icon` will set the correct class name for the Material icon font. 他のフォントの場合、Iconコンポーネントの `className` プロパティを使用して クラス名を指定する必要があります。

### Semantic Font Icons

アイコンに意味的な意味がある場合は、支援技術にしか見えない代替テキストを提供する必要があります。

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...
```

### リファレンス

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
