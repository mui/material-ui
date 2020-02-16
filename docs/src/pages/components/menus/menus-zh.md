---
title: React Menu（菜单）组件
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---

# Menus 菜单

<p class="description">菜单在临时出现的位置上展示一系列的选项列表。</p>

A [Menu](https://material.io/design/components/menus.html) displays a list of choices on a temporary surface. It appears when the user interacts with a button, or other control.

## 简单菜单

默认情况下，简单菜单在锚元素上打开（此选项可以通过 props 更改）。 当靠近屏幕边缘时，简单菜单会在垂直方向上重新对齐，以确保所有菜单子项都完全可见。

理想状态下，选择一个选项会出发即刻提交该选项并且关闭整个菜单。

**解疑**: 与简单菜单相比，基本对话框可以显示与一个列表项相关的其他选项的详细信息，或者提供与主要任务相关的导航类的或垂直的操作。 虽然它们可以显示相同的内容，但相对于基本对话框，我们更推荐简单菜单，因为它对用户的当前上下文干预更少。

{{"demo": "pages/components/menus/SimpleMenu.js"}}

## 选择菜单

若用于选项的选择，当打开简单菜单的时候，它会通过一个锚元素来尝试与当前被选择的菜单的选择项垂直对齐，而初始的焦点将放置于此被选项。 通过 `selected` 属性（在[ListItem](/api/list-item/)中），我们设置当前的被选项。 若想要使用一个被选菜单项且不影响初始的焦点或者菜单的垂直位置，您可以设置一下`菜单`的 `variant` 属性。

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## MenuList 组合

`菜单`组件在其内部使用 `Popover` 组件。 但是，您可能想要使用不同的元素定位的方式，或者您不想禁止页面的滚动。 为了满足这些需求，我们公开了一个 `MenuList` 组件，您可以像下面例子中这样结合 `Popper` 来编写自己的菜单组件。

`MenuList`组件的主要任务是处理焦点。

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## 自定义菜单

以下是自定义组件的一个示例。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

The `MenuItem` is a wrapper around `ListItem` with some additional styles. You can use the same list composition features with the `MenuItem` component:

## 限高菜单

如果菜单的最大高度仍无法显示所有菜单项，则菜单可以在内部滚动。

{{"demo": "pages/components/menus/LongMenu.js"}}

## 局限性

有 [一个 flexbox 的 错误](https://bugs.chromium.org/p/chromium/issues/detail?id=327437)，使 `text-overflow: ellipsis` 在 Flexbox 布局中不工作。 您可以使用 `Typography` 组件和 `noWrap` 来解决此问题：

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## 更改过渡动画

使用不同的过渡动画。

{{"demo": "pages/components/menus/FadeMenu.js"}}

## 快捷菜单

这是快捷菜单的示例。 （右键单击以打开。）

{{"demo": "pages/components/menus/ContextMenu.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### PopupState helper

这里有一个第三方包 [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) 在大部分情况下，它都能帮你处理好菜单状态

{{"demo": "pages/components/menus/MenuPopupState.js"}}