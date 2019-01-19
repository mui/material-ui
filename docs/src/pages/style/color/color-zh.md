# 颜色

<p class="description">通过颜色传达意义。 开箱即用，您可以访问Material Design规范中的所有颜色。</p>

Material Design [颜色系统](https://material.io/design/color/) 可用于创建反映您的品牌或风格的颜色主题。

## 颜色系统

### 重要的术语

#### "调色板"

调色板是颜色的集合，即色调和它们的阴影。 Material-UI提供Material Design准则中的所有颜色。 [此调色板](#color-palette) 设计为彼此协调工作。

#### “色彩”和“阴影”

调色板中的单色由诸如“红色”的色调和诸如“500”的色调组成。 “red 50”是最浅的红色（*粉红色*），而red 900”是最暗的。 此外，大多数色调都带有“重音”色调，前缀为 `A`。

### 例子

“材质设计”调色板包含主色和强调色，可用于说明或开发品牌颜色。 他们被设计成彼此和谐地工作。

例如，可以参考互补初级和强调色（例如"red 500" & "purple A200”），如下所示：

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

{{"demo": "pages/style/color/Color.js", "hideHeader": true}}

## 颜色工具

要使用Material-UI 文档测试 [material.io/design/color](https://material.io/design/color/) 颜色方案，只需使用下面的调色板和滑块选择颜色即可。 或者，您可以在“主要”和“辅助”文本字段中输入十六进制值。

{{"demo": "pages/style/color/ColorTool.js", "hideHeader": true}}

颜色样本中显示的输出可以直接粘贴到 [`createMuiTheme()`](/customization/themes/#createmuitheme-options-theme) 函数中（与 [`MuiThemeProvider`](/customization/themes/#theme-provider)）：

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

只需要提供 `main` 阴影（除非您希望进一步自定义 `light` `dark` 或 `contrastText`），因为其他颜色将由 `createMuiTheme()`计算，如 [主题定制中所述](/customization/themes/#palette) 节。

如果您使用默认的主色调和/或次要色调，则通过提供颜色对象， `createMuiTheme()` 将使用材质颜色中适当的阴影，主色，浅色和深色。

### 官方色彩工具

Material Design团队还构建了一个很棒的调色板配置工具： [material.io/tools/color](https://material.io/tools/color/)。 这可以帮助您为UI创建调色板，以及测量任何颜色组合的可访问性级别。

<a href="https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336">
  <img src="/static/images/color/colorTool.png" alt="官方色彩工具" style="width: 574px" />
</a>

它的输出可以使用在`createMuiTheme()` 函数：

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

### 社区的工具

- [create-mui-theme](https://react-theming.github.io/create-mui-theme/) 是一款使用 Material Design 创建 Material-UI 主题的在线工具。
- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/) 一款只需要选择颜色即可为你的 Material-UI 应用生成主题的工具，同时还支持在线预览。
- [材质调色板生成器](https://material.io/inline-tools/color/)：“材质”调板生成器可用于为您输入的任何颜色生成调色板。