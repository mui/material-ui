---
title: React 菜单组件
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---
# 菜单

<p class="description">菜单显示在临时出现的所点击位置上的选项列表。</p>

[菜单](https://material.io/design/components/menus.html)通过一个临时出现的界面来显示选项列表。通常当用户与按钮，操作或其他控件交互时出现。

## 基本菜单

Simple menus open over the anchor element by default (this option can be changed via props). When close to a screen edge, simple menus vertically realign to make sure that all menu items are completely visible.

选择一个选项后, 最好立即提交该选项并关闭菜单。

**解疑**: 与基本菜单相比, 基本对话框可以显示与列表项可用选项相关的其他详细信息, 或者提供与主要任务相关的导航类的或垂直的操作。 虽然它们可以显示相同的内容, 但基本菜单比基本对话框更可取, 因为基本菜单对用户当前上下文的破坏性较小。

{{"demo": "pages/demos/menus/SimpleMenu.js"}}

## 选择菜单

如果用于项目选择, 则在打开时, 基本菜单会尝试将当前选定的菜单项与定位元素垂直对齐。 使用` selected `属性将菜单项设置为当前选中（从[ListItem](/api/list-item/))。

{{"demo": "pages/demos/menus/SimpleListMenu.js"}}

## MenuList composition

The `Menu` component uses the `Popover` component internally. However, you might want to use a different positioning strategy, or not blocking the scroll. For answering those needs, we expose a `MenuList` component that you can compose, with `Popper` in this example.

The primary responsibility of the `MenuList` component is to handle the focus.

{{"demo": "pages/demos/menus/MenuListComposition.js"}}

## Customized MenuItem

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here is one example of how you can customize the `MenuItem`.

⚠️ While the material design specification encourages theming, this example is off the beaten path.

{{"demo": "pages/demos/menus/ListItemComposition.js"}}

`MenuItem`实际上是在`ListItem`之上增加了一些样式的封装。 所以你可以靠`MenuItem`来使用相同的列表组合特性：

## Max height menus

If the height of a menu prevents all menu items from being displayed, the menu can scroll internally.

{{"demo": "pages/demos/menus/LongMenu.js"}}

## Render Props

It is a [render props](https://reactjs.org/docs/render-props.html) demo that keeps track of the local state for a single menu.

{{"demo": "pages/demos/menus/RenderPropsMenu.js"}}

## 局限性

There is [a flexbox bug](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) that prevents `text-overflow: ellipse` from working in a flexbox layout. You can use the `Typography` component to workaround this issue:

{{"demo": "pages/demos/menus/TypographyMenu.js"}}

## 更改过渡动画

Use a different transition altogether.

{{"demo": "pages/demos/menus/FadeMenu.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### PopupState helper

There is a 3rd party package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of menu state for you in most cases.

{{"demo": "pages/demos/menus/MenuPopupState.js"}}