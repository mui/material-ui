---
product: material-ui
title: 应用栏（App bar）React组件
components: AppBar, Toolbar, Menu
githubLabel: 'component: app bar'
materialDesign: https://m2.material.io/components/app-bars-top
---

# 应用栏（App bar）

<p class="description">应用栏展示了与当前屏幕内容相关的信息和操作。</p>

顶部应用栏提供与当前屏幕有关的内容和操作。 该组件常用于展示品牌、屏幕标题、导航和操作。

它既可以用作于转换为上下文相关的操作栏，又可以直接充当导航栏。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基础的应用栏

{{"demo": "ButtonAppBar.js", "bg": true}}

## 带有菜单的应用栏

{{"demo": "MenuAppBar.js", "bg": true}}

## 带有响应式菜单的应用栏

{{"demo": "ResponsiveAppBar.js", "bg": true}}

## 带有搜索输入框的应用栏

一个侧边搜索栏。

{{"demo": "SearchAppBar.js", "bg": true}}

## 带有抽屉的响应式应用栏

{{"demo": "DrawerAppBar.js", "bg": true, "iframe": true, "disableLiveEdit": true}}

## 带有主搜索输入框的应用栏

一个主搜索栏。

{{"demo": "PrimarySearchAppBar.js", "bg": true}}

## 紧凑模式（仅限桌面）

{{"demo": "DenseAppBar.js", "bg": true}}

## 突出

一个突出显示的应用栏。

{{"demo": "ProminentAppBar.js", "bg": true}}

## 底部应用栏

{{"demo": "BottomAppBar.js", "iframe": true, "maxWidth": 400}}

## 固定位置

当您在固定位置渲染应用栏，元素的尺寸不会影响页面的其余内容。 这可能导致您的部分内容被应用栏遮挡而不可见。 以下是3种可能的解决方案：

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

## 滚动

您可以使用 `useScrollTrigger()` 钩子来响应用户触发的滚动操作。

### 隐藏应用栏

向下滚动隐藏应用栏，从而为阅读提供更多空间。

{{"demo": "HideAppBar.js", "iframe": true, "disableLiveEdit": true}}

### 提升应用栏

应用栏会在滚动时提升，以表明用户还未到页面的顶部。

{{"demo": "ElevateAppBar.js", "iframe": true, "disableLiveEdit": true}}

### 回到顶部

滚动时出现一个浮动操作按钮，以便返回页面的顶部。

{{"demo": "BackToTop.js", "iframe": true, "disableLiveEdit": true}}

### `useScrollTrigger([options]) => trigger`

#### 参数

1. `options` (_object_ [optional]):

   - `options.disableHysteresis` (_bool_ [optional])：默认值是 `false`。 禁用迟滞的效果。 在决定 `trigger` 的值时会忽略在滚动的方向。
   - `options.target` (_Node_ [optional])：默认值是 `window`。
   - `options.threshold` (_number_ [optional])：默认值是 `100`。 当垂直滚动恰好超过（但不包括）此阈值时，会改变 `trigger` 的值。

#### 返回结果

`trigger`: 此滚动的位置符合要求吗？

#### 示例

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

## 启用深色模式颜色

按照[Material Design设计准则](https://m2.material.io/design/color/dark-theme.html)，`color`属性对深色模式下的应用栏外观没有影响。 你可以通过将`enableColorOnDark`属性设置为`true`覆盖这一行为。

{{"demo": "EnableColorOnDarkAppBar.js", "bg": true}}
