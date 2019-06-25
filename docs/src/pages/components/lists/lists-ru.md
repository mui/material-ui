---
title: Список, компонент React
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---

# Списки

<p class="description">Списки представляют собой непрерывные вертикальные массивы данных из текста или изображений.</p>

[Списки](https://material.io/design/components/lists.html) представляют собой непрерывную группу из текста или изображений. Они состоят из элементов, содержащих основные и дополнительные действия, которые представлены значками и текстом.

## Простой список

{{"demo": "pages/components/lists/SimpleList.js"}}

Последний элемент предыдущего примера показывает, как вы можете отрисовать ссылку:

```jsx
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

//...

<ListItemLink href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemLink>
```

Вы можете [посмотреть демо с React Router](/guides/composition/#react-router).

## Вложенный список

{{"demo": "pages/components/lists/NestedList.js"}}

## Список папок

{{"demo": "pages/components/lists/FolderList.js"}}

## Интерактивность

Ниже приведена интерактивная демонстрация, которая позволяет вам увидеть результаты различных настроек:

{{"demo": "pages/components/lists/InteractiveList.js"}}

## Выбранный ListItem

{{"demo": "pages/components/lists/SelectedListItem.js"}}

## Выравнивание элементов списка

Вы должны изменить выравнивание элементов списка при отображении 3 или более элементов. Для этого установите свойство `alignItems = "flex-start"`

{{"demo": "pages/components/lists/AlignItemsList.js"}}

## Элементы управления списком

### Checkbox

Checkbox может быть основным или второстепенным действием.

В этом примере checkbox является основным действием и индикатором состояния для элемента списка. Кнопка комментария является второстепенным действием.

{{"demo": "pages/components/lists/CheckboxList.js"}}

Тут checkbox является второстепенным действием для элемента списка.

{{"demo": "pages/components/lists/CheckboxListSecondary.js"}}

### Switch (переключатель)

Switch является второстепенным действием.

{{"demo": "pages/components/lists/SwitchListSecondary.js"}}

## Закрепленный подзаголовок

При прокрутке подзаголовки остаются закрепленными в верхней части экрана, пока следующий подзаголовок не оттеснит предыдущий.

Эта функция опирается на фиксированное позиционирование CSS. К сожалению эта функциональность, [не реализована](https://caniuse.com/#search=sticky) всеми браузерами, которые мы поддерживаем. Мы по умолчанию выключаем закрепление - `disableSticky` когда оно не поддерживается.

{{"demo": "pages/components/lists/PinnedSubheaderList.js"}}

## Вставленный список

{{"demo": "pages/components/lists/InsetList.js"}}

## Virtualized List

In the following example, we demonstrate how to use [react-window](https://github.com/bvaughn/react-window) with the `List` component. Он отображает 200 строк и c легкостью может еще больше. Virtualization helps with performance issues.

{{"demo": "pages/components/lists/VirtualizedList.js"}}

We encourage the use of [react-window](https://github.com/bvaughn/react-window) when possible. If this library doesn't cover your use case, you should consider using [react-virtualized](https://github.com/bvaughn/react-virtualized), then alternatives like [react-virtuoso](https://github.com/petyosi/react-virtuoso).