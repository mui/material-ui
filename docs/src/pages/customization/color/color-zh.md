# 颜色

<p class="description">通过颜色传达意义。 开箱即用，您可以访问Material Design规范中的所有颜色。</p>

Material Design [颜色系统](https://material.io/design/color/) 可用于创建反映您的品牌或风格的颜色主题。

## 颜色系统

### 重要的术语

#### "调色板"

调色板是颜色的集合, 即色调和它们的阴影. Material-UI 提供Material Design 指南中的所有颜色. [This color palette](#color-palette) has been designed with colors that work harmoniously with each other.

#### “色彩”和“阴影”

调色板中的单一颜色由色相如 "red" 和阴影如 "500"组成。 "rad 50" 是红色的最浅的阴影 (* 粉红色! *), 而 "red 900" 是最暗的。 此外, 大多数色调都带有强调色调, 以 ` A ` 为前缀。

### 例子

Material Design调色板包括主要和强调颜色, 可用于插图或开发您的品牌颜色. 他们被设计成彼此和谐地工作.

例如, 您可以参考互补的主要和强调颜色 (例如 "red 500" & "purple A200"), 如下所示:

```js
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #F44336
const accent = purple['A200']; // #E040FB
const accent = purple.A200; // #E040FB (替代方法)
```

### 调色板

给定*HUE* （红色，粉红色等）和*SHADE* （500,600等）你可以导入这样的颜色：

```jsx
import HUE from '@material-ui/core/colors/HUE';

const color = HUE[SHADE];
```

{{"demo": "pages/customization/color/Color.js", "hideHeader": true}}

## 颜色工具

使用Material-UI文档测试[material.io/design/color](https://material.io/design/color/)颜色方案,只需使用下面的调色板和滑块选择颜色. 或者，您可以在“Primary”和“Secondary”文本字段中输入十六进制值。

{{"demo": "pages/customization/color/ColorTool.js", "hideHeader": true}}

颜色样本中显示的输出可以直接粘贴到[` createMuiTheme()`](/customization/themes/#createmuitheme-options-theme)函数中与([` MuiThemeProvider`](/customization/themes/#theme-provider)一起使用);

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

只需要提供 `main` 阴影（除非您希望进一步自定义 `light` `dark` 或 `contrastText`），因为其他颜色将由 `createMuiTheme()`计算，如 [主题定制中所述](/customization/palette/) 节。

如果你通过提供 color object 的方式 使用默认的主要阴影 和/或 次要阴影，`createMuiTheme()` 将会根据 主、亮和暗 三种 material 颜色选择合适的阴影。

### 官方色彩工具

Material Design 团队提供了一款令人赞叹的调色板配置工具：[material.io/tools/color](https://material.io/tools/color/)。 它会帮助你为你的 UI 建立自己的色彩集合，同时也会帮助测量每个颜色组合的可访问性。

<a href="https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336">
  <img src="/static/images/color/colorTool.png" alt="官方色彩工具" style="width: 574px" />
</a>

它的输出可以使用在` createMuiTheme() ` 函数：

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

### 社区工具

- [create-mui-theme](https://react-theming.github.io/create-mui-theme/) 是一款使用 Material Design 创建 Material-UI 主题的在线工具。
- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/) 一款只需要选择颜色即可为你的 Material-UI 应用生成主题的工具，同时还支持在线预览。
- [Material调色板生成器](https://material.io/inline-tools/color/)：Material调色板生成器可用于通过您输入的任何颜色生成调色板。