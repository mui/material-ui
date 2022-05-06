---
product: material-ui
title: React Accordion （扩展面板）组件
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
githubLabel: 'component: accordion'
materialDesign: https://material.io/archive/guidelines/components/expansion-panels.html
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#accordion'
---

# Accordion 扩展面板

<p class="description">扩展面板是一个展示内容文本的组件，用户可以显示/隐藏文本内容。</p>

扩展面板是一个轻量级容器，既可以单独使用，也可以和卡片这样更大的平面相结合。

{{"component": "modules/components/ComponentLinkHeader.js"}}

:::info **Note:** Accordions are no longer documented in the [Material Design guidelines](https://material.io/), but MUI will continue to support them. It was formerly known as the "expansion panel". :::

## 简单的扩展面板

{{"demo": "BasicAccordion.js", "bg": true}}

## 可控制的折叠面板

Extend the default behavior to create an accordion with the `Accordion` component.

{{"demo": "ControlledAccordions.js", "bg": true}}

## 自定义的扩展面板

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedAccordions.js"}}

## 性能

The content of Accordions is mounted by default even if the accordion is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your accordion details or simply render many accordions it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

As with any performance optimization this is not a silver bullet. Be sure to identify bottlenecks first and then try out these optimization strategies.

## 无障碍设计

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

For optimal accessibility we recommend setting `id` and `aria-controls` on the `AccordionSummary`. The `Accordion` will derive the necessary `aria-labelledby` and `id` for the content region of the accordion.
