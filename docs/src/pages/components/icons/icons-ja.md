---
title: Icon コンポーネント
components: Icon, SvgIcon
githubLabel: 'components: SvgIcon'
materialDesign: https://material.io/design/iconography/system-icons.html
---

# Icons

<p class="description">Material-UIでアイコンを使用するためのガイダンスと提案です。</p>

Material-UIはアイコンについて、3種類の提供方法をサポートします。

1. 標準の [Material Design icons](#material-icons)を、Ractコンポーネント(SVGアイコン)として、エクスポートする方法
1. ReactラッパーのカスタムSVGアイコンとして、[SVGアイコン](#svgicon) コンポーネントを利用する方法
1. Reactラッパーのカスタムフォントアイコンとして、[アイコン](#icon-font-icons)  コンポーネントを利用する方法

## マテリアルアイコン（Material Icons）

Material Design has standardized over 1,100 official icons, each in five different "themes" (see below). For each SVG icon, we export the respective React component from the @material-ui/icons package. [これらのアイコンの一覧を検索](/components/material-icons/)することが出来ます。

### インストール

次を使用して、プロジェクトディレクトリにパッケージをインストールします。

```sh
// with npm
npm install @material-ui/icons

// with yarn
yarn add @material-ui/icons
```

These components use the Material-UI `SvgIcon` component to render the SVG path for each icon, and so have a peer-dependency on `@materialui/core`.

If you aren't already using Material-UI in your project, you can add it with:

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

The safest for bundle size is Option 1, but some developers prefer Option 2. Make sure you follow the [minimizing bundle size guide](/guides/minimizing-bundle-size/#option-2) before using the second approach.

Each Material icon also has a "theme": Filled (default), Outlined, Rounded, Two-tone, and Sharp. To import the icon component with a theme other than the default, append the theme name to the icon name. For example `@material-ui/icons/Delete` icon with:

- Filled theme (default) is exported as `@material-ui/icons/Delete`,
- Outlined theme is exported as `@material-ui/icons/DeleteOutlined`,
- Rounded theme is exported as `@material-ui/icons/DeleteRounded`,
- Twotone theme is exported as `@material-ui/icons/DeleteTwoTone`,
- Sharp theme is exported as `@material-ui/icons/DeleteSharp`.

> Note: The Material Design specification names the icons using "snake_case" naming (for example `delete_forever`, `add_a_photo`), while `@material-ui/icons` exports the respective icons using "PascalCase" naming (for example `DeleteForever`, `AddAPhoto`). There are three exceptions to this naming rule: `3d_rotation` exported as `ThreeDRotation`, `4k` exported as `FourK`, and `360` exported as `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

### テスト

For testing purposes, each icon exposed from `@material-ui/icons` has a `data-testid` attribute with the name of the icon. 例えば：

```jsx
import DeleteIcon from '@material-ui/icons/Delete';
```

has the following attribute once mounted:

```html
<svg data-testid="DeleteIcon"></svg>
```

## SvgIcon

If you need a custom SVG icon (not available in the [Material Icons](/components/material-icons/)) you can use the `SvgIcon` wrapper. This component extends the native `<svg>` element:

- It comes with built-in accessibility.
- SVG elements should be scaled for a 24x24px viewport so that the resulting icon can be used as is, or included as a child for other Material-UI components that use icons. (This can be customized with the `viewBox` attribute).
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

It's also possible to use it with "url-loader" or "file-loader". This is the approach used by Create React App.

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

### createSvgIcon

The `createSvgIcon` utility component is used to create the [Material icons](#material-icons). It can be used to wrap an SVG path with an SvgIcon component.

```jsx
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);
```

{{"demo": "pages/components/icons/CreateSvgIcon.js"}}

### Font Awesome

If you find that there are layout issues when using FontAwesomeIcon from `@fortawesome/react-fontawesome`, you can try passing the Font Awesome SVG data directly to SvgIcon.

[Font Awesome](https://fontawesome.com/icons) は、 `Icon` コンポーネントとともに、次のように使用することができます。

{{"demo": "pages/components/icons/FontAwesomeSvgIconDemo.js"}}

FontAwesomeIcon's `fullWidth` prop can also be used to approximate the correct dimensions, but it isn't perfect.

### ライブラリ

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) provides over 2,000 icons. For the wanted icon, copy the SVG `path` they provide, and use it as the child of the `SvgIcon` component, or with `createSvgIcon()`.

Note: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) has already wrapped each of these SVG icons with the `SvgIcon` component, so you don't have to do it yourself.

## Icon (Font icons)

`Icon` will set the correct class name for the Material icon font. As a prerequisite, you must include one, such as the [Material icon font](https://google.github.io/material-design-icons/#icon-font-for-the-web) in your project. アイコンを使用するには、単純にアイコン名（フォントの合字）を `Icon` コンポーネントでラップします。例えば：

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

デフォルトでは、アイコンは現在のテキストの色を継承します。 デフォルトでは、アイコンは現在のテキストの色を継承します。 デフォルトでは、アイコンは現在のテキストの色を継承します。 必要に応じて、テーマの色特性のいずれかを使用して、アイコンの色を設定することができます。： `primary`, `secondary`, `action`, `error` & `disabled`. デフォルトでは、アイコンは現在のテキストの色を継承します。 デフォルトでは、アイコンは現在のテキストの色を継承します。 必要に応じて、テーマの色特性のいずれかを使用して、アイコンの色を設定することができます。： `primary`, `secondary`, `action`, `error` & `disabled`.

### Font Material icons

`Icon` will by default set the correct base class name for the Material Icons font (filled variant). All you need to do is load the font, for instance, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

{{"demo": "pages/components/icons/Icons.js"}}

### Custom font

For other fonts, you can customize the baseline class name using the `baseClassName` prop. For instance, you can display two-tone icons with Material Design:

```jsx
import Icon from '@material-ui/core/Icon';

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Material+Icons+Two+Tone"
  // Import the two tones MD variant                           ^^^^^^^^
/>;
```

{{"demo": "pages/components/icons/TwoToneIcons.js"}}

#### Global base class name

Modifying the `baseClassName` prop for each component usage is repetitive. You can change the default prop globally with the theme

```js
const theme = createTheme({
  components: {
    MuiIcon: {
      defaultProps: {
        // Replace the `material-icons` default value.
        baseClassName: 'material-icons-two-tone',
      },
    },
  },
});
```

Then, you can use the two-tone font directly:

```jsx
<Icon>add_circle</Icon>
```

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) can be used with the `Icon` component as follows:

{{"demo": "pages/components/icons/FontAwesomeIcon.js"}}

Note that the Font Awesome icons weren't designed like the Material Design icons (compare the two previous demos). The fa icons are cropped to use all the space available. You can adjust for this with a global override:

```js
const theme = createTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: 'content-box',
          padding: 3,
          fontSize: '1.125rem',
        },
      },
    },
  },
});
```

{{"demo": "pages/components/icons/FontAwesomeIconSize.js"}}

## Font vs SVG どのアプローチを使用しますか？ どのアプローチを使用しますか？ どのアプローチを使用しますか？ どのアプローチを使用しますか？

Both approaches work fine, however there are some subtle differences, especially in terms of performance and rendering quality. Whenever possible SVG is preferred as it allows code splitting, supports more icons, and renders faster and better.

For more details, take a look at [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## アクセシビリティ

Icons can convey all sorts of meaningful information, so it's important to ensure they are accessible where appropriate. There are two use cases you'll want to consider:

- **Decorative icons** that are only being used for visual or branding reinforcement. それらがページから削除された場合でも、ユーザーはあなたのページを理解して使用することができます。
- **Semantic icons** are ones that you're using to convey meaning, rather than just pure decoration. This includes icons without text next to them that are used as interactive controls — buttons, form elements, toggles, etc.

### Decorative icons

If your icons are purely decorative, you're already done! 他のフォントの場合、Iconコンポーネントの `className` プロパティを使用して クラス名を指定する必要があります。

### Semantic icons

#### Semantic SVG icons

You should include the `titleAccess` prop with a meaningful value. The `role="img"` attribute and the `<title>` element are added so that your icons are correctly accessible.

In the case of focusable interactive elements, for example when used with an icon button, you can use the `aria-label` prop:

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

#### Semantic font icons

You need to provide a text alternative that is only visible to assistive technologies.

```jsx
import Icon from '@material-ui/core/Icon';
import { visuallyHidden } from '@material-ui/utils';
import { makeStyles } from '@material-ui/core/styles';

const classes = makeStyles({ visuallyHidden })();

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Create a user</Typography>
```

#### リファレンス

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
