# Color 颜色

<p class="description">颜色承载了不同的寓意。 开箱即用，您可以查看 Material Design 规范中的所有颜色。</p>

使用 Material Design 的[颜色系统](https://material.io/design/color/)，您可创建表现独特品牌或风格的颜色主题。

## 颜色系统

### 一些重要的术语

#### "调色板（Palette）"

一个调色板是颜色合集，譬如即色调和它们的阴影。 Material-UI 涵盖了 Material Design 指南中的所有颜色。 设计[此调色板](#color-palette)时，我们确保了各个颜色之间的协调。

#### “色彩”和“阴影”

调色板中的单色由一个诸如“红色”的色调，以及一个诸如“500”的阴影调和而成。 “red 50”是红色的最浅的一度 (* 粉红色! *)，而“red 900”是最暗的。 除此之外，大多数的色调都带有以 `A` 为前缀的强调（accent）色调。

### 例子

Material Design 调色板包括主要（primary）和强调（accent）颜色，它们可用于展示或开发您的品牌颜色。 它们彼此可以协调地呈现。

例如，您可以参考互补主要颜色（complementary primary）和强调（accent）颜色（例如“red 500”和“purple A200”）：

```js
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #F44336
const accent = purple['A200']; // #E040FB
const accent = purple.A200; // #E040FB (替代方法)
```

### 调色板

若给定了一种*色调*（如红色，粉红色等）以及一个*阴影* （500，600等），你可以这样导入颜色：

```jsx
import HUE from '@material-ui/core/colors/HUE';

const color = HUE[SHADE];
```

{{"demo": "pages/customization/color/Color.js", "hideToolbar": true, "bg": "inline"}}

## 颜色工具

若想使用 Material-UI 文档来测试 [material.io/design/color](https://material.io/design/color/) 的颜色方案，你只需使用下面的调色板和滑块来选择颜色。 或者，您可以在 “Primary ”和 “Secondary” 两个文本框中输入 hex 色彩码。

{{"demo": "pages/customization/color/ColorTool.js", "hideToolbar": true, "bg": true}}

您能直接把在颜色的例子显示的输出结果直接粘贴到一个 [` createMuiTheme()`](/customization/theming/#createmuitheme-options-theme) 函数里(需要与 [` MuiThemeProvider`](/customization/theming/#theme-provider) 配合使用)：

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

您只需提供 `主要的` 阴影（除非您希望进一步自定义 `light`，`dark` 或 `contrastText` 这几个属性）。在 [自定义主题](/customization/palette/) 章节提到了这样的原因是其他颜色会由 `createMuiTheme()` 自动计算。

如果您使用的是默认的主色调和/或副色调，那么通过提供一个颜色对象，`createMuiTheme()` 则会从 material 颜色里提取的合适的阴影来构成主色，浅色和深色。

### 官方的色彩工具

Material Design 团队还打造了一款超棒的调色板配置工具： [material.io/tools/color](https://material.io/tools/color/)。 它会为你的 UI 建立一个色彩的集合，同时也会评估不同颜色组合的可访问性。

<a href="https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336" target="_blank" rel="noopener nofollow">
  <img src="/static/images/color/colorTool.png" alt="官方色彩工具" style="width: 574px" />
</a>

` createMuiTheme() ` 函数可以使用此输出结果：

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

### 社区提供的一些工具

- [create-mui-theme](https://react-theming.github.io/create-mui-theme/): 使用 Material Design 颜色工具来创建 Material-UI 主题的在线工具。
- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/)：只需要选择颜色即可为你的 Material-UI 应用生成主题的工具，同时还支持在线预览。
- [Material palette generator](https://material.io/inline-tools/color/)：它可用于通过您输入的任何颜色生成一系列的调色板。