---
title: React Expansion Panel（扩展面板）组件
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Expansion Panel 拓展面板

<p class="description">扩展面板包含了创建流程和轻量地编辑元素。</p>

[扩展面板](https://material.io/archive/guidelines/components/expansion-panels.html)是一个轻量级容器，既可以单独使用，也可以和卡片这样更大的平面相结合。

> **注意：** 此版本的文本框将不再记录在 [Material Design 指南中](https://material.io/)，但 Material-UI 将继续支持它。

## 简单的扩展面板

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js", "bg": true}}

## 可控制的折叠面板

使用` ExpansionPanel `组件创建自定义的扩展面板组件

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js", "bg": true}}

## 自定义扩展面板

以下是自定义组件的一个示例。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}

## 其他操作

In order to put an action such as a `Checkbox` or a button inside of the `ExpansionPanelSummary`, you need to stop the propagation of the focus and click events to prevent the panel from expanding/collapsing when using the action. You should also provide an `aria-label` for the action, otherwise the label of the nested action will be included in the label of the parent button that controls the panel expansion.

{{"demo": "pages/components/expansion-panels/ActionsInExpansionPanelSummary.js", "bg": true}}

## 性能

默认情况下，即使在面板没被展开的情况下，扩展面板的内容也会被注入到页面中。 这样的默认情况是是考虑到了 server-side rendering（服务端渲染）和 SEO（搜索引擎优化）。 If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />
```

不过对所有情况下的性能优化，这并不是灵丹妙药。 请您务必先确定性能的瓶颈所在，再考虑这些优化策略。

## 次要标题和列

可以使用多列来构造内容，并且可以将辅助文本添加到面板以帮助用户。

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js", "bg": true}}

## 可访问性

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

如果想要得到最佳辅助，我们建议您在 `ExpansionPanelSummary` 中配置 `id` 和 `aria-controls` 。 `ExpansionPanel` 将为面板的内容区域导出必要的 `aria-labelledby` 和 `id`。