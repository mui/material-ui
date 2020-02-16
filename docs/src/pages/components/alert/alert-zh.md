---
title: React 提醒组件
components: Alert
---

# Alert 提醒

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

## Icons 图标

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

## Toast（提示）

你可以使用「消息条」来显示[ 带确认按钮的Toast 提示](/components/snackbars/#customized-snackbars) 。

## 颜色

`color` 属性用来改变不同程度「提醒」的默认颜色。

{{"demo": "pages/components/alert/ColorAlerts.js"}}

## 可访问性

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#alert)

动态显示组件时，大部分屏幕都会自动朗读其内容。 此时，屏幕不会将页面加载时出现的提醒通知给用户。

使用颜色来增加意义只提供了一个视觉指示，而不会传达给用户的辅助技术，如屏幕阅读器。 确保用颜色表示的信息对于内容本身是明显的(例如可见的文本)，或者通过其他方法包含进来，例如附加的隐藏文本。

动作的选项卡索引必须为0，这样只有键盘的用户才能访问它们。
