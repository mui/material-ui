# 主题

<p class="description">定制自己的 Material-UI 主题， 你可以改变颜色、排版等等</p>

主题可以指定组件的配色、平面的明暗、阴影的深浅、墨水元素适当的不透明度等。

样式可让您为应用程序应用一致的音调。它可以让你 **自定义所有的设计方面** 项目，以满足您的企业或品牌的特定需求。

为了提高应用程序之间的一致性，可以选择明暗样式类型。 默认情况下，组件使用浅色样式类型。

## ThemeProvider

如果你想要自定义样式，则需要使用 `MuiThemeProvider` 组件才能将样式注入到你的应用中。 但是，这是可选的，因为 Material-UI 组件带有默认主题。

`ThemeProvider` 依赖于 [React 的上下文(context) 功能 ](https://reactjs.org/docs/context.html) 来将主题向下应用给组件，所以你需要确保 `ThemeProvider` 是你试图自定义组件的父级。 您可以在 [API 章节](/styles/api/#themeprovider) 中了解有关此内容的更多信息 。

## 主题配置变量

更改主题配置变量是将Material-UI与您的需求相匹配的最有效方法。 以下列出了一些重要的样式变量：

- [Palette 调色](/customization/palette/)
- [Typography](/customization/typography/)
- [Spacing 间距](/customization/spacing/)
- [断点](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [全局样式](/customization/globals/)

您可以查看[默认样式部分](/customization/default-theme/)完整查看默认样式。

### 自定义变量

当 Material-UI 的主题与 [样式解决方案](/styles/basics/) 或 [任何其他解决方案](/guides/interoperability/#themeprovider) 一起使用时，你可以方便地将额外的变量添加到主题中，这样你就可以随处使用它。 就像这样：

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## 访问组件中的主题

你 [可以访问](/styles/advanced/#accessing-the-theme-in-a-component) React 组件内部的主题变量。

## 嵌套主题

[您可以嵌套](/styles/advanced/#theme-nesting)多个主题提供者。

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

内部主题将 **覆盖** 外部主题。 你可以提供一个函数来扩展外部主题：

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### 关于性能

嵌套 `ThemeProvider` 组件的性能受到 JSS 幕后工作的影响。 需要理解的要点是，注入的 CSS 是用下面的元组(tuple) `(styles, theme)` 缓存的。

- `theme`: 每次渲染时，如果你提供了一个新的主题，一个新的CSS对象将会被生成并注入。 不管是为了更统一的UI风格还是性能，都应该尽量不要每次生成新的主题 object。
- `styles`: 样式 object 越大，需要的运算越多。

## API

### `createMuiTheme(options, ...args) => theme`

根据接收的选项生成样式。

#### 参数

1. `options` （*Object*）：采用不完整的主题对象并添加缺少的部分。
2. `...args` (*Array*): 将参数与即将返回的主题深度合并(deep merge)。

#### 返回结果

`theme` （*Object*）：一个完整的，随时可用的主题对象。

#### 示例

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

根据接收到的选项生成响应式的排版设置。

#### 参数

1. `theme` (*Object*): 要增强的主题对象。
2. `options` (*Object* [optional]):

- `breakpoints` (*Array\<String\>* [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/customization/breakpoints/) (identifiers).
- `disableAlign` (*Boolean* [optional]): Default to `false`. Whether font sizes change slightly so line heights are preserved and align to Material Design's 4px line height grid. This requires a unitless line height in the theme's styles.
- `factor` (*Number* [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens. The lower the value, the bigger font sizes for small screens. 该值必须大于1。
- `variants` (*Array\<String\>* [optional]): Default to all. The typography variants to handle.

#### 返回结果

`theme` (*Object*): 响应式排版的新主题。

#### 示例

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**警告**：不要在生产环境中使用该方法。

生成一个主题，该主题减少 [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) 内的警告数量，类似于 `Warning: findDOMNode is deprecated in StrictMode`。

#### 要求

使用 `unstable_createMuiStrictModeTheme` 会限制某些组件的使用。

##### `component` 属性

在 `组件(component)` 属性中使用的组件需要转发其 ref：

- [`Collapse 折叠`](/api/collapse/)

否则你会收到 `Error: Function component cannot be given refs` 错误。 参见： [Composition: Caveat with refs](/guides/composition/#caveat-with-refs)。

##### `children` 属性

在 `子组件(children)` 属性中使用的组件需要转发其 ref：

- [`Fade 淡入淡出`](/api/fade/)
- [`Grow 扩展`](/api/grow/)
- [`Zoom 放大`](/api/zoom/)

```diff
-function TabPanel(props) {
+const TabPanel = React.forwardRef(function TabPanel(props, ref) {
  return <div role="tabpanel" {...props} ref={ref} />;
-}
+});

function Tabs() {
  return <Fade><TabPanel>...</TabPanel></Fade>;
}
```

否则组件的动画将不会正常显示，你会收到 `Function components cannot be given refs` 警告。

#### 部分禁用严格模式(StrictMode) 兼容性

如果你仍然能收到 `Error: Function component cannot be given refs` 错误，那么你可能使用的是第三方组件，而之前所提到的修复方法并不适用它。 你可以通过应用 `disableStrictModeCompat` 来修复此问题。 You'll see deprecation warnings again but these are only warnings while `Function component cannot be given refs` actually breaks the documented behavior of our components.

```diff
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

function ThirdPartyTabPanel(props) {
  return <div {...props} role="tabpanel">
}

const theme = unstable_createMuiStrictModeTheme();

function Fade() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>

-        <Fade>
+        <Fade disableStrictModeCompat>
          <ThirdPartyTabPanel />
        </Fade>
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```

#### 参数

1. `options` （*Object*）：采用不完整的主题对象并添加缺少的部分。
2. `...args` (*Array*): 将参数与即将返回的主题深度合并(deep merge)。

#### 返回结果

`theme` （*Object*）：一个完整的，随时可用的主题对象。

#### 例子

```js
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```