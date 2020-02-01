---
title: 提醒组件
components: 提醒
---

# 提醒

<p class="description">「提醒」是简短且重要的信息，在不影响用户操作的同时能够吸引用户的注意力。</p>

**注意：**这个组件不在[《Material Design 指南》](https://material.io/)中，但它是被 Material-UI 支持的。

## 简单的提醒

一共有四种不同程度的「提醒」，每种都有自己独特的颜色和图标。

{{"demo": "pages/components/alert/SimpleAlerts.js"}}

## 描述

在提醒内容的上面使用 `AlertTitle` 可以实现标题的格式化。

{{"demo": "pages/components/alert/DescriptionAlerts.js"}}

## Actions（行为）

一个「提醒」可以有一个行为，例如「关闭」或「撤销」按钮。 它在消息之后，「提醒」结束时被渲染。

如果提供了 `onClose` 回调且没有设置 `action` 属性的话，「关闭」图标就会显示。 这个 `action` 行为可以用其他形式来完成，例如使用一个按钮或者图标按钮。

{{"demo": "pages/components/alert/ActionAlerts.js"}}

### 过渡效果

可以使用 [过渡组件](/components/transitions) ，如 `Collapse（展开）` 来实现「提醒」出现时的过渡效果。

{{"demo": "pages/components/alert/TransitionAlerts.js"}}

## Icons（图标）

`icon`是指可以在「提醒」组件的开始的地方加一个图标。 以此来改变不同程度「提醒」的默认图标。

通过使用 `iconMapping` 这种映射方法，可以改变不同程度的默认图标。 在[自定义主题](/customization/globals/#default-props)中可以进行全局设置。

把图标属性设置为 false 将会把图标都移除了。

{{"demo": "pages/components/alert/IconAlerts.js"}}

## 变种(Variants)

还可以实现「边框」和「填充」这两种变体。

### 边框

{{"demo": "pages/components/alert/OutlinedAlerts.js"}}

### 填充

{{"demo": "pages/components/alert/FilledAlerts.js"}}

## Toast

You can use the Snackbar to [display a toast](/components/snackbars/#customized-snackbars) with the Alert.

## 颜色

`color` 属性用来改变不同程度「提醒」的默认颜色。

{{"demo": "pages/components/alert/ColorAlerts.js"}}

## 可访问性

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#alert)

动态显示组件时，大部分屏幕都会自动显示其内容。 此时，屏幕不会将页面加载时出现的提醒通知给用户。

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (for example the visible text), or is included through alternative means, such as additional hidden text.

Actions must have a tab index of 0 so that they can be reached by keyboard-only users.
