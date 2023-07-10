# Breakpoints 断点

<p class="description">能够在各种情况下使用断点的 API。</p>

为了获得最佳的用户体验，在不同的断点下，Material Design 的接口需要适应它们的布局。 MUI 使用原始[规范](https://m2.material.io/design/layout/responsive-layout-grid.html#breakpoints)的**简化**实现。

The breakpoints are used internally in various components to make them responsive, but you can also take advantage of them for controlling the layout of your application through the [Grid](/material-ui/react-grid/) component.

## 默认的断点

每个断点（一个键）匹配了一个_固定_的屏幕宽度（一个值）：

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

- **xs，**超小（extra-small）：0px
- **sm，**小（small）：600px
- **md，**中（medium）：900px
- **lg，**大（large）：1200px
- **xl，**超大（extra-large）：1536px

这些值可以是 [定制](#custom-breakpoints) 的。

## CSS 媒体查询（Media queries）

CSS media queries 是一种做出响应式的用户界面的特有方法。 而 theme 提供了五种样式的辅助方式：

- [theme.breakpoints.up(key)](#theme-breakpoints-up-key-media-query)
- [theme.breakpoints.down(key)](#theme-breakpoints-down-key-media-query)
- [theme.breakpoints.only(key)](#theme-breakpoints-only-key-media-query)
- [theme.breakpoints.not(key)](#theme-breakpoints-not-key-media-query)
- [theme.breakpoints.between(start, end)](#theme-breakpoints-between-start-end-media-query)

在下面的演示中，我们根据屏幕宽度来更改背景颜色 (红色、蓝色和绿色)。

```jsx
const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: green[500],
    },
  },
});
```

{{"demo": "MediaQuery.js"}}

## JavaScript 媒体查询

有的时候，仅使用 CSS 是远远不够的。 您可能会有基于 JavaScript 中的断点值来更改 React 渲染树的需求。

### useMediaQuery 钩子（Hook）

You can learn more on the [useMediaQuery](/material-ui/react-use-media-query/) page.

## 自定义断点

您可以选择在 theme 中的 `theme.breakpoints` 部分定义项目的断点。

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

- [`theme.breakpoints.values`](/material-ui/customization/default-theme/?expand-path=$.breakpoints.values): Default to the [above values](#default-breakpoints). 键值（key）为屏幕的名字（screen names），而值（values）是该断点应开始的最小宽度。
- `theme.breakpoints.unit`：默认为 `px`。 这个用于断点值的单位。
- `theme.breakpoints.step`：默认为 5 (`0.05px`)。 这个增量除以 100 用于实现专用的断点。 例如，`{ step: 5 }` 意味着 `down(500)` 的结果为 `'(max-width: 499.95px)'`。

如果您需要更改断点的默认值，则需要提供所有的断点值：

```jsx
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
```

您可以随意设置任意数量的断点，并且也可以在项目中以您喜欢的任何方式为断点命名。

```js
const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});
```

If you are using TypeScript, you would also need to use [module augmentation](/material-ui/guides/typescript/#customization-of-theme) for the theme to accept the above values.

<!-- Tested with packages/mui-material/test/typescript/breakpointsOverrides.augmentation.tsconfig.json -->

```ts
declare module '@mui/core/styles' {
  interface BreakpointOverrides {
    xs: false; // 移除 `xs` 断点
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // 添加 `mobile` 断点
    tablet: true;
    laptop: true;
    desktop: true;
  }
}
```

## API

### `theme.breakpoints.up(key) => media query`

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

#### 参数

1. `key`（_string_ | _number_）：以像素为单位的一个断点键（`xs` ，`sm` 等）或者屏幕的一个宽度。

#### 返回值

`media query`：一个媒体查询字符串，适用于大多数的样式解决方案，它匹配的屏幕宽度大于（包含）断点键给出的屏幕尺寸。

#### 示例

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // 匹配 [md, ∞)
    //      [900px, ∞)
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.down(key) => media query`

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

#### 参数

1. `key`（_string_ | _number_）：以像素为单位的一个断点键（`xs` ，`sm` 等）或者屏幕的一个宽度。

#### 返回值

`media query`：一个媒体查询字符串，适用于大多数的样式解决方案，它匹配的屏幕宽度小于（不包含）断点键给出的屏幕尺寸。

#### 示例

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // 匹配 [0, md)
    //      [0, 900px)
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.only(key) => media query`

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

#### 参数

1. `key`（_string_）：一个断点键（`xs`，`sm` 等）。

#### 返回值

`media query`：一个媒体查询字符串，适用于大多数的样式解决方案，它会匹配屏幕宽度，从断点键（包含）给出的屏幕尺寸开始，到下一个断点键（不包含）给出的屏幕尺寸停止。

#### 示例

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // 匹配 [md, md + 1)
    //      [md, lg)
    //      [900px, 1200px)
    [theme.breakpoints.only('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.not(key) => media query`

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

#### 参数

1. `key`（_string_）：一个断点键（`xs`，`sm` 等）。

#### 返回值

`media query`：一个媒体查询字符串，适用于大多数的样式解决方案，它会匹配屏幕宽度，停止在断点键（不包含）给定的屏幕尺寸，并从下一个断点键（包含）给定的屏幕尺寸开始。

#### 示例

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // 匹配 [xs, md) and [md + 1, ∞)
    //      [xs, md) and [lg, ∞)
    //      [0px, 900px) and [1200px, ∞)
    [theme.breakpoints.not('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.between(start, end) => media query`

<!-- Keep in sync with packages/mui-system/src/createTheme/createBreakpoints.d.ts -->

#### 参数

1. `start`（_string_）：以像素为单位的一个断点键（`xs` ，`sm` 等）或者屏幕的一个宽度。
2. `end`（_string_）：以像素为单位的一个断点键（`xs` ，`sm` 等）或者屏幕的一个宽度。

#### 返回值

`media query`：一个媒体查询字符串，适用于大多数的样式解决方案，它匹配的屏幕宽度大于第一个参数（包含）中断点键给出的屏幕尺寸，小于第二个参数（不包含）中断点键给出的屏幕尺寸。

#### 示例

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // 匹配 [sm, md)
    //      [600px, 900px)
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: 'red',
    },
  },
});
```

## 默认值

You can explore the default values of the breakpoints using [the theme explorer](/material-ui/customization/default-theme/?expand-path=$.breakpoints) or by opening the dev tools console on this page (`window.theme.breakpoints`).
