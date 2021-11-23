# Theming 主题

<p class="description">Customize MUI with your theme. 你可以改变颜色、文字铸排等等。</p>

主题可以指定组件的配色、平面的明暗、阴影的深浅、墨水元素的合适的不透明度等等。

Themes let you apply a consistent tone to your app. It allows you to **customize all design aspects** of your project in order to meet the specific needs of your business or brand.

为了提高应用程序之间的一致性，你可以在明暗主题类型中选择。 默认情况下，组件会使用浅色的主题样式。

## ThemeProvider

如果你想要使用自定义的主题，那么需要使用 `MuiThemeProvider` 组件将样式注入到你的应用中。 However, this is optional; MUI components come with a default theme.

`ThemeProvider` 依赖于 [React 的上下文（context）功能](https://reactjs.org/docs/context.html)来将主题传递给下级组件，所以你需要确保 `ThemeProvider` 是你试图自定义组件的父级组件。 您可以在 [API 章节](#themeprovider)中了解有关此内容的更多信息 。

## 主题配置变量

Changing the theme configuration variables is the most effective way to match MUI to your needs. 以下各节涵盖了一些最重要的主题变量：

- [`.调色板`](/customization/palette/)
- [`.typography`](/customization/typography/)
- [`.spacing 间距`](/customization/spacing/)
- [`.breakpoints 断点`](/customization/breakpoints/)
- [`.zIndex`](/customization/z-index/)
- [`.过渡动画`](/customization/transitions/)
- [`.组件`](/customization/theme-components/)

您可以在[默认主题部分](/customization/default-theme/)查看完整的默认样式。

### 自定义变量

When using MUI's theme with the [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider), it can be convenient to add additional variables to the theme so you can use them everywhere. 就像这样：

```jsx
const theme = createTheme({
  status: {
    danger: orange[500],
  },
});
```

如果您使用的是 TypeScript，您还需要使用 [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) 来让主题接受上述值。

```tsx
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
```

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## Theme builder

<video autoPlay muted loop width="320">
  <source src="/static/studies.mp4" type="video/mp4" >
</video>

你 [可以访问](/styles/advanced/#accessing-the-theme-in-a-component) React 组件内部的主题变量。

- [mui-theme-creator](https://bareynol.github.io/mui-theme-creator/): A tool to help design and customize themes for the MUI component library. 包括基本的网站模板，并且展示各种组件及其受主题影响的方式。
- [Material palette generator](https://material.io/inline-tools/color/)：它可用于通过您输入的任何颜色生成一系列的调色板。

## 访问一个组件中的主题

你[可以访问](/styles/advanced/#accessing-the-theme-in-a-component) React 组件内部的主题变量。

## 嵌套主题

[您可以嵌套](/styles/advanced/#theme-nesting)多个主题提供者。

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

内部主题将 **覆盖** 外部主题。 你可以提供一个函数来扩展外层主题：

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

## API

### `createTheme(options, ...args) => theme`

根据接收的选项生成样式。 Then, pass it as a prop to [`ThemeProvider`](#themeprovider).

#### 参数

1. `options` (_object_): Takes an incomplete theme object and adds the missing parts.
2. `...args` (_object[]_): Deep merge the arguments with the about to be returned theme.

> Note: Only the first argument (`options`) is being processed by the `createTheme` function. If you want to actually merge two themes' options and create a new one based on them, you may want to deep merge the two options and provide them as a first argument to the `createTheme` function.

```js
import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';

const theme = createTheme(deepmerge(options1, options2));
```

#### 返回结果

`theme` (_object_): A complete, ready-to-use theme object.

#### 例子

```js
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
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

#### Theme composition: using theme options to define other options

When the value for a theme option is dependent on another theme option, you should compose the theme in steps.

```js
import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});
```

Think of creating a theme as a two-step composition process: first, you define the basic design options; then, you'll use these design options to compose other options (example above) or to override the design of specific components (example below).

```js
import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  shape: {
    borderRadius: 4,
  },
});

theme = createTheme(theme, {
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          // apply theme's border-radius instead of component's default
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

根据接收到的选项生成响应式的文字铸排设置。

#### 参数

1. `theme` (_object_): The theme object to enhance.
2. `options` (_object_ [optional]):

- `breakpoints` (_array\<string\>_ [optional]): Default to `['sm', 'md', 'lg']`. 一个 [breakpoints](/customization/breakpoints/) 的数组（identifiers）。
- `disableAlign` (_bool_ [optional]): Default to `false`. 字体大小是否略有变化，这样能够保持行高并与 Material Design 的 4px 行高网格相对齐。 这需要主题样式中的无单位行高度。
- `factor` (_number_ [optional]): Default to `2`. 此值决定了字体大小调整的强度。 值越高的话，在较小的屏幕上字体大小之间的差异就越小。 值越低的话，在较小屏幕上的字体就越大。 该值必须大于1。
- `variants` (_array\<string\>_ [optional]): Default to all. 需要处理的文字变体。

#### 返回结果

`theme` (_object_): The new theme with a responsive typography.

#### 例子

```js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

使用 `unstable_createMuiStrictModeTheme` 会限制某些组件的使用。

生成一个减少 [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) 内的警告数量的主题，类似于 `Warning: findDOMNode is deprecated in StrictMode`。

#### 要求

目前 `unstable_createMuiStrictModeTheme` 没有添加额外的要求。

#### 参数

1. `options` (_object_): Takes an incomplete theme object and adds the missing parts.
2. `...args` (_object[]_): Deep merge the arguments with the about to be returned theme.

#### 返回结果

`theme` (_object_): A complete, ready-to-use theme object.

#### 例子

```js
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </React.StrictMode>
  );
}
```

### `ThemeProvider`

This component takes a `theme` prop and applies it to the entire React tree that it is wrapping around. 最好在**您的组件树的根目录**中使用它。

#### 属性

| 名称                 | 类型                                       | 描述                                                                                                                                                                      |
|:------------------ |:---------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children&nbsp;\* | node                                     | 您的组件树。                                                                                                                                                                  |
| theme&nbsp;\*    | union:&nbsp;object&nbsp;&#124;&nbsp;func | A theme object, usually the result of [`createTheme()`](#createtheme-options-args-theme). The provided theme will be merged with the default theme. 您可以提供一个能够扩展外层主题的函数。 |

#### 例子

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

function App() {
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```
