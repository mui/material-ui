---
title: React App Bar（应用栏）组件
components: AppBar, Toolbar, Menu
githubLabel: 'component: AppBar'
materialDesign: https://material.io/components/app-bars-top
---

# App Bar 应用栏

<p class="description">应用栏组件展示了与当前屏幕息息相关的信息和操作。</p>

而顶部应用栏（App Bar）则提供与当前屏幕相关的内容和操作。 该组件常用于展示品牌、展示标题、提供导航和一些可操作的内容。

它既可以用作于转换为上下文相关的操作栏，又可以直接充当导航栏。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic App Bar

{{"demo": "pages/components/app-bar/ButtonAppBar.js", "bg": true}}

## App Bar with menu

{{"demo": "pages/components/app-bar/MenuAppBar.js", "bg": true}}

## App Bar with responsive menu

{{"demo": "pages/components/app-bar/ResponsiveAppBar.js", "bg": true}}

## 带有搜索输入框的应用栏

A side searchbar.

{{"demo": "pages/components/app-bar/SearchAppBar.js", "bg": true}}

## App Bar with a primary search field

A primary searchbar.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js", "bg": true}}

## Dense (desktop only)

{{"demo": "pages/components/app-bar/DenseAppBar.js", "bg": true}}

## Prominent

A prominent app bar.

{{"demo": "pages/components/app-bar/ProminentAppBar.js", "bg": true}}

## Bottom App Bar

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 400}}

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

### 隐藏应用栏

The app bar hides on scroll down to leave more space for reading.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true}}

### 变高的应用栏

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true}}

### 回到顶部

A floating action buttons appears on scroll to make it easy to get back to the top of the page.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true}}

### `useScrollTrigger([options]) => trigger`

#### 参数

1. `options` (_object_ [optional]):

   - `options.disableHysteresis` (_bool_ [optional])：默认值是 `false`。 禁用迟滞的效果。 在决定 `trigger` 的值时会忽略在滚动的方向。
   - `options.target` (_Node_ [optional])：默认值是 `window`。
   - `options.threshold` (_number_ [optional])：默认值是 `100`。 严格来说，当垂直滚动超过（但不包括）此阈值时，请更改 `trigger` 的值。

#### 返回结果

`trigger`: Does the scroll position match the criteria?

#### 例子

```jsx
import useScrollTrigger from '@mui/material/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>你好</div>
    </Slide>
  );
}
```

## Enable color on dark

Following the [Material Design guidelines](https://material.io/design/color/dark-theme.html), the `color` prop has no effect on the appearance of the app bar in dark mode. You can override this behavior by setting the `enableColorOnDark` prop to `true`.

{{"demo": "pages/components/app-bar/EnableColorOnDarkAppBar.js", "bg": true}}
