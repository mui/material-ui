---
title: React Box（分组）组件
githubLabel: 'component: Box'
---

# Box 分组

<p class="description">对于大多数 CSS 实用程序来说，Box 组件能够作为一个包装组件来使用。</p>

The Box component packages [all the style functions](/system/basics/#all-inclusive) that are exposed in `@mui/system`.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Example

查看[调色板](/system/palette/)样式功能。

## The `sx` prop

所有系统属性都可以通过 [`sx` 属性获得](/system/basics/#the-sx-prop)。 此外，`sx` 属性允许您指定您可能需要的任何其他 CSS 样式。 下面是一个如何使用的示例：

{{"demo": "pages/components/box/BoxSx.js", "defaultCodeOpen": true }}

## Overriding MUI components

Box 组件能够封装您的组件。 It creates a new DOM element, a `<div>` that by default can be changed with the `component` prop. 假设反之你想使用一个 `<span>`：

{{"demo": "pages/components/box/BoxComponent.js", "defaultCodeOpen": true }}

当所需的更改与新的 DOM 元素分开时比较有效。 例如，您可以使用这个方法来更改边距。

但是，有时您必须针对到底层的 DOM 元素。 比如，你要修改按钮的边框 但是按钮组件已经定义自己的样式。 所以使用 CSS 继承是于事无补的。 想要解决这个问题，可以将[`sx`](/system/basics/#the-sx-prop)作为MUI组件的props使用

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <Button>保存</Button>
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>保存</Button>
```

For non-MUI components, use the `component` prop.

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

| 名称                                       | 类型                                                                                                                            | 默认值                                     | Description                                |
|:---------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:------------------------------------------ |
| <span class="prop-name">children</span>  | <span class="prop-type">node<br></span>                                                                                 |                                         | Box 渲染函数或者返回节点。                            |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | component 用于根节点。 可以是一个使用 DOM 元素或者一个组件的字符串。 |
| <span class="prop-name">sx</span>        | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | 接受所有系统属性，以及任何有效的 CSS 属性。                   |

## 系统属性

As a CSS utility component, the `Box` also supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Box mt={2}>
```
