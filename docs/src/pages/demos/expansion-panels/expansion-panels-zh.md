---
title: 扩展面板 React 组件
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---
# 扩展面板

<p class="description">扩展面板包含创建流程，允许轻量编辑元素。</p>

[扩展面板](https://material.io/archive/guidelines/components/expansion-panels.html)是一个轻量级容器，既可以单独使用，也可以和卡片这样更大的平面相结合。

> **注意：** 材料设计文档中不再记录扩展面板。

## 简单的扩展面板

{{"demo": "pages/demos/expansion-panels/SimpleExpansionPanel.js"}}

## 受控手风琴

扩展默认面板行为以使用` ExpansionPanel `组件创建手风琴。

{{"demo": "pages/demos/expansion-panels/ControlledExpansionPanels.js"}}

## 次要标题和列

可以使用多列来构造内容，并且可以将辅助文本添加到面板以帮助用户。

{{"demo": "pages/demos/expansion-panels/DetailedExpansionPanel.js"}}

## 定制扩展面板

如果您一直在阅读 [覆盖文档页面](/customization/overrides/) 但是您没有信心跳入， 这里是一个示例，说明如何自定义 `ExpansionPanelSummary` 的背景颜色和 `ExpansionPanelDetails`填充。

⚠️虽然材料设计规范鼓励主题，但这些例子是不合适的。

{{"demo": "pages/demos/expansion-panels/CustomizedExpansionPanel.js"}}