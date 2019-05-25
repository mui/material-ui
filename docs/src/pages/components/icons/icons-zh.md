---
title: React Icon（图标）组件
components: Icon, SvgIcon
---

# Icons（图标）

<p class="description">一些在 Material-UI 中使用图标的建议和指导。</p>

一个[系统图标](https://material.io/design/iconography/system-icons.html)或 UI图标，用符号表示了一个命令、一份文件、一台设备或者一个目录。 系统图标也用于在应用栏、工具栏、按钮、和列表中用来表示一些常见操作，如删除、打印、和保存。 谷歌根据此规范提供了一套 [Material icons](https://material.io/tools/icons/style=baseline)。

Material-UI 提供了两个组件来渲染系统图标：`SvgIcon` 来渲染 SVG 路径，而 `Icon` 来渲染字体。

## SVG 图标

`SvgIcon` 组件将 SVG 的 `path` 作为子元素，并将它转换为一个展示路径的 React 组件，而且用户可以自定义图标的样式和相应的鼠标事件。 应将 SVG 元素缩放来适应24x24像素的视图。

您可以直接使用生成的图标，或者将其作为另一个 Material-UI 组件的子项来使用。 默认情况下，一个图标会继承使用当前的文本颜色。 您也可以选择使用以下任何一个主题颜色属性来设置图标的颜色：`primary`，`secondary`，`action`，`error` 以及 `disabled`。

{{"demo": "pages/components/icons/SvgIcons.js"}}

### SVG Material 图标

拥有实现自定义图标所需的构成模块很令人感兴趣，但如何实现预设图标呢？ 我们提供[@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons)这样一个单独的 npm 包，其中包括1000多个已转换为 `Svg 图标` 组件的官方 [ Material 图标](https://material.io/tools/icons/?style=baseline)。

<a href="https://material.io/tools/icons/?icon=3d_rotation&style=baseline">
  <img src="/static/images/icons/icons.png" alt="官方 material 图标" style="width: 566px" />
</a>

#### 使用

你可以在 [material.io/tools/icons](https://material.io/tools/icons/style=baseline) 中找到某个特定的图标。 当您导入图标时, 请记住图标的名称使用了 `PascalCase（帕斯卡命名规则）`，例如：

- [`delete`](https://material.io/tools/icons/?icon=delete&style=baseline) 暴露为 `@material-ui/icons/Delete`
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) 暴露为 `@material-ui/icons/DeleteForever`

对于那些 *"被主题修饰过"* 的图标，您在图标名称后面加上主题名。 例如：

- 描边的 [`delete`](https://material.io/tools/icons/?icon=delete&style=outline) 图标由 `@material-ui/icons/DeleteOutlined` 暴露
- 圆角的 [`delete`](https://material.io/tools/icons/?icon=delete&style=rounded) 图标由 `@material-ui/icons/DeleteRounded` 暴露
- 双色的 [`delete`](https://material.io/tools/icons/?icon=delete&style=twotone) 图标由 `@material-ui/icons/DeleteTwoTone` 暴露
- 尖锐的 [`delete`](https://material.io/tools/icons/?icon=delete&style=sharp) 图标由 `@material-ui/icons/DeleteSharp` 暴露

这条规则有三个例外情况：

- [`3d_rotation`](https://material.io/tools/icons/?icon=3d_rotation&style=baseline) 暴露为 `@material-ui/icons/ThreeDRotation`
- [`4k`](https://material.io/tools/icons/?icon=4k&style=baseline) 暴露为 `@material-ui/icons/FourK`
- [`360`](https://material.io/tools/icons/?icon=360&style=baseline) 暴露为 `@material-ui/icons/ThreeSixty`

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

#### 导入

- 假如您的开发环境不支持 tree-shaking，我们**推荐的**方式是用以下方法导入图标：

```jsx
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

- 如果你的环境支持 tree-shaking，你也可以这样导入图标：

```jsx
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
```

注意：用这种名称导出的方式导入会造成 *每一个图标* 的代码都会被包含在你的项目里，所以除非你配置了[tree-shaking](https://webpack.js.org/guides/tree-shaking/)， 我们不推荐你采用这个方法。 这也可能会影响热模块重载的性能。

### 更多的 SVG 图标

您在寻找更多的 SVG 图标吗？ 事实上已经有大量的项目存在，不过 [https://materialdesignicons.com](https://materialdesignicons.com/) 提供了超过 2,000 多种由官方和我们的社区提供的图标。 与[@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) 将官方的图标打包方式类似，[mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui)将这些图标打包为 Material-UI SvgIcons。

## 字体图标

对于支持连字的任何图标字体，`Icon` 组件能够将其显示为一个图标。 作为先决条件，您必须在项目中包括一个 [Material icon font](http://google.github.io/material-design-icons/#icon-font-for-the-web)，举例来说，您可以由 Google Web Fonts 引入：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` 组件将为 Material icon font 设置正确的类名。而对于其他的字体，您必须通过 Icon 组件的 `className` 属性来设置类名。

若想要使用图标，您只需把图标名（字体连字）和 `Icon` 组件包装到一起，例如：

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

默认情况下，一个图标会继承使用当前的文本颜色。 您也可以选择使用以下任何一个主题颜色属性来设置图标的颜色：`primary`，`secondary`，`action`，`error` 以及 `disabled`。

### Font Material 图标

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

如下是一个同时使用[Font Awesome](https://fontawesome.com/icons) 与 `Icon` 的示例：

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Font 与 SVG。到底使用哪个呢？

这两种方法都能管用，然而，它们之间还是有着一些微妙的差异，特别当涉及到整体性能和渲染质量。 我们推荐尽可能选择 SVG，因为它允许代码分割、支持更多图标、而且渲染得更快、更好。

For more details, you can check out [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## 可及性

图标可以传达各种各样有意义的信息，所以将他们传递给尽可能多的受众是至关重要的。 您可能需要考虑两个用例： - **装饰图标** 仅用于视觉效果或品牌强化。 如果将它们从页面中删除，用户仍然可以理解并能够使用您的页面。 - **语义图标** 是您用来传达意义的，而不仅仅是纯粹的装饰。 这包括将边上不带有文本的图标用作一些交互式控件 — 按钮，表单元素，切换等。

### 装饰 SVG 图标

如果您的图标纯粹是装饰性的，那么您已经完成了！我们添加 `aria-hidden=true` 这个属性，以便您的图标可以正常访问（隐藏的）。

### 语义 SVG 图标

如果您的图标带有语义，您只需要包含 `titleAccess =“含义”` 属性。 我们添加了 `role="img"` 属性和 `<title>` 元素，这样一来您的图标可以正常被访问了。

对于那些可聚焦的交互式元素，譬如与一个图标按钮一起使用时，您可以使用 `aria-label` 属性：

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="Delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

### 装饰形的字体图标

如果您的图标纯粹是装饰性的，那么您已经完成了！ 我们添加 `aria-hidden=true` 属性，以便您的图标可以正常访问（不可见）。

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