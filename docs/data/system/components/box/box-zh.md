---
product: system
title: React Box component
components: Box
githubLabel: 'component: Box'
---

# Box 分组

<p class="description">对于大多数 CSS 实用程序来说，Box 组件能够作为一个包装组件来使用。</p>

The Box component packages [all the style functions](/system/getting-started/the-sx-prop/) that are exposed in `@mui/system`.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 示例

查看[调色板](/system/palette/)样式功能。

## `sx` 属性

All system properties are available via the [`sx` prop](/system/getting-started/the-sx-prop/). 同时，您也可通过`sx` 属性 指定任何您想添加的 CSS 规则。 下面是一个使用例：

{{"demo": "BoxSx.js", "defaultCodeOpen": true }}

## 覆盖 Material-UI 组件

Box 组件能够封装您的组件。 它创建了一个新的 DOM 元素，默认情况下为 `<div>`，并可以通过 `组件` 的属性进行更改。 假设反之你想使用一个 `<span>`：

{{"demo": "BoxComponent.js", "defaultCodeOpen": true }}

当所需的更改与新的 DOM 元素分开时比较有效。 例如，您可以使用这个方法来更改边距。

但是，有时您的目标是下层的 DOM 元素。 例如，您想更改按钮的边线， 但是按钮组件已经定义自己的样式， 此时您无法使用CSS继承来解决这个问题。 To workaround the problem, you can use the [`sx`](/system/getting-started/the-sx-prop/) prop directly on the child if it is a MUI component.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <Button>保存</Button>
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>保存</Button>
```

如该组件的子组件不是一个 Material-UI 组件，您可通过使用 `component` 属性来达到效果。

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <button>保存</button>
-</Box>
+<Box component="button" sx={{ border: '1px dashed grey' }}>保存</Box>
```

## System props

作为一个CSS通用组件，`Box` 组件同时支持所有的 [`system`](/system/properties/) 属性。 与定义属性一样，您可在组件中直接定义它们。 例如您想定义 margin-top 时

```jsx
<Box mt={2}>
```

## Create your own `Box` component

如您想使用与系统默认主题不同主题的 `Box` 组件，您可以通过`createBox()` 方式创造您专用的版本。

```js
import { createBox, createTheme } from '@mui/system';

const defaultTheme = createTheme({
  // your custom theme values
});

const Box = createBox({ defaultTheme });

export default Box;
```
