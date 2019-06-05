# 主题

<p class="description">定制自己的 Material-UI 主题， 您可以更改颜色，排版等等。</p>

主题可以指定组件的配色、平面的明暗、阴影的深浅、墨水元素适当的不透明度等。

样式可让您为应用程序应用一致的音调。它可以让你 **自定义所有的设计方面** 项目，以满足您的企业或品牌的特定需求。

为了提高应用程序之间的一致性，可以选择明暗样式类型。 默认情况下，组件使用浅色样式类型。

## ThemeProvider

如果你想要自定义样式，则需要使用 `MuiThemeProvider` 组件才能将样式注入到你的应用中。 但是，这是可选的，因为 Material-UI 组件带有默认主题。

`MuiThemeProvider` 依赖于React的Context上下文将样式传递给组件， 因此您需要确保 `MuiThemeProvider` 是您想要自定义的组件的父级元素。 您可以在 [API 章节](/styles/api/#themeprovider) 中了解有关此内容的更多信息 。

## 主题配置变量

更改主题配置变量是将Material-UI与您的需求相匹配的最有效方法。 以下列出了一些重要的样式变量：

- [调色板](/customization/palette/)
- [Typography（文字排版）](/customization/typography/)
- [间距](/customization/spacing/)
- [断点](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [全局变量](/customization/globals/)

您可以查看[默认样式部分](/customization/default-theme/)完整查看默认样式。

### 自定义变量

When using Material-UI's theme with our [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider). 可以方便地向样式添加其他变量，以便您可以在任何地方使用它们。 例如：

{{"demo": "pages/customization/themes/CustomStyles.js"}}

## 访问组件中的主题

You [can access](/styles/advanced/#accessing-the-theme-in-a-component) the theme variables inside your React components.

## Nesting the theme

[You can nest](/styles/advanced/#theme-nesting) multiple theme providers.

{{"demo": "pages/customization/themes/ThemeNesting.js"}}

内的主题将 **倍率** 外的主题。 您可以通过提供一个函数来扩展外部主题：

{{"demo": "pages/customization/themes/ThemeNestingExtend.js"}}

### 关于性能

The performance implications of nesting the `ThemeProvider` component are linked to JSS's work behind the scenes. The main point to understand is that the injected CSS is cached with the following tuple `(styles, theme)`.

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

### `responsiveFontSizes(theme, options) => theme`

Generate responsive typography settings based on the options received.

#### 参数

1. `theme` (*Object*): The theme object to enhance.
2. `options` (*Object* [optional]):

- `breakpoints` (*Array<string>* [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/customization/breakpoints/) (identifiers).
- `disableAlign` (*Boolean* [optional]): Default to `false`. Whether font sizes change slightly so line heights are preserved and align to Material Design's 4px line height grid. This requires a unitless line height in the theme's styles.
- `factor` (*Number* [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens. The lower the value, the bigger font sizes for small screens. The value must me greater than 1.
- `variants` (*Array<string>* [optional]): Default to all. The typography variants to handle.

#### 返回结果

`theme` (*Object*): The new theme with a responsive typography.

#### 例子

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```