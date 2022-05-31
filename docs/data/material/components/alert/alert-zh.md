---
product: material-ui
title: React Alert （警告提示）组件
components: Alert, AlertTitle
githubLabel: 'component: alert'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
---

# Alert 警告提示

<p class="description">一个警告提示组件展示了一段简短且重要的信息，在不影响用户操作的同时能够吸引用户的注意力。</p>

**注意：** 警告提示不属于 [Material Design 指南](https://material.io/) 中的一部分，但是 MUI 仍然会继续支持该组件。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 简单的警告提示

警告提示有四种不同程度的级别，每种都有自己独特的颜色和图标。

{{"demo": "BasicAlerts.js"}}

## 描述

您可以使用 `AlertTitle` 组件在内容之上展示一个格式化的标题。

{{"demo": "DescriptionAlerts.js"}}

## 行为

一个警告提示可以附带一个行为，例如一个关闭或撤销按钮。 它在消息之后，提醒结束前被渲染。

如果提供了 `onClose` 回调且没有设置 `action` 属性的话，则会呈现一个关闭图标。 这个 `action` 属性可以用来提供一个可替代的行为，例如使用一个 Button 或者 IconButton。

{{"demo": "ActionAlerts.js"}}

### 过渡效果

You can use a [transition component](/material-ui/transitions/) such as `Collapse` to transition the appearance of the alert.

{{"demo": "TransitionAlerts.js"}}

## Icons 图标

使用 `icon` 属性，您可以在警告提示组件开头添加一个图标。 以此来改变不同程度的默认图标。

通过使用 `iconMapping` 属性，您可以改变不同程度的默认图标映射。 This can be defined globally using [theme customization](/material-ui/customization/theme-components/#default-props).

把图标属性设置为 `false` 将会移除所有图标。

{{"demo": "IconAlerts.js"}}

## 变体

还有描边（outlined）和填充（filled）这两种组件的变体可以使用。

### 描边

{{"demo": "OutlinedAlerts.js"}}

When using an outlined alert with the [`Snackbar` component](/material-ui/react-snackbar/#customization), background content will be visible and bleed through the alert by default. You can prevent this by adding `bgcolor: 'background.paper'` to the[`sx` prop](/material-ui/customization/how-to-customize/#the-sx-prop) on the `Alert` component.

### 填充

{{"demo": "FilledAlerts.js"}}

## Toast（提示）

You can use the Snackbar to [display a toast](/material-ui/react-snackbar/#customized-snackbars) with the Alert.

## Color 颜色

The `color` prop will override the default color for the specified severity.

{{"demo": "ColorAlerts.js"}}

## 无障碍设计

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

When the component is dynamically displayed, the content is automatically announced by most screen readers. At this time, screen readers do not inform users of alerts that are present when the page loads.

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (for example the visible text), or is included through alternative means, such as additional hidden text.

Actions must have a tab index of 0 so that they can be reached by keyboard-only users.
