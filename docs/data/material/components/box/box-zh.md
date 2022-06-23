---
product: material-ui
title: React Box
components: Box
githubLabel: 'component: Box'
---

# Box 分组

<p class="description">对于大多数 CSS 实用程序来说，Box 组件能够作为一个包装组件来使用。</p>

The Box component packages [all the style functions](/system/properties/) that are exposed in `@mui/system`.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 示例

查看[调色板](/system/palette/)样式功能。

## `sx` 属性

所有的样式功能都可以通过 [`sx` 属性 ](/system/basics/#the-sx-prop)设置。 同时，您也可通过`sx` 属性指定任何您想添加的 CSS 规则。 下面是一个如何使用的示例：

{{"demo": "BoxSx.js", "defaultCodeOpen": true }}

## 覆盖 MUI 组件

Box 组件能够封装您的组件。 它创建了一个新的 DOM 元素，默认情况下为 `<div>`，并可以通过 ` component ` 属性进行更改。 假设您想使用 `<span>`：

{{"demo": "BoxComponent.js", "defaultCodeOpen": true }}

当所需的更改与新的 DOM 元素分开时比较有效。 例如，您可以使用这个方法来更改边距。

但是，有时您的目标是下层的 DOM 元素。 例如，你可能想要更改 Button 组件的边框。 Button 组件已经定义好了它自己的样式。 所以使用 CSS 继承是于事无补的。 为了回避 CSS 继承无效的问题， 如该组件的子组件是一个 MUI 组件，您可直接在该组件上定义 [`sx`](/system/basics/#the-sx-prop) 属性。

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <Button>保存</Button>
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>保存</Button>
```

对于非 MUI 组件，使用 `component` 属性。

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <button>Save</button>
-</Box>
+<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
```

## System属性

作为一个 CSS 实用组件, `Box` 也支持所有 [`system`](/system/properties/) 属性。 您可以直接在组件上使用它们作为 prop。 例如，margin-top:

```jsx
<Box mt={2}>
```
