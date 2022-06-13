---
product: material-ui
title: App bar React component
components: AppBar, Toolbar, Menu
githubLabel: 'component: app bar'
materialDesign: https://material.io/components/app-bars-top
---

# App bar

<p class="description">The App bar displays information and actions relating to the current screen.</p>

The top App bar provides content and actions related to the current screen. 该组件常用于展示品牌、展示标题、提供导航和一些可操作的内容。

它既可以用作于转换为上下文相关的操作栏，又可以直接充当导航栏。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic App bar

{{"demo": "ButtonAppBar.js", "bg": true}}

## App bar with menu

{{"demo": "MenuAppBar.js", "bg": true}}

## App bar with responsive menu

{{"demo": "ResponsiveAppBar.js", "bg": true}}

## App bar with search field

侧边搜索栏。

{{"demo": "SearchAppBar.js", "bg": true}}

## Responsive App bar with Drawer

{{"demo": "DrawerAppBar.js", "bg": true,"iframe": true}}

## App bar with a primary search field

A primary searchbar.

{{"demo": "PrimarySearchAppBar.js", "bg": true}}

## Dense (desktop only)

{{"demo": "DenseAppBar.js", "bg": true}}

## Prominent

A prominent app bar.

{{"demo": "ProminentAppBar.js", "bg": true}}

## Bottom App bar

{{"demo": "BottomAppBar.js", "iframe": true, "maxWidth": 400}}

## Fixed placement

When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. Here are 3 possible solutions:

1. 使用 `position =“ sticky”` 代替 fixed。 ⚠️ sticky 不支持 IE11。
2. 可以渲染第二个 `<Toolbar />` 组件：

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* 内容 */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. 也可以用 `theme.mixins.toolbar` 的 CSS：

```jsx
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* 内容 */}</Toolbar>
      </AppBar>
      <Offset />
    </React.Fragment>
  );
}
```

## Scrolling

You can use the `useScrollTrigger()` hook to respond to user scroll actions.

### Hide App bar

The app bar hides on scroll down to leave more space for reading.

{{"demo": "HideAppBar.js", "iframe": true}}

### Elevate App bar

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "ElevateAppBar.js", "iframe": true}}

### 回到顶部

A floating action buttons appears on scroll to make it easy to get back to the top of the page.

{{"demo": "BackToTop.js", "iframe": true}}

### `useScrollTrigger([options]) => trigger`

#### 参数

1. `options` (_object_ [optional]):

   - `options.disableHysteresis` (_bool_ [optional])：默认值是 `false`。 禁用迟滞的效果。 在决定 `trigger` 的值时会忽略在滚动的方向。
   - `options.target` (_Node_ [optional])：默认值是 `window`。
   - `options.threshold` (_number_ [optional])：默认值是 `100`。 当垂直滚动恰好超过（但不包括）此阈值时，会改变 `trigger` 的值。

#### 返回结果

`trigger`: Does the scroll position match the criteria?

#### 例子

```jsx
import useScrollTrigger from '@mui/material/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hello</div>
    </Slide>
  );
}
```

## Enable color on dark

Following the [Material Design guidelines](https://material.io/design/color/dark-theme.html), the `color` prop has no effect on the appearance of the app bar in dark mode. You can override this behavior by setting the `enableColorOnDark` prop to `true`.

{{"demo": "EnableColorOnDarkAppBar.js", "bg": true}}
