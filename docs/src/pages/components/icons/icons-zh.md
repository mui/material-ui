---
title: React 图标组件
components: Icon, SvgIcon
githubLabel: 'SvgIcon（Svg 图标）'
materialDesign: https://material.io/design/iconography/system-icons.html
---

# Icons 图标

<p class="description">我们提供了一些建议和指导，能够帮组您在 Material-UI 中使用图标。</p>

Material-UI 通过以下三种方式来支持图标的使用：

1. 您可以将标准的 [Material Design 图标](#material-icons) 导出为 React 组件 (SVG icons)。
1. 或者可以将自定义的 SVG 图标通过 [SvgIcon](#svgicon) 组件来包装成一个 React 组件。
1. 或者可以将自定义的 font 图标通过 [ Icon ](#icon-font-icons) 组件来包装成一个 React 组件。

## Material Icons 图标

Material Design 已经将1,100多个官方图标标准化，而每个图标都有五个不同的“主题”(见下文)。 对于每个 SVG 图标，我们从 @ material-ui/icons 包中导出相应的React组件。 您可以 [搜索完整的图标列表](/components/material-icons/)。

### 安装

请在您的项目目录中用以下方式安装依赖包：

```sh
// 通过 npm
npm install @material-ui/icons

// 通过 yarn
yarn add @material-ui/icons
```

These components use the Material-UI `SvgIcon` component to render the SVG path for each icon, and so have a peer-dependency on `@materialui/core`.

If you aren't already using Material-UI in your project, you can add it with:

```sh
// 用 npm 安装
npm install @material-ui/core

// 用 yarn 安装
yarn add @material-ui/core
```

### 使用

有两种导入图标的方法：

- 方法 1:

  ```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- 方法 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

The safest for bundle size is Option 1, but some developers prefer Option 2. 在使用第二个方法之前，请确保您遵循 [最小化捆绑包大小指南](/guides/minimizing-bundle-size/#option-2)。

Each Material icon also has a "theme": Filled (default), Outlined, Rounded, Two-tone, and Sharp. To import the icon component with a theme other than the default, append the theme name to the icon name. 例如，`@material-ui/icons/Delete` 图标可以：

- 导出为 Filled 主题（默认值）：`@material-ui/icons/Delete`，
- 导出为 Outlined 主题：`@material-ui/icons/DeleteOutlined`，
- 导出为 Rounded 主题：`@material-ui/icons/DeleteRounded `，
- 导出为 Twotone 主题：`@material-ui/icons/DeleteTwoTone `，
- 导出为 Sharp 主题：`@material-ui/icons/DeleteSharp `，

> 友情提示：Material Design 在命名图标的时候遵循了 “snake_case” 变量命名法（例如，`delete_forever` 和 `add_a_photo`），而 `@material-ui/icons` 则使用 “PascalCase” 来命名导出的相应图标（例如，`DeleteForever` 以及 `AddAPhoto`）。 并且此命名规则有三个特例：`3d_rotation` 导出为 `ThreeDRotation`，`4k` 导出为 `FourK`，以及 `360` 导出为 `ThreeSixty`。

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

### 测试

For testing purposes, each icon exposed from `@material-ui/icons` has a `data-testid` attribute with the name of the icon. 就像这样： 就像这样：

```jsx
import DeleteIcon from '@material-ui/icons/Delete';
```

一旦挂载后，它就具有以下属性：

```html
<svg data-testid="DeleteIcon"></svg>
```

## SvgIcon（Svg 图标）

If you need a custom SVG icon (not available in the [Material Icons](/components/material-icons/)) you can use the `SvgIcon` wrapper. 此组件是原生 `<svg>` 元素的拓展版：

- 它具备一些内置的无障碍设计。
- SVG elements should be scaled for a 24x24px viewport so that the resulting icon can be used as is, or included as a child for other Material-UI components that use icons. （使用 `viewBox` 属性，您可以随意自定义）。
- 默认情况下，此组件会继承当前的颜色。 当然，通过 `color` 这个属性，你可以让图标使用主题里的颜色。

```jsx
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
```

### Color 颜色

{{"demo": "pages/components/icons/SvgIconsColor.js"}}

### Size 大小

{{"demo": "pages/components/icons/SvgIconsSize.js"}}

### 组件属性

即使图标以 `.svg` 的格式保存，你依然可以使用 `SvgIcon` 来包装它。 通过 [svgr](https://github.com/smooth-code/svgr) 提供的加载器，您可以导入 SVG 文件，并以 React 组件形式使用。 譬如，使用 webpack ：

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

通过 “url-loader” 或 “file-loader” 加载也是可行的。 This is the approach used by Create React App.

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

如下是一个同时使用[Font Awesome](https://fontawesome.com/icons) 与 `Icon` 的示例：

友情提示：[mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) 已经将每个 SVG 图标用 `SvgIcon` 组件包装起来，你可以高枕无忧了。

FontAwesomeIcon's `fullWidth` prop can also be used to approximate the correct dimensions, but it isn't perfect.

### Font Material 图标

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) 提供了 2000 多个图标。 For the wanted icon, copy the SVG `path` they provide, and use it as the child of the `SvgIcon` component, or with `createSvgIcon()`.

友情提示：[mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) 已经将每个 SVG 图标用 `SvgIcon` 组件包装起来，你可以高枕无忧了。

## Icon (Font icons)

对于支持连字的任何图标字体，`Icon` 组件能够将其显示为一个图标。 作为先决条件，你的项目里必须包含 [Material icon font](https://google.github.io/material-design-icons/#icon-font-for-the-web)，譬如说，您可以通过 Google Web Fonts 来导入：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` will set the correct class name for the Material Icons font. `Icon`  将为 Material icon font 设置正确的 class 名字。

若想要使用图标，您只需把图标名（字体连字）和 `Icon` 组件包装到一起，例如：

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

默认情况下，一个图标会继承使用当前的文本颜色。 您也可以选择使用以下任何一个主题颜色属性来设置图标的颜色：`primary`，`secondary`，`action`，`error` 以及 `disabled`。

### Font Material 图标

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) can be used with the `Icon` component as follows:

{{"demo": "pages/components/icons/FontAwesomeIcon.js"}}

Note that the Font Awesome icons weren't designed like the Material Design icons (compare the two previous demos). fa icons 经过裁剪，以利用所有可用空间。 You can adjust for this with a global override:

```jsx
const theme = createMuiTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // 匹配 24px = 3 * 2 + 1.125 * 16
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

## Font vs SVG。 使用哪个更好呢？

Both approaches work fine, however there are some subtle differences, especially in terms of performance and rendering quality. Whenever possible SVG is preferred as it allows code splitting, supports more icons, and renders faster and better.

For more details, take a look at [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## 无障碍设计

Icons can convey all sorts of meaningful information, so it’s important to ensure they are accessible where appropriate. 您可能会注意到这两个用例：

- **Decorative icons** that are only being used for visual or branding reinforcement. 即使将它们从页面中移除，用户仍然可以理解并能够使用整个界面。
- **Semantic icons** are ones that you’re using to convey meaning, rather than just pure decoration. This includes icons without text next to them that are used as interactive controls — buttons, form elements, toggles, etc.

### Decorative icons

如果你的图标只是作为纯粹的装饰，那么你已经大功告成啦！ 而添加 `aria-hidden=true` 属性可以让你的图标变成正确的且可访问的（隐形的）。

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
</IconButton>;
```

#### Semantic font icons

You need to provide a text alternative that is only visible to assistive technologies.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">创建一个用户</Typography>

import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">创建一个用户</Typography>

<Icon>add_circle</Icon>
<span className={classes.visuallyHidden}>创建一个用户</span>
```

#### 参考

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
