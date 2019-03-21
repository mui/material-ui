# 样式

<p class="description">使用您自己的样式定义Material-UI。 您可以更改颜色，排版等等。</p>

样式可以指定组件的颜色，表面的暗度，阴影的级别，墨水元素的适当不透明度等。

样式可让您为应用程序应用一致的音调。它可以让你 **自定义所有的设计方面** 项目，以满足您的企业或品牌的特定需求。

为了提高应用程序之间的一致性，可以选择明暗样式类型。 默认情况下，组件使用浅色样式类型。

## 样式提供者

If you wish to customize the theme, you need to use the `ThemeProvider` component in order to inject a theme into your application. 但是，这是可选的; Material-UI组件带有默认样式。

`ThemeProvider` relies on the context feature of React to pass the theme down to the components, so you need to make sure that `ThemeProvider` is a parent of the components you are trying to customize. You can learn more about this in [the API section](/css-in-js/api/#themeprovider).

## 样式配置变量

更改样式配置变量是将Material-UI与您的需求相匹配的最有效方法。 以下片段介绍了最重要的样式变量：

- [调色板](#palette)
- [类型（浅色/深色 样式）](#type-light-dark-theme)
- [排版](#typography)
- [间距](#spacing)
- [其他变量](#other-variables)
- [自定义变量](#custom-variables)

### 调色板

#### 意向

颜色意图是将调色板映射到应用程序中的给定意图。

该主题揭示了以下颜色意图：

- primary - 用于表示用户的主要界面元素。
- secondary - 用于表示用户的辅助界面元素。
- error - 用于表示用户应该知道的界面元素。

默认调色板使用前缀为 `A` （`A200`等）的阴影作为次要意图， 使用未加前缀的阴影作为其他意图。

如果您想了解更多的颜色，你可以检查出 [颜色项](/style/color/)。

#### 自定义调色板

您可以通过在主题中包含 `palette` 对象来覆盖默认调色板值。

如果任何的 [`palette.primary`](/customization/default-theme/?expend-path=$.palette.primary)， [`palette.secondary`](/customization/default-theme/?expend-path=$.palette.secondary) 或 [`palette.error`](/customization/default-theme/?expend-path=$.palette.error) 提供的意图'对象，它们将取代的默认值。

The intention value can either be a [color](/style/color/) object, or an object with one or more of the keys specified by the following TypeScript interface:

```ts
interface PaletteIntention {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
};
```

**使用颜色对象**

自定义意图的最简单方法是导入一个或多个提供的颜色 并将其应用于调色板意图：

```js
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
```

如果意图键接收一个颜色对象，如上面的例子中， 以下映射用于填充所需的键：

```js
palette: {
  primary: {
    light: palette.primary[300],
    main: palette.primary[500],
    dark: palette.primary[700],
    contrastText: getContrastText(palette.primary[500]),
  },
  secondary: {
    light: palette.secondary.A200,
    main: palette.secondary.A400,
    dark: palette.secondary.A700,
    contrastText: getContrastText(palette.secondary.A400),
  },
  error: {
    light: palette.error[300],
    main: palette.error[500],
    dark: palette.error[700],
    contrastText: getContrastText(palette.error[500]),
  },
},
```

此示例说明了如何重新创建默认调色板值：

```js
import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});
```

**直接提供颜色**

如果您希望提供更多自定义颜色，您可以创建自己的颜色对象， 或直接为部分或全部意图的键提供颜色：

```js
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});
```

如在上面的示例中，如果意图对象使用任何的包含自定义颜色 `main`， `light`， `dark` 或 `contrastText` 键，这些地图如下：

- 如果 `暗` 和/或 `的光` 被省略键，它们的值（一个或多个）将被从计算出的 `主`， 根据 `tonalOffset` 值。

- 如果 `contrastText` 被省略了，它的值将被计算同对比 `main`， 根据`contrastThreshold` 值。

可以根据需要定制 `tonalOffset` 和 `contrastThreshold` 值。 `tonalOffset` 较高值将使 `light` 计算值更亮，而 `dark` 更暗。 `对比度阈值` 较高值增加了背景颜色被认为是 光的点，并且给出了暗 `对比度文本`。

请注意， `contrastThreshold` 遵循非线性曲线。

#### 示例

{{"demo": "pages/customization/themes/Palette.js"}}

#### 颜色工具

需要灵感？ Material Design团队已经构建了一个非常棒的 [调色板配置工具](/style/color/#color-tool) 来帮助您。

### 类型（浅色/深色主题）

您可以通过将 `type` 设置为 `dark`来使主题变暗。 虽然它只是一个属性值更改，但在内部它会修改以下键的值：

- `palette.text`
- `palette.divider`
- `palette.background`
- `palette.action`

```js
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
```

{{"demo": "pages/customization/themes/DarkTheme.js", "hideEditButton": true}}

### 活版印刷

太多类型的尺寸和样式会破坏任何布局。 样式提供了 **有限集合型尺寸的** 可以与布局网格一起很好地工作。 这些尺寸用于各个组件。

请查看以下有关更改默认值的示例，例如字体系列。 如果您想了解有关排版的更多信息，可以查看 [排版部分](/style/typography/)。

{{"demo": "pages/customization/themes/TypographyTheme.js"}}

#### 排版 - 字体系列

```js
const theme = createMuiTheme({
  typography: {
    // 使用系统字体而不是默认的Roboto字体。
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
```

#### 排版 - 字体大小

Material-UI使用 `rem` 单位作为字体大小。 浏览器 `<html>` 元件默认字体大小是 `16px的`，但浏览器有一个选项，以改变该值， 所以 `REM` 单元允许我们以适应用户的设置，产生了更好的用户体验。 用户可以出于各种原因更改字体大小设置，从视力不佳到为大小和观看距离差异很大的设备选择最佳设置 。

要更改Material-UI的字体大小，您可以提供 `fontSize` 属性。 默认值为 `14px`。

```js
const theme = createMuiTheme({
  typography: {
    // In Japanese the characters are usually larger.
    fontSize: 12,
  },
});
```

浏览器计算出的字体大小遵循以下数学公式：

![font-size](/static/images/font-size.gif) <!-- https://latex.codecogs.com/gif.latex?computed&space;=&space;specification&space;\frac{typography.fontSize}{14}&space;\frac{html&space;font&space;size}{typography.htmlFontSize} -->

#### 排版 - HTML字体大小

您可能想要更改 `<html>` 元素的默认字体大小。 例如，使用 [10px简化时](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/)。 我们为此用例提供了一个 `htmlFontSize` 主题属性。 它告诉Material-UI `<html>` 元素的字体大小是多少。 它用于调整 `rem` 值，因此计算出的字体大小始终与规范匹配。

```js
const theme = createMuiTheme({
  typography: {
    // 告诉Material-UI html元素的字体大小是什么。
    htmlFontSize: 10,
  },
});
```

```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

*您需要在此页面的html元素上应用上述CSS，以查看正确呈现的以下演示*

{{"demo": "pages/customization/themes/FontSizeTheme.js"}}

### 间距

我们鼓励您使用 `theme.spacing()` 帮助器在UI的元素之间创建一致的间距。 Material-UI默认使用[8px的缩放系数](https://material.io/design/layout/understanding-layout.html) 。

```js
const styles = theme => ({
  root: {
    // JSS使用px作为此CSS属性的默认单位。
    padding: theme.spacing(2), // Outputs 8 * 2
  },
});
```

您可以通过提供以下内容来更改间距转换值：

- 一个数字

```js
const theme = createMuiTheme({
  spacing: 4,
});

theme.spacing(2) // = 4 * 2
```

- 或一个函数

```js
const theme = createMuiTheme({
  spacing: factor => `${0.25 * factor}rem`, // (Bootstrap 策略)
});

theme.spacing(2) // = 0.5rem = 8px
```

#### 多个参数

` theme.spacing() ` 最多接受4个参数。 您可以使用参数来减少样板：

```diff
<br />-  padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
+  padding: theme.spacing(1, 2), // '8px 16px'
```

### 其他变量

除了调色板，暗色和浅色类型以及排版外，样式还通过提供更多默认值（例如断点，阴影，过渡等）来实现标准。 您可以查看[默认样式部分](/customization/default-theme/)完整查看默认样式。

### 自定义变量

When using Material-UI's theme with our [styling solution](/css-in-js/basics) or [any others](/guides/interoperability/#themeprovider). 可以方便地向样式添加其他变量，以便您可以在任何地方使用它们。 例如：

{{"demo": "pages/customization/themes/CustomStyles.js"}}

## 自定义组件类型的所有实例

### CSS

当配置变量不够强大时，您可以利用 `overrides` 的 `theme` 键来潜在地将Material-UI注入的每个 **style** 更改为DOM。 这是一个十分强有力的特点。

```js
const theme = createMuiTheme({
  overrides: {
    MuiButton: { // 组件的名称 ⚛️ / 样式表
      text: { // 规则的名称
        color: 'white', // 一些CSS
      },
    },
  },
});
```

{{"demo": "pages/customization/themes/OverridesCss.js"}}

每个组件可自定义的部分列在文档的**Component API**部分。 例如，你可以看一下[Button](/api/button/#css)， 而且你总可以查阅 [implementation](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Button/Button.js)。

### 属性

你也可以在一个类型的组件都所有实例上指明属性， 在`theme`上有一个键值`props`是用来作这个用途的。

```js
const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 
    },
  },
});
```

{{"demo": "pages/customization/themes/OverridesProperties.js"}}

## 访问组件中的主题

您可能需要访问React组件中的主题变量。 好比说你想要显示原色变量的值。你可以使用 `withTheme`高阶组件来实现。 下面是一个示例：

{{"demo": "pages/customization/themes/WithTheme.js"}}

## 嵌套主题

这样的主题方式非常灵活，比如 [你可以嵌套](/css-in-js/advanced/#theme-nesting)多个主题提供器 在处理具有彼此明显外观的应用程序的不同区域时，这非常有用。

{{"demo": "pages/customization/themes/ThemeNesting.js"}}

内的主题将 **倍率** 外的主题。 您可以通过提供一个函数来扩展外部主题：

{{"demo": "pages/customization/themes/ThemeNestingExtend.js"}}

#### 关于性能

The performance implications of nesting the `ThemeProvider` component are linked to JSS's work behind the scenes. 一句话来讲，我们以 `(styles, theme)`为键值缓存了注入的CSS。

- `theme`: 每次渲染时，如果你提供了一个新的主题，一个新的CSS对象将会被生成并注入。 不管是为了更统一的UI风格还是性能，都应该尽量不要每次生成新的主题 object。
- `styles`: 样式 object 越大，需要的运算越多。

## API

### `createMuiTheme(options) => theme`

根据接收的选项生成样式。

#### 参数

1. `options` （*Object*）：采用不完整的主题对象并添加缺少的部分。

#### 返回结果

`theme` （*Object*）：一个完整的，随时可用的主题对象。

#### 例子

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