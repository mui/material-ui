---
title: Box React component
---

# Box

<p class="description">Box компонент используется как обертка компонента для большинства CSS utility.</p>

The Box component packages [all the style functions](/system/basics/#all-inclusive) that are exposed in `@material-ui/system`. It's created using the [`styled()`](/styles/api/#styled-style-function-component) function of `@material-ui/styles`.

## Пример

[The palette](/system/palette/) style function.

## Переопределение Material-UI компонентов

Box компонент оборачивает ваш компонент. Создает новый DOM элемент, `<div>` по умолчанию, но может быть изменен `component` свойством. Давайте предположим вы хотите использовать`<span>` взамен:

```jsx
<Box component="span" m={1}>
  <Button />
</Box>
```

Это работает превосходно когда изменения могут быть изолированы в новый DOM элемент. Для сущности, вы можете изменить margin(внешний отступ) таким образом.

However, sometimes you have to target the underlying DOM element. For instance, you want to change the text color of the button. The Button component defines its own color. CSS inheritance doesn't help. To workaround the problem, you have two options:

1. Use [`React.cloneElement()`](https://reactjs.org/docs/react-api.html#cloneelement)

The Box component has a `clone` property to enable the usage of the clone element method of React.

```jsx
<Box color="text.primary" clone>
  <Button />
</Box>
```

1. Use render props

The Box children accepts a render props function. You can pull out the `className`.

```jsx
<Box color="text.primary">
  {props => <Button {...props} />}
</Box>
```

> ⚠️ The CSS specificity relies on the import order. If you want the guarantee that the wrapped component's style will be overridden, you need to import the Box last.

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Name                                                    | Type                                                                                                              | Default                                 | Description                                                                                           |
|:------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:----------------------------------------------------------------------------------------------------- |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br />&nbsp;func<br /></span>                                 |                                         | Box render function or node.                                                                          |
| <span class="prop-name">clone</span>                    | <span class="prop-type">bool</span>                                                                               | <span class="prop-default">false</span> | If `true`, the box will recycle its children DOM element. It's using `React.cloneElement` internally. |
| <span class="prop-name">component</span>                | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br />&nbsp;func&nbsp;&#124;<br />&nbsp;object<br /></span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component.            |

Any other properties supplied will be used by [the style functions](/system/basics/#all-inclusive) or spread to the root element.