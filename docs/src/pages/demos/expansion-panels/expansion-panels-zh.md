---
title: 扩展面板 React 组件
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---
# Expansion Panels

<p class="description">扩展面板包含创建流程，允许轻量编辑元素。</p>

[扩展面板](https://material.io/archive/guidelines/components/expansion-panels.html)是一个轻量级容器，既可以单独使用，也可以和卡片这样更大的平面相结合。

> **Note:** Expansion panels are no longer documented in the Material Design documentation.

## 简单的扩展面板

{{"demo": "pages/demos/expansion-panels/SimpleExpansionPanel.js"}}

## 受控手风琴

扩展默认面板行为以使用` ExpansionPanel `组件创建手风琴。

{{"demo": "pages/demos/expansion-panels/ControlledExpansionPanels.js"}}

## 次要标题和列

可以使用多列来构造内容，并且可以将辅助文本添加到面板以帮助用户。

{{"demo": "pages/demos/expansion-panels/DetailedExpansionPanel.js"}}

## Customized Expansion Panel

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here is one example of how you can customize the background color of the `ExpansionPanelSummary` and padding of `ExpansionPanelDetails`.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/expansion-panels/CustomizedExpansionPanel.js"}}