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

カスタムアイコンを実装するのに必要なビルディングブロックがあるのは面白いですが、プリセットはどうでしょうか。 [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) is an npm package that includes the 1,000+ official [Material icons](https://material.io/tools/icons/?style=baseline) converted to `SvgIcon` components.

<a href="/components/material-icons/">
  <img src="/static/images/icons/icons.png" alt="公式の素材アイコン" style="width: 566px" />
</a>

#### 使い方

You can use our [internal search](/components/material-icons/) or [material.io/tools/icons](https://material.io/tools/icons/?style=baseline) to find a specific icon. アイコンをインポートするときは、アイコンの名前が `PascalCase`であることに注意してください。

- [` delete `](https://material.io/tools/icons/?icon=delete&style=baseline) は `@material-ui/icons/Delete`として公開されています。
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) は `@material-ui/icons/DeleteForever`として公開されます。

For "themed" icons, append the theme name to the icon name. たとえば

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

You can import the icons with one of these two options:

- Option n°1:

```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```
- Option n2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

The safest option is n°1 but option n°2 can yield the best experience.
Make sure you follow our [minimizing bundle size guide](/guides/minimizing-bundle-size/#option-2) before using the approach n°2.
We encourage the configuration of a Babel plugin.

### More SVG icons

Looking for even more SVG icons? There are a lot of projects out there,
but [https://materialdesignicons.com](https://materialdesignicons.com/) provides over 2,000 official and community provided icons.
[mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) packages these icons as Material-UI SvgIcons in much the same way as [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) does for the official icons.

## Font Icons

The `Icon` component will display an icon from any icon font that supports ligatures.
As a prerequisite, you must include one, such as the
[Material icon font](https://google.github.io/material-design-icons/#icon-font-for-the-web) in your project, for instance, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` will set the correct class name for the Material icon font. For other fonts, you must supply the class name using the Icon component's `className` property.

To use an icon simply wrap the icon name (font ligature) with the `Icon` component, for example:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

デフォルトでは、アイコンは現在のテキストの色を継承します。 必要に応じて、テーマの色特性のいずれかを使用して、アイコンの色を設定することができます。： `primary`, `secondary`, `action`, `error` & `disabled`.

### Font Material icons

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) can be used with the `Icon` component as follow:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Font vs SVG. Which approach to use?

Both approaches work fine, however, there are some subtle differences, especially in terms of performance and rendering quality. Whenever possible SVG is preferred as it allows code splitting, supports more icons, renders faster and better.

For more details, you can check out [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## アクセシビリティ

Icons can convey all sorts of meaningful information, so it’s important that they reach the largest amount of people possible. There are two use cases you’ll want to consider:

- **Decorative Icons** are only being used for visual or branding reinforcement. If they were removed from the page, users would still understand and be able to use your page.
- **Semantic Icons** are ones that you’re using to convey meaning, rather than just pure decoration. This includes icons without text next to them used as interactive controls — buttons, form elements, toggles, etc.

### Decorative SVG Icons

If your icons are purely decorative, you’re already done! We add the `aria-hidden=true` attribute so that your icons are properly accessible (invisible).

### Semantic SVG Icons

If your icon has semantic meaning, all you need to do is throw in a `titleAccess="meaning"` property. We add the `role="img"` attribute and the `<title>` element so that your icons are properly accessible.

In the case of focusable interactive elements, like when used with an icon button, you can use the `aria-label` property:

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

If your icons have semantic meaning, you need to provide a text alternative only visible to assistive technologies.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Create a user</Typography>
```

### Reference

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/