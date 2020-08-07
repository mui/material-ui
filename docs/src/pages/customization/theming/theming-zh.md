# Theming 主题

<p class="description">定制属于你自己的 Material-UI 主题。 你可以改变颜色、文字铸排等等。</p>

主题可以指定组件的配色、平面的明暗、阴影的深浅、墨水元素的合适的不透明度等等。

通过使用主题，您可以给应用程序提供统一的风格。你也可以**自定义项目中所有的设计方面的内容**，这样可以满足您的企业或品牌的特定需求。

为了提高应用程序之间的一致性，你可以在明暗主题类型中选择。 默认情况下，组件会使用浅色的主题样式。

## ThemeProvider

如果你想要使用自定义的主题，那么需要使用 `MuiThemeProvider` 组件将样式注入到你的应用中。 但是，这是可选的；因为 Material-UI 组件带有默认主题。

`ThemeProvider` 依赖于 [React 的上下文（context）功能](https://reactjs.org/docs/context.html)来将主题传递给下级组件，所以你需要确保 `ThemeProvider` 是你试图自定义组件的父级组件。 您可以在 [API 章节](/styles/api/#themeprovider)中了解有关此内容的更多信息 。

## 主题配置变量

更改主题配置变量是将 Material-UI 与您的需求相匹配的最有效方法。 以下各节涵盖了一些最重要的主题变量：

- [Palette（调色）](/customization/palette/)
- [Typography（文字排版）](/customization/typography/)
- [Spacing（间距）](/customization/spacing/)
- [Breakpoints（断点）](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [Globals（全局变量）](/customization/globals/)

您可以在[默认主题部分](/customization/default-theme/)查看完整的默认样式。

### 自定义变量

当 Material-UI 的主题与[样式解决方案（styling solution）](/styles/basics/)或[任何其他解决方案](/guides/interoperability/#themeprovider)一起使用时，若您将额外的变量添加到主题中，这样就能便于在任何地方使用它们。 就像这样：

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## 访问一个组件中的主题

你[可以访问](/styles/advanced/#accessing-the-theme-in-a-component) React 组件内部的主题变量。

## 嵌套主题

[您可以嵌套](/styles/advanced/#theme-nesting)多个主题提供者。

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

内部主题将 **覆盖** 外部主题。 你可以提供一个函数来扩展外层主题：

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### 关于性能的一个说明

嵌套 `ThemeProvider` 组件的性能和 JSS 幕后的工作是息息相关的。 需要理解的要点是，注入的 CSS 是用下面的元组(tuple) `(styles, theme)` 缓存的。

- `theme`: 如果你在每次渲染时都提供了一个新的主题，一个新的 CSS 对象将会被生成并注入。 为了界面的一致性和性能，最好能渲染数量有限的主题对象。
- `样式`：样式对象越大，需要的运算就越多。

## API

### `createMuiTheme(options, ...args) => theme`

通过接收的选项生成一个主题基础。

#### 参数

1. `options`(*Object*)：采用不完整的主题对象并添加缺少的部分。
2. `...args` (*Array*)：将参数与即将返回的主题深度合并。

#### 返回结果

`theme` (*Object*)：一个完整的，随时可用的主题对象。

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

根据接收到的选项生成响应式的文字铸排设置。

#### 参数

1. `theme` (*Object*)：需要加强的主题对象。
2. `options` (*Object* [optional]):

- `breakpoints` (*Array\<String\>* [optional])：默认值为 `['sm', 'md', 'lg']`。 一个 [breakpoints](/customization/breakpoints/) 的数组（identifiers）。
- `disableAlign` (*Boolean* [optional]): 默认值为`false`。 字体大小是否略有变化，这样能够保持行高并与 Material Design 的 4px 行高网格相对齐。 这需要主题样式中的无单位行高度。
- ` factor ` (*Number* [optional]): 默认值是 `2`。 此值决定了字体大小调整的强度。 值越高的话，在较小的屏幕上字体大小之间的差异就越小。 值越低的话，在较小屏幕上的字体就越大。 该值必须大于1。
- `variants` (*Array\<String\>* [optional]): 默认值为 all。 需要处理的文字变体。

#### 返回结果

`theme` (*Object*)：返回一个响应式排版的新主题。

#### 示例

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**警告**：请不要在生产环境中使用该方法。

生成一个减少 [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) 内的警告数量的主题，类似于 `Warning: findDOMNode is deprecated in StrictMode`。

#### 要求

使用 `unstable_createMuiStrictModeTheme` 会限制某些组件的使用。

##### `component` 属性

以下使用`组件（component）`属性的组件需要中需要转发其 ref：

- [`Collapse 折叠`](/api/collapse/)

否则你会收到这样的错误 `Error: Function component cannot be given refs`。 参见： [Composition: Caveat with refs](/guides/composition/#caveat-with-refs)。

##### `children` 属性

在 `子组件（children）` 属性中使用的组件需要转发其 ref：

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

否则组件的动画将不会正常显示，你会得到这样的警告 `Function components cannot be given refs`。

#### 部分禁用严格模式（StrictMode）兼容性

如果你仍然能收到 `Error: Function component cannot be given refs` 这样的错误，那么你可能使用的是第三方组件，而之前所提到的修复方法并不适用于它。 你可以通过应用 `disableStrictModeCompat` 来修复此问题。 您将再次看到废弃警告，但它们只是警告，而 `Function component cannot be given refs` 实际上打破了我们组件的记录行为。

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

1. `options`(*Object*)：采用不完整的主题对象并添加缺少的部分。
2. `...args` (*Array*)：将参数与即将返回的主题深度合并。

#### 返回结果

`theme` (*Object*)：一个完整的，随时可用的主题对象。

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