---
title: React 图标组件
components: Icon, SvgIcon
---

# Icons 图标

<p class="description">我们提供了一些建议和指导，能够帮组您在 Material-UI 中使用图标。</p>

Material-UI 通过以下三种方式来支持图标的使用：

1. 您可以将标准的 [Material Design 图标](#material-icons) 导出为 React 组件 (SVG icons)。
1. 或者可以将自定义的 SVG 图标通过 [SvgIcon](#svgicon) 组件来包装成一个 React 组件。
1. 或者可以将自定义的 font 图标通过 [ Icon ](#icon-font-icons) 组件来包装成一个 React 组件。

## Material 图标

Material Design 已经将 1100 多个官方图标标准化，而每个图标都有五个不同的“主题”(见下文)。 对于每个 SVG 图标，我们从 @ material-ui/icons 包中导出相应的React组件。 您可以 [搜索完整的图标列表](/components/material-icons/)。

### 安装

请在您的项目目录中用以下方式安装依赖包：

```sh
// 通过 npm
npm install @material-ui/icons

// 通过 yarn
yarn add @material-ui/icons
```

这些组件使用 Material-UI 的 SvgIcon 组件，这样可以通过 SVG 路径来对各个图标进行渲染，因此它们与下一个发布的版本的 Material-UI 具有对等依赖性。

如果你尚未在你的项目中使用 Material-UI，你可以这样添加:

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

当然了，方法 1 比方法 2 安全得多，但是方法 2 提供了最好的开发体验。 在使用第二个方法之前，请确保您遵循 [最小化捆绑包大小指南](/guides/minimizing-bundle-size/#option-2)。 我们强烈建议您配置一个 Babel 插件。

其中我们给每个图标配备了一个”主题“：Filled (default)，Outlined，Rounded，Two tone 以及 Sharp。 若您想导入一个不是默认主题的图标组件，在图标名加主题做为后缀即可。 例如，`@material-ui/icons/Delete` 图标可以：

- 导出为 Filled 主题（默认值）：`@material-ui/icons/Delete`，
- 导出为 Outlined 主题：`@material-ui/icons/DeleteOutlined`，
- 导出为 Rounded 主题：`@material-ui/icons/DeleteRounded `，
- 导出为 Twotone 主题：`@material-ui/icons/DeleteTwoTone `，
- 导出为 Sharp 主题：`@material-ui/icons/DeleteSharp `，

> 友情提示：Material Design 在命名图标的时候遵循了 “snake_case” 变量命名法（例如，`delete_forever` 和 `add_a_photo`），而 `@material-ui/icons` 则使用 “PascalCase” 来命名导出的相应图标（例如，`DeleteForever` 以及 `AddAPhoto`）。 并且此命名规则有三个特例：`3d_rotation` 导出为 `ThreeDRotation`，`4k` 导出为 `FourK`，以及 `360` 导出为 `ThreeSixty`。

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

## SvgIcon

如果你想导入一个自定义的 SVG 图标（但是又无法在 Material 图标 [默认系列](/components/material-icons/) 中找到），你可以使用 `SvgIcon` 来包装你的图标。 此组件是原生 `<svg>` 元素的拓展版：

- 它具备一些内置的无障碍设计。
- SVG 元素应缩放为 24x24px 的视图，这样一来其他一些 Material-UI 组件可以将此图标直接使用，或者包含为其子元素。 （使用 `viewBox` 属性，您可以随意自定义）。
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

通过 “url-loader” 或 “file-loader” 加载也是可行的。 Create React App 也是这样使用的。

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

### 库

#### Material Design （强烈推荐）

Material Design 将 [1100 多个海量官方图标](#material-icons) 标准化。

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) 提供了 2000 多个图标。 若想使用任何图标，只需复制图标的 SVG `path`，并将其作为 `SvgIcon` 组件的子元素使用。

友情提示：[mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) 已经将每个 SVG 图标用 `SvgIcon` 组件包装起来，你可以高枕无忧了。

## Icon (Font icons)

对于支持连字的任何图标字体，`Icon` 组件能够将其显示为一个图标。 作为先决条件，你的项目里必须包含 [Material icon font](https://google.github.io/material-design-icons/#icon-font-for-the-web)，譬如说，您可以通过 Google Web Fonts 来导入：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon`  将为 Material icon font 设置正确的类名。 对于其他字体来说，则需要通过 Icon 组件的 `className` 属性来传递类名称（class name)。

若想要使用图标，您只需把图标名（字体连字）和 `Icon` 组件包装到一起，例如：

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

默认情况下，一个图标会继承使用当前的文本颜色。 您也可以选择使用以下任何一个主题颜色属性来设置图标的颜色：`primary`，`secondary`，`action`，`error` 以及 `disabled`。

### Font Material 图标

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

如下是一个同时使用 [Font Awesome](https://fontawesome.com/icons) 与 `Icon` 的示例：

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Font vs SVG。 使用哪个更好呢？

这两种方法都能管用，然而，它们之间还是有着一些微妙的差异，特别当涉及到整体性能和渲染质量的时候。 我们推荐尽可能选择 SVG，因为它允许代码分割、支持更多图标、而且渲染得更快、更好。

若您想了解更多细节，请查看 [ why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/) 这篇文章。

## 无障碍设计

图标可以传达各种各样有意义的信息，所以将他们传递给尽可能多的受众是至关重要的。 您可能会注意到这两个用例：
- **装饰性的图标（Decorative Icons）** 只在视觉或者品牌强化中使用。 即使将它们从页面中移除，用户仍然可以理解并能够使用整个界面。
- **语义图标（Semantic Icons）** 则是那些承载含义的图标，而不只有纯粹的装饰用途。 这也包括了将一些不带着文本的图标作为交互式控件使用 — 按钮，表单元素，切换等。

### 装饰 SVG 图标

如果你的图标只是作为纯粹的装饰，那么你已经大功告成啦！ 而添加 `aria-hidden=true` 属性可以让你的图标变成正确的且可访问的（隐形的）。

### 语义 SVG 图标

如果您的图标带有语义，您只需要包含 `titleAccess =“含义”` 这个属性。 我们添加了 `role="img"` 属性和 `<title>` 元素，这样一来您的图标就满足无障碍设计的需求了。

对于那些可聚焦的交互式元素，譬如与一个图标按钮一起使用时，您可以使用 `aria-label` 属性：

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

### 装饰形的字体图标

如果你的图标只是作为纯粹的装饰，那么你已经大功告成啦！ 而添加 `aria-hidden=true` 属性可以让你的图标变成正确的且可访问的（隐形的）。

### 语义字体图标

如果您的图标具有语义含义，您则需要提供一个对协助的技术可见的文本替代方法。

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">创建一个用户</Typography>
```

### 参考

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
