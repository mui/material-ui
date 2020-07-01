---
title: React 分组组件
---

# Box 分组

<p class="description">对于大多数 CSS 实用程序来说，Box 组件能够作为一个包装组件来使用。</p>

在`@material-ui/system`中，您可以找到所述 Box 组件包的 [所有的样式功能](/system/basics/#all-inclusive)。 它是通过 `@material-ui/core/styles` 中的 [`styled()`](/styles/api/#styled-style-function-component) 函数来创建的。

## 示例

查看[调色板](/system/palette/)样式功能。

## 覆盖 Material-UI 组件

Box 组件能够封装您的组件。 它创建了一个新的 DOM 元素，默认情况下为 `<div>`，并可以通过 `组件` 的属性进行更改。 假设反之你想使用一个 `<span>`：

```jsx
<Box component="span" m={1}>
  <Button />
</Box>
```

当所需的更改与新的 DOM 元素分开时比较有效。 例如，您可以使用这个方法来更改边距。

但是，有时您必须针对到底层的 DOM 元素。 例如，您想要更改一个按钮的文本颜色。 Button 组件已经定义好了它自己的颜色。 CSS 继承于事无补。 要解决此问题，您有以下两种选择：

1. 使用 [`React.cloneElement()`](https://reactjs.org/docs/react-api.html#cloneelement)

Box 组件有一个 `clone` 的属性，通过它您可以使用 React 克隆元素的方法。

```jsx
<Box color="text.primary" clone>
  <Button />
</Box>
```

2. 使用 render props

您可以在 Box 的子组件中使用 render props 的函数。 您可以不用 `className`。

```jsx
<Box color="text.primary">
  {props => <Button {...props} />}
</Box>
```

> ⚠️CSS 的优先级依赖于导入的顺序。 如果您希望确保覆写包装组件的样式，则需要在最后才导入 Box。

## API

```jsx
import Box from '@material-ui/core/Box';
```

| 名称                                                      | 类型                                                                                                                | 默认值                                     | 描述                                                             |
|:------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:-------------------------------------------------------------- |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br />&nbsp;func<br /></span>                                 |                                         | Box 渲染函数或者返回节点。                                                |
| <span class="prop-name">clone</span>                    | <span class="prop-type">bool</span>                                                                               | <span class="prop-default">false</span> | 如果设置为 `true`，box 将会重复利用其子 DOM 元素。 它在内部使用 `React.cloneElement`。 |
| <span class="prop-name">component</span>                | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br />&nbsp;func&nbsp;&#124;<br />&nbsp;object<br /></span> | <span class="prop-default">'div'</span> | component 用于根节点。 可以是一个使用 DOM 元素或者一个组件的字符串。                     |


任何所提供的其它的属性会在[样式功能](/system/basics/#all-inclusive)中使用，或者传递到根元素。