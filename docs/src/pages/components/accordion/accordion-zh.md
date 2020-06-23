---
title: React Accordion 扩展面板组件
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
---

# Accordion 扩展面板

<p class="description">扩展面板包含了流程的创建和元素的轻量编辑。</p>

[扩展面板](https://material.io/archive/guidelines/components/accordion.html)是一个轻量级容器，既可以单独使用，也可以和卡片这样更大的平面相结合。

> **注意：** 此版本的扩展面板将不再记录在 [Material Design 指南中](https://material.io/)，但 Material-UI 将继续支持它。

## 简单的扩展面板

{{"demo": "pages/components/accordion/SimpleAccordion.js", "bg": true}}

## 可控制的折叠面板

使用 ` Accordion` 组件，能够扩展已有的控制面板行为，来创建自定义的扩展面板组。

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## 自定义扩展面板

以下是自定义组件的一个示例。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## 其他操作

当你把 `Checkbox` 或者一个按钮这样的操作事件放进`AccordionSummary`，当在打开和收缩控制面板时使用这个操作，你则需要阻止 focus 和 click 事件的传播。 您则需要把 `aria-label` 传给操作，否则控制面板扩展的父级按钮会把嵌套着的操作的标签包含进去。

{{"demo": "pages/components/accordion/ActionsInAccordionSummary.js", "bg": true}}

## 性能

默认情况下，即使在面板没被展开的情况下，扩展面板的内容也会被注入到页面中。 这样的默认情况是是考虑到了服务端渲染（server-side rendering）和搜索引擎优化（SEO）。 但如果你您要在扩展面板中渲染开销很大的树组件，或者只是单纯想要渲染很多扩展面板，我们建议变更这个默认的行为：需要启用 `TransitionProps` 中的 `unmountOnExit` 属性。

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

不过对所有情况下的性能优化，这并不是灵丹妙药。 请您务必先确定性能的瓶颈所在，再考虑这些优化策略。

## 次要标题和列

您也可以使用多列来构造内容，而且将辅助文本添加到面板能够以辅助用户。

{{"demo": "pages/components/accordion/DetailedAccordion.js", "bg": true}}

## 无障碍设计

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

如果想要取得较好的无障碍设计，我们建议您在 `AccordionSummary` 中配置 `id` 和 `aria-controls` 。 `Accordion` 将为面板的内容区域导出必要的 `aria-labelledby` 和 `id`。