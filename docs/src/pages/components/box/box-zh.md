---
title: Box React组件
---

# Box（盒子）

<p class="description">Box组件充当大多数CSS实用程序需求的包装器组件。</p>

所述盒组件包 [的所有样式的功能](/system/basics/#all-inclusive) 被暴露在 `@material-ui/system`。 它是使用 `@material-ui/styles`的 [`styled()`](/styles/api/#styled-style-function-component) 函数创建的。

## 示例

[调色板](/system/palette/) 样式功能。

## 覆盖Material-UI组件

Box组件包装您的组件。 它创建了一个新的DOM元素，默认情况下为 `<div>` ，可以使用 `组件` 属性进行更改。 假设您想使用 `<span>` 代替：

```jsx
<Box component="span" m={1}>
  <Button />
</Box>
```

当更改可以隔离到新的DOM元素时，这很有用。 例如，您可以通过这种方式更改边距。

但是，有时您必须定位底层DOM元素。 例如，您想要更改按钮的文本颜色。 Button组件定义自己的颜色。 CSS继承没有帮助。 要解决此问题，您有两种选择：

1. 使用 [`React.cloneElement()`](https://reactjs.org/docs/react-api.html#cloneelement)

Box组件具有 `clone` 属性，以允许使用React的clone元素方法。

```jsx
<Box color="text.primary" clone>
  <Button />
</Box>
```

1. 使用渲染道具

Box可以将函数作为子组件。 你可以拉出 `className`。

```jsx
<Box color="text.primary">
  {props => <Button {...props} />}
</Box>
```

> ⚠️CSS特异性依赖于导入顺序。 如果你想要保证改写被包裹组件的样式， 您需要在最后导入Box。

## API

```jsx
import Box from '@material-ui/core/Box';
```

| 名称                                                      | 类型                                                                                                                | 默认                                      | 描述                                                         |
|:------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:---------------------------------------------------------- |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br />&nbsp;func<br /></span>                                 |                                         | 框渲染功能或节点。                                                  |
| <span class="prop-name">clone</span>                    | <span class="prop-type">bool</span>                                                                               | <span class="prop-default">false</span> | 如果设置为 `true`，盒子将会重新循环其子DOM元素。 它在内部使用 `React.cloneElement`。 |
| <span class="prop-name">组件</span>                       | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br />&nbsp;func&nbsp;&#124;<br />&nbsp;object<br /></span> | <span class="prop-default">'div'</span> | 用于根节点的组件。 要么是使用DOM元素的字符串，要么是组件。                            |

所提供的任何其它性质将被使用 [的样式功能](/system/basics/#all-inclusive) 或扩散到根元素。