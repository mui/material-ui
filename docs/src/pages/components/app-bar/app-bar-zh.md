---
title: React的 App Bar（应用栏）组件
components: AppBar, Toolbar, Menu
---

# App Bar（应用栏）

<p class="description">应用栏用来显示与当前屏幕相关的信息和操作。</p>

[顶部应用栏](https://material.io/design/components/app-bars-top.html) 提供与当前屏幕相关的内容和操作。 它用于展示品牌、屏幕标题、导航和操作选项。

它可以转换为上下文相关的操作栏或直接用作导航栏。

## 带按钮的应用栏

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## 简单的应用栏

{{"demo": "pages/components/app-bar/SimpleAppBar.js"}}

## 带一个主搜索输入框的应用栏

一个主搜索栏

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## 带有菜单的应用栏

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## 带有搜索输入框的应用栏

一个侧边搜索栏。

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## 紧凑模式 (仅限桌面模式)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## 底部应用栏

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## 滚动

### 隐藏应用栏

一个隐藏滚动条的应用栏。

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### 变高的应用栏

一个在滚动时变高的应用栏。

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### 参数

1. `options` (*Object* [optional]):
    
    - `options.disableHysteresis` (*Boolean* [optional]): 默认值为`false`。 禁用迟滞的效果。 在决定 `trigger` 的值时会忽略在滚动的方向。
    - `options.target` （*Node* [optional]）：默认值时 `window`。
    - `options.threshold` （*Number* [optional]）：默认值为 `100`。当垂直滚动超过此阈值时，则会更改 ` trigger ` 的值。

#### 返回结果

`trigger` ：滚动位置是否符合标准？

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