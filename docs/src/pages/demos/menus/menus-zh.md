---
title: React 菜单组件
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---
# 菜单

<p class="description">菜单显示在临时出现的所点击位置上的选项列表。</p>

[菜单](https://material.io/design/components/menus.html)通过一个临时出现的界面来显示选项列表。通常当用户与按钮，操作或其他控件交互时出现。

## 基本菜单

默认情况下，简单菜单在锚元素上打开（此选项可以通过props更改）。 当靠近屏幕边缘时，简单的菜单会垂直重新对齐，以确保所有菜单项都完全可见。

选择一个选项后, 最好立即提交该选项并关闭菜单。

**解疑**: 与基本菜单相比, 基本对话框可以显示与列表项可用选项相关的其他详细信息, 或者提供与主要任务相关的导航类的或垂直的操作。 虽然它们可以显示相同的内容, 但基本菜单比基本对话框更可取, 因为基本菜单对用户当前上下文的破坏性较小。

{{"demo": "pages/demos/menus/SimpleMenu.js"}}

## 选择菜单

如果用于项目选择, 则在打开时, 基本菜单会尝试将当前选定的菜单项与定位元素垂直对齐。 使用` selected `属性将菜单项设置为当前选中（从[ListItem](/api/list-item/))。

{{"demo": "pages/demos/menus/SimpleListMenu.js"}}

## MenuList 组件

`Menu`组件内部使用`Popver`组件 但是，您可能想药使用不同的定位策略，或者你不想禁止滚动。 为了满足这些需求，我们公开了一个`MenuList`组件，让你可以像下面例子中这样组合`Popper`来编写自己的菜单组件。

`MenuList`组件的主要职责是处理焦点。

{{"demo": "pages/demos/menus/MenuListComposition.js"}}

## 定制菜单项

如果您一直在阅读 [覆盖文档页面](/customization/overrides/) 但是您没有信心跳入， 这里是一个如何自定义 `MenuItem`示例。

⚠️虽然材料设计规范鼓励主题，但这个例子是不合适的。

{{"demo": "pages/demos/menus/ListItemComposition.js"}}

`MenuItem`实际上是在`ListItem`之上增加了一些样式的封装。 所以你可以靠`MenuItem`来使用相同的列表组合特性：

## 限高菜单

如果菜单的最大高度仍无法显示所有菜单项，则菜单可以在内部滚动。

{{"demo": "pages/demos/menus/LongMenu.js"}}

## Render Props

这是[render props](https://reactjs.org/docs/render-props.html) 的例子。保持跟踪单个菜单的本地状态。

{{"demo": "pages/demos/menus/RenderPropsMenu.js"}}

## 局限性

这里有 [a flexbox bug](https://bugs.chromium.org/p/chromium/issues/detail?id=327437)，这个bug会让`text-overflow: ellipse`在 flexbox 布局中失去效果 你可以使用`Typography`组件做替代方案绕过这个问题：

{{"demo": "pages/demos/menus/TypographyMenu.js"}}

## 更改过渡动画

使用不同的过渡动画。

{{"demo": "pages/demos/menus/FadeMenu.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### PopupState helper

这里有一个第三方包 [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) 在大部分情况下，它都能帮你处理好菜单状态

{{"demo": "pages/demos/menus/MenuPopupState.js"}}