---
title: React 菜单组件
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---

# Menu 菜单

<p class="description">菜单在临时出现的位置上显示了一系列的选项。</p>

一个 [菜单组件](https://material.io/design/components/menus.html) 在临时的位置上显示了一系列的选项。 当用户和一个按钮、或者其他控制元件交互的时候，菜单会出现。

## 简单菜单

默认情况下，简单菜单在锚元素上打开（此选项可以通过 props 更改）。 当靠近屏幕边缘时，简单菜单会在垂直方向上重新对齐，以确保所有菜单子项（menu items）都完全可见。

理想状态下，选择一个选项是会立刻执行此选项并且关闭整个菜单。

**解疑**: 与简单菜单相比，基本对话框可以呈现与一个列表可选项相关的额外信息，或者提供与主要任务相关的导航类或者互不相干的操作。 虽然它们可以显示相同的内容，但和基本对话框相比，我们更倾向于简单菜单，因为它对用户的当前上下文干预更少。

{{"demo": "pages/components/menus/SimpleMenu.js"}}

## 选择菜单

若用于选项的选择，当打开简单菜单的时候，它会通过一个锚元素来尝试与当前被选择的菜单的选择项垂直对齐，而初始的焦点集中于被选中的那个选项。 通过 `selected` 属性（在[ListItem](/api/list-item/)中），能够设置当前被选中的那个选项。 若想要使用一个被选项，且不影响初始的焦点或者菜单的垂直位置，您可以设置一下`菜单`的 `variant` 属性。

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## MenuList 组合

在`菜单`组件的内部，其实使用了 `Popover` 组件。 但是，您可能想要使用不同的元素定位的方式，或者您不想禁止页面的滚动。 为了满足这些需求，我们公开了一个 `MenuList` 组件，您可以像下面例子中这样结合 `Popper` 来编写自己的菜单组件。

`MenuList` 组件的主要任务是处理焦点。

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## 自定义菜单

以下是自定义此组件的一个示例。 您可以在 [重写文档页面](/customization/components/) 中了解更多有关此内容的信息。

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

`MenuItem` 的原理是用额外的样式包装了 `ListItem` 组件。 你可以将同样的列表合成功能来装饰 `MenuItem` 组件：

🎨 如果您还在寻找灵感，您可以看看 [MUI Treasury 特别定制的一些例子](https://mui-treasury.com/styles/menu)。

## 限高菜单

如果最大高度的菜单仍无法显示所有菜单项，则菜单可以在内部滚动。

{{"demo": "pages/components/menus/LongMenu.js"}}

## 局限性

有 [一个 flexbox 的错误](https://bugs.chromium.org/p/chromium/issues/detail?id=327437)，在 flexbox 的布局中，无法正常使用 `text-overflow: ellipsis`。 您可以使用 `Typography` 组件和 `noWrap` 来解决此问题：

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## 更改过渡动画

使用不同的过渡动画。

{{"demo": "pages/components/menus/FadeMenu.js"}}

## 快捷菜单 Context menu

这是一个快捷菜单的示例。 （单击右键就可以打开。）

{{"demo": "pages/components/menus/ContextMenu.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### PopupState helper

这里有一个第三方包 [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) 在大部分情况下，它都能帮你处理好菜单组件的状态。

{{"demo": "pages/components/menus/MenuPopupState.js"}}