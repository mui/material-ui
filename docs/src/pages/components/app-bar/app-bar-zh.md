---
title: React的 App Bar（应用栏）组件
components: AppBar, Toolbar, Menu
---

# App Bar（应用栏）

<p class="description">应用栏用来显示与当前屏幕相关的信息和操作。</p>

[顶部应用栏](https://material.io/design/components/app-bars-top.html) 提供与当前屏幕相关的内容和操作。 它用于展示品牌、屏幕标题、导航和操作选项。

它可以转换为上下文相关的操作栏或直接用作导航栏。

## Simple App Bar

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## App Bar with a primary search field

A primary searchbar.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## App Bar with menu

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## App Bar with search field

A side searchbar.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Dense (desktop only)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Bottom App Bar

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Scrolling

You can use the `useScrollTrigger()` hook to respond to user scroll actions.

### 隐藏应用栏

The app bar hides on scroll down to leave more space for reading.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### 变高的应用栏

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### Back to top

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
      <div>你好</div>
    </Slide>
  );
}
```