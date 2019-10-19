---
title: React-компонент Панель навигации
components: AppBar, Toolbar, Menu
---

# Панель навигации

<p class="description">Панель навигации отображает информацию и действия, относящиеся к текущему экрану.</p>

В [](https://material.io/design/components/app-bars-top.html)верхней панели приложений</a> отображается содержимое и действия, связанные с текущим экраном. Он используется для брендинга, заголовков экрана, навигации и действий.

Может трансформироваться в контекстную панель действий или использоваться в качестве панели навигации.

## Простая панель навигации

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## Панель навигации с основным полем поиска

Основная панель поиска.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## Панель навигации с меню

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## Панель навигации с полем для поиска

Боковая панель поиска.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Dense (Только для компьютеров)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Нижняя панель навигации

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Прокрутка

Вы можете использовать hook `useScrollTrigger()` для ответа на действия пользователя по прокрутке.

### Скрытие панели навигации

Панель приложения прячется на прокрутите вниз, чтобы оставить больше места для чтения.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### Поднять Панель Приложения

Панель приложения поднимается при прокрутке, сообщая, что пользователь находится не в верхней части страницы.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### Вернуться в начало страницы

Появляются плавающие кнопки действий, позволяющие легко вернуться к началу страницы.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true, "maxWidth": 500}}

### `useScrollTrigger ([options]) => триггер`

#### Аргументы

1. `варианты` (*объекта* [optional]):

- `options.disableHysteresis` (*Boolean* [optional]): Defaults to `false`. Disable the hysteresis. Игнорирование направления прокрутки когда определено `trigger` значение.
- `options.target` (*Node* [optional]): По умолчанию `window`.
- `options.threshold` (*Number* [optional]): Defaults to `100`. Change the `trigger` value when the vertical scroll strictly crosses this threshold (exclusive).

#### Возвращает

`trigger`: Does the scroll position match the criteria?

#### Примеры

```jsx
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hello</div>
    </Slide>
  );
}
```