---
title: Компонент React Box
githubLabel: 'component: Box'
---

# Box

<p class="description">Box компонент используется как обертка компонента для большинства используемых CSS свойств.</p>

The Box component packages [all the style functions](/system/basics/#all-inclusive) that are exposed in `@material-ui/system`. It's created using the `experimentalStyled()` function of `@material-ui/core/styles`.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Пример

[The palette](/system/palette/) style function.

## The sx prop

All system properties are available via the `sx` prop. This property allows you to specify any CSS rules you may need, in addition to the ones already available as part of the system. Here is an example of how you can use it:

{{"demo": "pages/components/box/BoxSx.js", "defaultCodeOpen": true }}

## Переопределение Material-UI компонентов

Box компонент оборачивает ваш компонент. Он создает новый DOM элемент, это `<div>` по умолчанию, хотя это можно изменить свойством `component`. Например если вы хотите использовать`<span>` взамен:

{{"demo": "pages/components/box/BoxComponent.js", "defaultCodeOpen": true }}

Это работает превосходно когда изменения могут быть изолированы в новый DOM элемент. Для сущности, вы можете изменить margin(внешний отступ) таким образом.

Тем не менее, иногда вам нужно ориентироваться на базовый элемент DOM. For instance, you want to change the border of the Button. The Button component defines its own styles. Наследование CSS не помогает. Чтобы обойти проблему, у вас есть два варианта:

1. Использовать [`React.cloneElement()`](https://reactjs.org/docs/react-api.html#cloneelement)

Компонент Box имеет свойство `clone`, которое позволяет использовать метод clone element из React.

{{"demo": "pages/components/box/BoxClone.js", "defaultCodeOpen": true }}

2. Используйте render свойства

The Box children accepts a render props function. You can pull out the `className`.

{{"demo": "pages/components/box/BoxRenderProps.js", "defaultCodeOpen": true }}

> ⚠️ The CSS specificity relies on the import order. If you want the guarantee that the wrapped component's style will be overridden, you need to import the Box last.

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Имя                                                     | Тип                                                                                                                           | По-умолчанию                            | Описание                                                                                              |
|:------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:----------------------------------------------------------------------------------------------------- |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br>&nbsp;func<br></span>                                     |                                         | Box render function or node.                                                                          |
| <span class="prop-name">clone</span>                    | <span class="prop-type">bool</span>                                                                                           | <span class="prop-default">false</span> | If `true`, the box will recycle its children DOM element. It's using `React.cloneElement` internally. |
| <span class="prop-name">component</span>                | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component.            |
| <span class="prop-name">sx</span>                       | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | Accepts all system properties, as well as any valid CSS properties.                                   |
