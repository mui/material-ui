---
title: React Box（分组）组件
githubLabel: 'component: Box'
---

# Box 分组

<p class="description">对于大多数 CSS 实用程序来说，Box 组件能够作为一个包装组件来使用。</p>

在`@material-ui/system`中，您可以找到所述 Box 组件包的 [所有的样式功能](/system/basics/#all-inclusive)。

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 示例

查看[调色板](/system/palette/)样式功能。

## `sx` 属性

所有的样式功能都可以通过 [`sx` 属性 ](/system/basics/#the-sx-prop)更改。 同时，您也可通过`sx` 属性 指定任何您想添加的 CSS 规则。 下面是一个使用例：

{{"demo": "BoxSx.js", "defaultCodeOpen": true }}

## 覆盖 Material UI 组件

Box 组件能够封装您的组件。 它创建了一个新的 DOM 元素，默认情况下为 `<div>`，并可以通过 `组件` 的属性进行更改。 假设反之你想使用一个 `<span>`：

{{"demo": "BoxComponent.js", "defaultCodeOpen": true }}

当所需的更改与新的 DOM 元素分开时比较有效。 例如，您可以使用这个方法来更改边距。

但是，有时您的目标是下层的 DOM 元素。 例如，您想更改按钮的边线， 但是按钮组件已经定义自己的样式， 此时您无法使用CSS继承来解决这个问题。 为了回避这个 CSS 继承无效的问题， 如该组件的子组件是一个 Material UI 组件，您可直接在该组件上定义 [`sx`](/system/basics/#the-sx-prop) 属性。

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <Button>Save</Button>
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>Save</Button>
```

如该组件的子组件不是一个 Material UI 组件，您可通过使用 `component` 属性来达到效果。

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <button>Save</button>
-</Box>
+<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
```

## API

```jsx
import Box from '@mui/material/Box';
```

| 名称                                       | 类型                                                                                                                            | 默认值                                     | 描述                                         |
|:---------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:------------------------------------------ |
| <span class="prop-name">children</span>  | <span class="prop-type">node<br></span>                                                                                 |                                         | Box 渲染函数或者返回节点。                            |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | component 用于根节点。 可以是一个使用 DOM 元素或者一个组件的字符串。 |
| <span class="prop-name">sx</span>        | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | 接受所有系统属性，以及任何有效的 CSS 属性。                   |

## 系统属性

作为一个 CSS 通用组件，`Box` 组件同时支持所有的 [`system`](/system/properties/) 属性。 与定义属性一样，您可在组件中直接定义它们。 例如您想定义 margin-top 时

```jsx
<Box mt={2}>
```

## 创造您专用的 `Box` 组件

如您想使用与系统默认主题不同主题的 `Box` 组件，您可以通过`createBox()` 方式创造您专用的版本。

```js
import { createBox, createTheme } from '@mui/system';

const defaultTheme = createTheme({
  // your custom theme values
});

const Box = createBox({ defaultTheme });

export default Box;
```
