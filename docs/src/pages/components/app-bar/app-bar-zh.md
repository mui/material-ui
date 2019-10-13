---
title: React App Bar（应用栏）组件
components: AppBar, Toolbar, Menu
---

# App Bar（应用栏）

<p class="description">应用栏用来显示与当前屏幕相关的信息和操作。</p>

[顶部应用栏](https://material.io/design/components/app-bars-top.html) 提供与当前屏幕相关的内容和操作。 它用于展示品牌、屏幕标题、导航和操作选项。

它可以转换为上下文相关的操作栏或直接用作导航栏。

## 简单的应用栏

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## 带一个主搜索输入框的应用栏

一个主要搜索栏。

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## 带有菜单的应用栏

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## 带有搜索输入框的应用栏

一个侧边搜索栏。

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## 紧凑模式 (仅限桌面模式)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Prominent

A prominent app bar.

{{"demo": "pages/components/app-bar/ProminentAppBar.js"}}

## Bottom App Bar

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Fixed placement

When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. Here are 3 possible solutions:

1. You can use `position="sticky"` instead of fixed. ⚠️ sticky is not supported by IE 11.
2. You can render a second `<Toolbar />` component:

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. You can use `theme.mixins.toolbar` CSS:

```jsx
const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  )
};
```

## Scrolling

You can use the `useScrollTrigger()` hook to respond to user scroll actions.

### 隐藏应用栏

The app bar hides on scroll down to leave more space for reading.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### 变高的应用栏

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### 回到顶部

A floating action buttons appears on scroll to make it easy to get back to the top of the page.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true, "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### 参数

1. `options` (*Object* [optional]):

- `options.disableHysteresis` (*Boolean* [optional]): 默认值为`false`。 禁用迟滞的效果。 在决定 `trigger` 的值时会忽略在滚动的方向。
- `options.target` （*Node* [optional]）：默认值时 `window`。
- `options.threshold` (*Number* [optional]): 默认值是 `100`. 严格来说，当垂直滚动超过（但不包括）此阈值时，请更改 `trigger` 的值。

#### 返回结果

`trigger`: Does the scroll position match the criteria?

#### 例子

```jsx
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hello</div>
    </Slide>
  );
}
```