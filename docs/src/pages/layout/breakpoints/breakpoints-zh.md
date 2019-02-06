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

## CSS 媒体查询

CSS 媒体查询是让 UI 具有响应性的惯用做法。 我们提供了四个 [CSS-in-JS](/customization/css-in-js/) 的工具函数来实现媒体查询:

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

## JavaScript媒体查询

有时, 使用 CSS 是不够的。 您可能希望基于 JavaScript 中的断点值更改 React 渲染树。

### useMediaQuery hook

您可以在 [useMediaQuery](/layout/use-media-query/) 页面上了解更多信息。

### withWidth()

> ⚠️[ useMediaQuery将弃用此高阶组件](/layout/use-media-query/)当React的钩子释放稳定时挂钩。

```jsx
import withWidth from '@material-ui/core/withWidth';

function MyComponent(props) {
  return <div>{`Current width: ${props.width}`}</div>;
}

export default withWidth()(MyComponent);
```

在下面的演示中，我们更改了渲染的DOM元素（*em* ，<u>u</u> ，~~ del ~~ & span）基于屏幕宽度。

{{"demo": "pages/layout/breakpoints/WithWidth.js"}}

#### Render Props

在某些情况下，您可以使用高阶组件体验属性名称冲突。 为避免这种情况，您可以使用[渲染道具](https://reactjs.org/docs/render-props.html)模式如下面的演示所示。

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

1. `key` （*String* | *Number* ）：断点键（`xs` ，`sm`等等）或以像素为单位的屏幕宽度数。

#### 返回结果

`media query` ：准备与JSS一起使用的媒体查询字符串。

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

1. `key` （*String* | *Number* ）：断点键（`xs` ，`sm`等等）或以像素为单位的屏幕宽度数。

#### 返回结果

`media query` ：准备与JSS一起使用的媒体查询字符串。

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

1. `key` （*String*）：断点键（`xs` ，`sm`等）。

#### 返回结果

`media query` ：准备与JSS一起使用的媒体查询字符串。

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

1. `start` （*String*）：断点键（`xs` ，`sm`等）。
2. `end` （*String*）：断点键（`xs` ，`sm`等）。

#### 返回结果

`media query` ：准备与JSS一起使用的媒体查询字符串。

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

注入`width`属性。 它不会修改传递给它的组件;相反，它返回一个新组件。 此 `宽度` 断点属性与当前屏幕宽度匹配。 它可以是以下断点之一：

```ts
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

一些可能有趣的实现细节：

- 它将转发*非 React 的静态* 属性，以便 HOC 更 "透明"。 例如，它可用于定义 ` getInitialProps()` 静态方法 (next.js)。

#### 参数

1. `选项` (*Object* [optional]): 
    - ` options.withTheme ` (*Boolean* [optional]): 默认值为 `false`。 将 ` theme ` 对象作为属性提供给组件。
    - `options.noSSR` (*Boolean* [optional]): 默认值为`false`。 为了执行服务器端呈现协调，它需要呈现两次。 第一次没有任何东西，第二次与孩子们在一起。 这种双遍渲染周期有一个缺点。 用户界面可能会闪烁。 如果不进行服务器端渲染，可以将此标志设置为 `true`。
    - `options.initialWidth` （*Breakpoint* [可选的]）： 为`window.innerWidth`在服务器上不可用， 我们默认在第一次安装期间呈现空组件。 您可能希望使用启发式来近似 客户端浏览器屏幕宽度的屏幕宽度。 例如，您可以使用用户代理或客户端提示。 https://caniuse.com/#search=client%20hint，我们还可以在主题上使用 [`自定义属性`](/customization/themes/#properties) 全局设置初始宽度 。 为了设置initialWidth，我们需要传递一个具有以下形状的自定义属性：

```js
const theme = createMuiTheme({
  props: {
    // withWidth component ⚛️
    MuiWithWidth: {
      // Initial width property
      initialWidth: 'lg', // 断点全局设置 
    },
  },
});
```

- ` options.resizeInterval ` （*数* [可选的]）：默认为166，对应于60 Hz的10帧。 响应屏幕调整大小事件之前等待的毫秒数。

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