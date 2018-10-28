---
title: Drawer React component
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

## 响应式抽屉

利用` Hidden `组件，可以根据屏幕宽度显示不同类型的抽屉。 小屏幕显示 `temporary` 抽屉，较宽的屏幕显示 `permanent` 抽屉。

{{"demo": "pages/demos/drawers/ResponsiveDrawer.js", "iframe": true}}

## Permanent drawer

Permanent navigation drawers are always visible and pinned to the left edge, at the same elevation as the content or background. They cannot be closed.

Permanent navigation drawers are the **recommended default for desktop**.

### 全高度导航栏

Apps focused on information consumption that use a left-to-right hierarchy.

{{"demo": "pages/demos/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/demos/drawers/PermanentDrawerRight.js", "iframe": true}}

### 剪切在应用栏下

Apps focused on productivity that require balance across the screen.

{{"demo": "pages/demos/drawers/ClippedDrawer.js", "iframe": true}}

## Persistent drawer

Persistent navigation drawers can toggle open or closed. The drawer sits on the same surface elevation as the content. It is closed by default and opens by selecting the menu icon, and stays open until closed by the user. The state of the drawer is remembered from action to action and session to session.

When the drawer is outside of the page grid and opens, the drawer forces other content to change size and adapt to the smaller viewport.

Persistent navigation drawers are acceptable for all sizes larger than mobile. They are not recommended for apps with multiple levels of hierarchy that require using an up arrow for navigation.

{{"demo": "pages/demos/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/demos/drawers/PersistentDrawerRight.js", "iframe": true}}

## Mini variant drawer

In this variation, the persistent navigation drawer changes its width. Its resting state is as a mini-drawer at the same elevation as the content, clipped by the app bar. When expanded, it appears as the standard persistent navigation drawer.

The mini variant is recommended for apps sections that need quick selection access alongside content.

{{"demo": "pages/demos/drawers/MiniDrawer.js", "iframe": true}}