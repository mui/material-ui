# Breakpoints 断点

<p class="description">API 解锁了各种情况下断点的使用。</p>

为了获得最佳的用户体验，在不同的断点下，material design 的接口需要适应它们的布局。 Material-UI 使采用了最初的 [规范](https://material.io/design/layout/responsive-layout-grid.html#breakpoints) 的**简化**实现。

不同组件内部也使用了断点来实现响应式的布局，同时借助于 [Grid](/components/grid/) 和 [Hidden](/components/hidden/) 组件，你也可以用其来控制应用的布局。

## 默认的断点

每个断点（一个键）匹配了一个*固定*的屏幕宽度（一个值）：

- ** xs， ** 超小：0px
- ** sm， **小：600px
- ** md， **中等：960px
- ** lg， **大：1280px
- ** xl， **超大：1920px

这些断点值用于确定断点范围。 一个断点范围包含了起始的断点值，不包含终止的断点值。

```js
value         |0px     600px    960px    1280px   1920px
key           |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
```

这些值可以是 [定制](#custom-breakpoints) 的。

## CSS 媒体查询（Media queries）

CSS media queries 是一种做出响应式的用户界面的特有方法。 而 theme 提供了四种样式的辅助方式：

- [theme.breakpoints.up(key)](#theme-breakpoints-up-key-media-query)
- [theme.breakpoints.down(key)](#theme-breakpoints-down-key-media-query)
- [theme.breakpoints.only(key)](#theme-breakpoints-only-key-media-query)
- [theme.breakpoints.between(start, end)](#theme-breakpoints-between-start-end-media-query)

在下面的演示中，我们根据屏幕宽度来更改背景颜色 (红色、蓝色和绿色)。

```jsx
const styles = theme => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
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

{{"demo": "pages/customization/breakpoints/MediaQuery.js"}}

## JavaScript 媒体查询

有的时候，仅使用 CSS 是远远不够的。 您可能会有基于 JavaScript 中的断点值来更改 React 渲染树的需求。

### useMediaQuery hook

您可以在 [userMediaQuery](/components/use-media-query/) 页面上了解更多信息。

### withWidth()

> ⚠️ 有了 [useMediaQuery](/components/use-media-query/) hook，这个高阶组件（higher-order component）将被弃用。

```jsx
import withWidth from '@material-ui/core/withWidth';

function MyComponent(props) {
  return <div>{`当前宽度: ${props.width}`}</div>;
}

export default withWidth()(MyComponent);
```

在下面的演示中，我们基于屏幕宽度更改了渲染的DOM元素 (*em* ，<u>u</u> ，~~del~~ & span)。

{{"demo": "pages/customization/breakpoints/WithWidth.js"}}

## 自定义断点

您可以选择在 theme 中的 `theme.breakpoints` 部分定义项目的断点。

- [`theme.breakpoints.values`](/customization/default-theme/?expand-path=$.breakpoints.values)：默认为 [以上值](#default-breakpoints)。 键值（key）为屏幕的名字（screen names），而值（values）是该断点应开始的最小宽度。
- `theme.breakpoints.unit`：默认为 `px`。 这个用于断点值的单位。
- `theme.breakpoints.step`：默认为 5 (`0.05px`)。 这个增量用于实现专用的断点。

如果您需要更改断点的默认值，则需要提供所有的断点值：

```jsx
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})
```

您可以随意设置任意数量的断点，并且也可以在项目中以您喜欢的任何方式为断点命名。

```js
const theme = createMuiTheme({
  breakpoints: {
    values: {
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});
```

如果您使用的是 TypeScript，您还需要使用 [module augmentation](/guides/typescript/#customization-of-theme) 来让主题接受上述值。

```ts
declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xs: false; // 移除 `xs` 断点
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true; // 添加 `tablet` 断点
    laptop: true;
    desktop: true;
  }
}
```

## API

### `theme.breakpoints.up(key) => media query`

#### 参数

1. `key` (*String* | *Number*):：以像素为单位的一个断点键（`xs` ，`sm`等等）或者屏幕的一个宽度。

#### 返回结果

`media query`：一个可用于大多数样式解决方案的媒体查询字符串，若提供一个端点键，它可以匹配大于或等于屏幕大小的屏幕宽度值。

#### 例子

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, ∞)
    //       [960px, ∞)
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.down(key) => media query`

#### 参数

1. `key` (*String* | *Number*):：以像素为单位的一个断点键（`xs` ，`sm`等等）或者屏幕的一个宽度。

#### 返回结果

`media query`：一个可用于大多数样式解决方案的媒体查询字符串，若提供一个端点键，它可以匹配小于或等于屏幕大小的屏幕宽度值。

#### 例子

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [0, md + 1)
    //       [0, lg)
    //       [0, 1280px)
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.only(key) => media query`

#### 参数

1. `key` (*String*)：一个断点键（`xs` ，`sm` 等）。

#### 返回结果

`media query`: 一个可用于大多数样式解决方案的媒体查询字符串，它可以将断点的键与包含屏幕大小的屏幕宽度设置相匹配。

#### 例子

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, md + 1)
    //       [md, lg)
    //       [960px, 1280px)
    [theme.breakpoints.only('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.between(start, end) => media query`

#### 参数

1. `start` (*String*)：以像素为单位的一个断点键（`xs` ，`sm`等等）或者屏幕的一个宽度。
2. `end` (*String*)：以像素为单位的一个断点键（`xs` ，`sm`等等）或者屏幕的一个宽度。

#### 返回结果

`media query`: 一个可用于大多数样式解决方案的媒体查询字符串，它匹配的屏幕宽度范围在大于第一个参数中断点键给出的屏幕尺寸，小于第二个参数中断点键给出的屏幕尺寸。

#### 例子

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [sm, md + 1)
    //       [sm, lg)
    //       [600px, 1280px[
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `withWidth([options]) => higher-order component`

注入一个 `width` 属性。 它不会修改传递给它的组件；相反，它会返回一个新组件。 这个 `width` 断点属性与当前屏幕宽度相匹配。 它可以是以下断点之一：

```ts
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

你可能会注意到一些有趣的细节：

- 它将转发*非 React 的静态* 属性，这样一来 HOC 会更加 "透明"。 例如，您可以用它来定义一个 `getInitialProps()` 的静态方法 (next.js)。

#### 参数

1. `options` (*Object* [optional]): 
  - `options.withTheme` (*Boolean* [optional])：默认值为 `false`。 将 `theme` 对象作为一个属性提供给组件。
  - `options.noSSR` (*Boolean* [optional])：默认值为 `false`。 为了呈现服务器端渲染的协调性，我们需要将它渲染两次。 第一次什么也没渲染，第二次与子组件一起渲染。 这个双向渲染周期带有一个缺点。 UI 会有闪烁。 如果你不进行服务器端渲染，那么可以将此标志设置为 `true`。
  - `options.initialWidth` (*Breakpoint* [optional])：鉴于在服务器端 `window.innerWidth` 是无法获取的，我们将在第一次渲染时默认加载一个空的组件。 您可以使用启发式的方法来推算近似客户端浏览器屏幕宽度的屏幕宽度。 例如：您可以使用 user-agent 或 client-hints。 https://caniuse.com/#search=client%20hint，我们也可以在主题上使用 [`自定义属性`](/customization/globals/#default-props) 来设置全局的初始宽度。 若想设置 initialWidth，我们需要传递一个类似于这样的自定义属性：

```js
const theme = createMuiTheme({
  props: {
    // 带宽度（withWidth）的组件 ⚛️
    MuiWithWidth: {
      // 初始宽度属性
      initialWidth: 'lg', // 在全局范围内设置的断点 🌎!
    },
  },
});
```

- `options.resizeInterval` (*Number* [optional])：默认值为 166，对应于 60 Hz 的 10 帧。 响应屏幕调整大小事件前等待的毫秒数。

#### 返回结果

`higher-order component`：应用于包装组件。

#### 例子

```jsx
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

function MyComponent(props) {
  if (isWidthUp('sm', props.width)) {
    return <span />
  }

  return <div />;
}

export default withWidth()(MyComponent);
```

## 默认值

您可以使用 [主题资源管理器（theme explorer）](/customization/default-theme/?expand-path=$.breakpoints) 或通过打开此页面上的开发工具控制台（dev tools console）（`window.theme.breakpoints`）来探索断点的一些默认值。