# 断点

<p class="description">断点是为了满足特定的布局需要而对预设的各种屏幕大小进行标识的范围。</p>

为了获得最佳的用户体验，material design 的接口需要在各种断点范围下自适应布局需要。 Material-UI 使用了原先 [specification](https://material.io/design/layout/responsive-layout-grid.html#breakpoints) 的 **简化** 实现。

每个断点都与 * 固定 * 屏幕宽度匹配:

- ** xs **, 超小: 0px 或更大
- ** sm **, 小: 600px 或更大
- ** md **, 中等: 960px 或更大
- ** lg **, 大: 1280px 或更大
- ** xl **, 超大: 1920px 或更大

这些值可以自定义。 这些值被用于主题设定，你可以在 [`breakpoints.values`](/customization/default-theme/?expend-path=$.breakpoints.values) 对象上找到它们。

许多组件内部都使用了断点来实现响应式要求，同时你也可以利用断点来控制应用的布局，这可借助于 [Grid](/layout/grid/) 和 [Hidden](/layout/hidden/) 组件。

## CSS Media Queries

CSS 媒体查询是让 UI 具有响应性的惯用做法。 We provide four [CSS-in-JS](/customization/css-in-js/) helpers to do so:

- [theme.breakpoints.up(key)](#theme-breakpoints-up-key-media-query)
- [theme.breakpoints.down(key)](#theme-breakpoints-down-key-media-query)
- [theme.breakpoints.only(key)](#theme-breakpoints-only-key-media-query)
- [theme.breakpoints.between(start, end)](#theme-breakpoints-between-start-end-media-query)

在下面的演示中, 我们根据屏幕宽度更改背景颜色 (红色、蓝色和绿色)。

```jsx
const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
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

{{"demo": "pages/layout/breakpoints/MediaQuery.js"}}

## JavaScript Media Queries

有时, 使用 CSS 是不够的。 您可能希望基于 JavaScript 中的断点值更改 React 渲染树。

### useMediaQuery hook

You can learn more on the [useMediaQuery](/layout/use-media-query/) page.

### withWidth()

> ⚠️ This higher-order component will be deprecated for the [useMediaQuery](/layout/use-media-query/) hook when the React's hooks are released as stable.

```jsx
import withWidth from '@material-ui/core/withWidth';

function MyComponent(props) {
  return <div>{`Current width: ${props.width}`}</div>;
}

export default withWidth()(MyComponent);
```

In the following demo, we change the rendered DOM element (*em*, <u>u</u>, ~~del~~ & span) based on the screen width.

{{"demo": "pages/layout/breakpoints/WithWidth.js"}}

#### Render Props

In some cases, you can experience property name collisions using higher-order components. To avoid this, you can use the [render props](https://reactjs.org/docs/render-props.html) pattern shown in the following demo.

```jsx
import Typography from '@material-ui/core/Typography';
import toRenderProps from 'recompose/toRenderProps';

const WithWidth = toRenderProps(withWidth());

export default function MyComponent() {
  return (
    <WithWidth>
      {({ width }) => <div>{`Current width: ${width}`}</div>}
    </WithWidth>
  );
}
```

{{"demo": "pages/layout/breakpoints/RenderPropsWithWidth.js"}}

## API

### `theme.breakpoints.up(key) => media query`

#### 参数

1. `key` (*String* | *Number*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixels.

#### 返回结果

`media query`: A media query string ready to be used with JSS.

#### 例子

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, ∞[
    //       [960px, ∞[
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.down(key) => media query`

#### 参数

1. `key` (*String* | *Number*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixels.

#### 返回结果

`media query`: A media query string ready to be used with JSS.

#### 例子

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [0, md + 1[
    //       [0, lg[
    //       [0, 1280px[
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.only(key) => media query`

#### 参数

1. `key` (*String*): A breakpoint key (`xs`, `sm`, etc.).

#### 返回结果

`media query`: A media query string ready to be used with JSS.

#### 例子

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, md + 1[
    //       [md, lg[
    //       [960px, 1280px[
    [theme.breakpoints.only('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.between(start, end) => media query`

#### 参数

1. `start` (*String*): A breakpoint key (`xs`, `sm`, etc.).
2. `end` (*String*): A breakpoint key (`xs`, `sm`, etc.).

#### 返回结果

`media query`: A media query string ready to be used with JSS.

#### 例子

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [sm, md + 1[
    //       [sm, lg[
    //       [600px, 1280px[
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `withWidth([options]) => higher-order component`

Inject a `width` property. It does not modify the component passed to it; instead, it returns a new component. This `width` breakpoint property match the current screen width. It can be one of the following breakpoints:

```ts
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

一些可能有趣的实现细节：

- 它将转发 *non React static* 属性, 以便 HOC 更 "透明"。 例如, 它可用于定义 ` getInitialProps()` 静态方法 (next.js)。

#### 参数

1. `选项` (*Object* [optional]): 
    - `options.withTheme` (*Boolean* [optional]): 默认值为`false`。 将 ` theme ` 对象作为属性提供给组件。
    - `options.noSSR` (*Boolean* [optional]): Defaults to `false`. In order to perform the server-side rendering reconciliation, it needs to render twice. A first time with nothing and a second time with the children. This double pass rendering cycle comes with a drawback. The UI might blink. You can set this flag to `true` if you are not doing server-side rendering.
    - `options.initialWidth` (*Breakpoint* [optional]): As `window.innerWidth` is unavailable on the server, we default to rendering an empty component during the first mount. You might want to use an heuristic to approximate the screen width of the client browser screen width. For instance, you could be using the user-agent or the client-hints. https://caniuse.com/#search=client%20hint, we also can set the initial width globally using [`custom properties`](/customization/themes/#properties) on the theme. In order to set the initialWidth we need to pass a custom property with this shape:

```js
const theme = createMuiTheme({
  props: {
    // withWidth component ⚛️
    MuiWithWidth: {
      // Initial width property
      initialWidth: 'lg', // Breakpoint being globally set 
    },
  },
});
```

- `options.resizeInterval` (*Number* [optional]): Defaults to 166, corresponds to 10 frames at 60 Hz. Number of milliseconds to wait before responding to a screen resize event.

#### 返回结果

`higher-order component`：应用于包装组件。

#### 例子

```jsx
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

class MyComponent extends React.Component {
  render () {
    if (isWidthUp('sm', this.props.width)) {
      return <span />
    }

    return <div />;
  }
}

export default withWidth()(MyComponent);
```