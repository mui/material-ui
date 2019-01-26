---
title: 抽屉React组件
components: Drawer, SwipeableDrawer
---
# 抽屉

<p class="description">导航抽屉可以访问您应用中的地址。侧栏是包含附加内容的平面，它固定在屏幕的左侧或右侧。</p>

[Navigation drawers](https://material.io/design/components/navigation-drawer.html) 提供对目标和应用功能如「切换帐户」的访问。 它们可以是永久在屏幕上或由导航菜单图标控制。

[Side sheets](https://material.io/design/components/sheets-side.html) 主要用于平板电脑和台式机的辅助平面。

## 临时抽屉

临时导航抽屉可以打开或关闭。默认情况下关闭，抽屉打开会暂时在所有其他内容之上，直到选择一个部分。

单击或者按Esc键可以关闭抽屉。当选择抽屉中的一项时，它也会关闭，通过操作 `open` prop来处理。

{{"demo": "pages/demos/drawers/TemporaryDrawer.js"}}

## 可滑动的临时抽屉

您可以使用 `SwipeableDrawer` 组件滑动抽屉。

此组件附带 2 kB gzip 的负载开销。 一些低端移动设备无法以 60 FPS 的速度跟随手指。 您可以使用 `disableBackdropTransition` 属性来提供帮助。

{{"demo": "pages/demos/drawers/SwipeableTemporaryDrawer.js"}}

我们网站上的文档使用以下属性来获得组件的最佳可用性: - iOS 托管于高端设备上。 我们可以在不丢帧的情况下启用背景转换。 它的表现将十分优秀。 - iOS 有一个"滑动返回"的功能，它与组件冲突。 我们必须禁用它。

```jsx
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />
```

## 响应抽屉

`Hidden`响应式帮助程序组件允许根据屏幕宽度显示不同类型的抽屉。 显示小屏幕的`temporary`抽屉，而更宽屏幕显示`permanent`抽屉。

{{"demo": "pages/demos/drawers/ResponsiveDrawer.js", "iframe": true}}

## 持久抽屉

持久抽屉可以打开或关闭。 抽屉与内容位于同一表面的高度上。 它默认情况下是关闭的，可通过选择菜单图标打开，它会保持打开状态，直到用户关闭。 从操作到操作和会话到会话记住抽屉的状态。

当抽屉位于页面网格之外并打开时，抽屉会强制其他内容更改大小并适应较小的视口。

对于比移动设备更大的尺寸，可以使用持久性导航抽屉。 对于具有多级层次结构且需要使用向上箭头进行导航的应用，建议不要使用它们。

{{"demo": "pages/demos/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/demos/drawers/PersistentDrawerRight.js", "iframe": true}}

## 迷你变体抽屉

在此变体中，持久性导航抽屉会更改其宽度。 它的静止状态是一个迷你抽屉，与内容相同，由应用栏夹住。 展开后，它将显示为标准持久性导航抽屉。

对于需要快速选择访问内容的应用部分，建议使用迷你变体。

{{"demo": "pages/demos/drawers/MiniDrawer.js", "iframe": true}}

## 永久抽屉

永久抽屉始终可见并固定在左侧，与内容或背景位于同一高度。他们无法被关闭。

永久抽屉是桌面**推荐的默认值**。

### 全高度导航栏

应用程序侧重与从左到右层次结构的信息消费。

{{"demo": "pages/demos/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/demos/drawers/PermanentDrawerRight.js", "iframe": true}}

### 从应用栏下开始分割

应用专注于生产力，需要在整个屏幕上保持平衡。

{{"demo": "pages/demos/drawers/ClippedDrawer.js", "iframe": true}}