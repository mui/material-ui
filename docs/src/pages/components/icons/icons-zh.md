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

拥有实现自定义图标所需的构成模块很令人感兴趣，但如何实现预设图标呢？ [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) is an npm package that includes the 1,000+ official [Material icons](/components/material-icons/) converted to `SvgIcon` components.

<a href="/components/material-icons/">
  <img src="/static/images/icons/icons.png" alt="官方 material 图标" style="width: 566px" />
</a>

#### 使用

You can use the [internal search](/components/material-icons/) or [material.io/tools/icons](https://material.io/tools/icons/?style=baseline) to find a specific icon. 当您导入图标时, 请记住图标的名称使用了 `PascalCase（帕斯卡命名规则）`，例如：

- [`delete`](https://material.io/tools/icons/?icon=delete&style=baseline) 暴露为 `@material-ui/icons/Delete`
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) 暴露为 `@material-ui/icons/DeleteForever`

对于“主题化”图标，是将主题名称附加到图标名称后面。 例如：

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

导入图标有以下两种方法：

- 方法 1:

```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- Option 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

The safest is option 1 but option 2 can yield the best developer experience.
Make sure you follow the [minimizing bundle size guide](/guides/minimizing-bundle-size/#option-2) before using the second approach.
The configuration of a Babel plugin is encouraged.

### 更多SVG图标

正在寻找更多SVG图标？ 即使已经有许多项目存在，不过 [https://materialdesignicons.com](https://materialdesignicons.com/) 仍然提供了超过 2,000 种由官方和我们的社区提供的图标。
[mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) 将这些图标打包为Material-UI SvgIcons，其方式与[@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons)打包官方图标的方式大致相同。

## 字体图标

通过 使用`Icon` 组件，任何支持连字的图标字体都将正常显示为一个图标。
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

默认情况下，一个图标会继承使用当前的文本颜色。 您也可以选择使用以下任何一个主题颜色属性来设置图标的颜色：`primary`，`secondary`，`action`，`error` 以及 `disabled`。

### Font Material icons

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) can be used with the `Icon` component as follow:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Font vs SVG. Which approach to use?

Both approaches work fine, however, there are some subtle differences, especially in terms of performance and rendering quality. Whenever possible SVG is preferred as it allows code splitting, supports more icons, renders faster and better.

For more details, you can check out [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## 可及性

Icons can convey all sorts of meaningful information, so it’s important that they reach the largest amount of people possible. There are two use cases you’ll want to consider:

- **Decorative Icons** are only being used for visual or branding reinforcement. If they were removed from the page, users would still understand and be able to use your page.
- **Semantic Icons** are ones that you’re using to convey meaning, rather than just pure decoration. This includes icons without text next to them used as interactive controls — buttons, form elements, toggles, etc.

### Decorative SVG Icons

If your icons are purely decorative, you’re already done! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Semantic SVG Icons

If your icon has semantic meaning, all you need to do is throw in a `titleAccess="meaning"` property. The `role="img"` attribute and the `<title>` element are added so that your icons are properly accessible.

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

If your icons are purely decorative, you’re already done! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

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