---
title: 扩展面板 React 组件
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---
# 扩展面板

<p class="description">扩展面板包含创建流程，允许轻量编辑元素。</p>

[扩展面板](https://material.io/archive/guidelines/components/expansion-panels.html)是一个轻量级容器，既可以单独使用，也可以和卡片这样更大的平面相结合。

> **注意：** 材料设计文档中不再记录扩展面板。

## 无障碍功能

为获得最佳可访问性，我们建议您在 `ExpansionPanelSummary`中配置 `id` 和 `aria-controls` 。 `ExpansionPanel` 将为面板的内容区域导出必要的 `aria-labelledby` 和 `id`。

## 简单的扩展面板

{{"demo": "pages/demos/expansion-panels/SimpleExpansionPanel.js"}}

## 受控手风琴

扩展默认面板行为以使用` ExpansionPanel `组件创建手风琴。

{{"demo": "pages/demos/expansion-panels/ControlledExpansionPanels.js"}}

## 次要标题和列

可以使用多列来构造内容，并且可以将辅助文本添加到面板以帮助用户。

{{"demo": "pages/demos/expansion-panels/DetailedExpansionPanel.js"}}

## 定制扩展面板

如果您已经在阅读 [组件覆写文档页面](/customization/overrides/) 但是您没有信心进入， 这里是一个关于如何自定义`ExpansionPanelSummary`组件背景自然色和给`ExpansionPanelDetails`组件添加填充的示例。

⚠️虽然材料设计规范鼓励主题，但这些例子是不合适的。

{{"demo": "pages/demos/expansion-panels/CustomizedExpansionPanel.js"}}