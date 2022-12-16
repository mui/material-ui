---
product: material-ui
title: React Divider（分隔线）组件
components: Divider
githubLabel: 'component: divider'
materialDesign: https://m2.material.io/components/dividers
---

# Divider

<p class="description">分隔线是对列表和布局中的内容进行分组的一条细线。</p>

分隔线可以将内容分成清晰的几组。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 列表分隔线

默认情况下，分割线会渲染成一个 `<hr>`。 您可以使用 `ListItem` 组件上的 `divider` 属性来保存渲染此 DOM 元素。

{{"demo": "ListDividers.js", "bg": true}}

## HTML5 规范

在一个列表中，请确保您将 `Divider` 渲染成一个 `<li>` 元素，这样才能遵循 HTML5 规范。 下面的例子展示了两种实现方式。

## 内嵌分隔线

{{"demo": "InsetDividers.js", "bg": true}}

## 副标题分割线

{{"demo": "SubheaderDividers.js", "bg": true}}

## 中段分隔线

{{"demo": "MiddleDividers.js", "bg": true}}

## 文本分隔线

你也可以使用文本内容来渲染分隔线。

{{"demo": "DividerText.js"}}

:::info
**Accessibility tips**: When using the `Divider` component for visual decoration, such as in a heading, explicitly specify `role="presentation"` to the divider to make sure screen readers can announce its content:

```js
<Divider component="div" role="presentation">
  {/* any elements nested inside the role="presentation" preserve their semantics. */}
  <Typography variant="h2">My Heading</Typography>
</Divider>
```

:::

## 垂直分隔线

You can also render a divider vertically using the `orientation` prop.

{{"demo": "VerticalDividers.js", "bg": true}}

:::info
Note the use of the `flexItem` prop to accommodate for the flex container.
:::

### Vertical with variant middle

You can also render a vertical divider with `variant="middle"`.

{{"demo": "VerticalDividerMiddle.js", "bg": true}}

### 垂直的文本分隔线

You can also render a vertical divider with content.

{{"demo": "VerticalDividerText.js"}}
