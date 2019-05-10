---
title: React Expansion Panel（扩展面板）组件
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Expansion Panels（扩展面板）

<p class="description">扩展面板包含了创建流程和轻量地编辑元素。</p>

[扩展面板](https://material.io/archive/guidelines/components/expansion-panels.html)是一个轻量级容器，既可以单独使用，也可以和卡片这样更大的平面相结合。

> **请注意：** Material Design 文档中不再记录扩展面板。

## 可及性

如果想要得到最佳辅助，我们建议您在 `ExpansionPanelSummary` 中配置 `id` 和 `aria-controls` 。 `ExpansionPanel` 将为面板的内容区域导出必要的 `aria-labelledby` 和 `id`。

## 简单的扩展面板

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js"}}

## 可控制的折叠面板

默认情况下，面板会使用 `ExpansionPanel` 组件创建一个折叠面板。

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js"}}

## 次级标题和列

您可以使用多列来创建内容，并且可以将辅助文本添加到面板。

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js"}}

## 性能

默认情况下，即使在面板没被展开的情况下，扩展面板的内容也会被注入到页面中。 这样的默认情况是是考虑到了 server-side rendering（服务端渲染）和 SEO（搜索引擎优化）。 但如果你您要在扩展面板中渲染开销很大的树组件，或者只是单纯想要渲染很多扩展面板，我们建议变更一些默认的行为。你可以通过在开启 `TransitionProps` 中的 `unmountOnExit` 属性：`<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />`。 不过对所有情况下的性能优化，这并不是灵丹妙药。 请您务必先确定性能的瓶颈所在，再考虑这些优化策略。

## 定制扩展面板

以下是自定义组件的一个示例。您可以在[重写文档页面](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}