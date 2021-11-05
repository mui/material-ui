---
title: React ButtonGroup（按钮组）组件
components: Button, ButtonGroup
githubLabel: '组件：按钮组'
---

# Button groups 按钮组组件

<p class="description">按钮组组件可用于对相关按钮进行分组。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic button group 基本的按钮组

通过使用 `ButtonGroup` 组件包装按钮，可以对按钮进行分组。 它们必须是直接的子组件。

{{"demo": "pages/components/button-group/BasicButtonGroup.js"}}

## Button variants

All the standard button variants are supported.

{{"demo": "pages/components/button-group/VariantButtonGroup.js"}}

## 大小和颜色

`size` 和 `color` 属性可以用于控制按钮组的外观。

{{"demo": "pages/components/button-group/GroupSizesColors.js"}}

## Vertical group 垂直组

可以使用 `orientation` 属性让按钮组垂直排列。

{{"demo": "pages/components/button-group/GroupOrientation.js"}}

## Split button 分体式按钮

`按钮组组件`也可用于创建分体式按钮。 下拉列表可以改变其按钮action（如此例所示），或者被用于立即触发一个与下拉列表相关的action。

{{"demo": "pages/components/button-group/SplitButton.js"}}

## Disabled elevation 禁用立体效果（elevation）

你也可以使用属性 `disableElevation` 属性来消除实心按钮的立体效果。

{{"demo": "pages/components/button-group/DisableElevation.js"}}
