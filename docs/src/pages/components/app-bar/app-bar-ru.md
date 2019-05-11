---
title: React-компонент Панель навигации
components: AppBar, Toolbar, Menu
---

# Панель навигации

<p class="description">Панель навигации отображает информацию и действия, относящиеся к текущему экрану.</p>

В [](https://material.io/design/components/app-bars-top.html)верхней панели приложений</a> отображается содержимое и действия, связанные с текущим экраном. Он используется для брендинга, заголовков экрана, навигации и действий.

Может трансформироваться в контекстную панель действий или использоваться в качестве панели навигации.

## Панель навигации с кнопками

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## Простая панель навигации

{{"demo": "pages/components/app-bar/SimpleAppBar.js"}}

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

## Нижняя панели навигации

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Scrolling

### Hide App Bar

An App Bar that hides on scroll.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": "true", "maxWidth": 500}}

### Elevate App Bar

An App Bar that elevates on scroll.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": "true", "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Аргументы

1. `options` (*Object* [optional]):

- `options.disableHysteresis` (*Boolan* [optional]): Defaults to `false`. Disable the hysteresis. Ignore the scroll direction when determining the `trigger` value.
- `options.target` (*Node* [optional]): Defaults to `window`.
- `options.threshold` (*Number* [optional]): Defaults to `100`. Change the `trigger` value when the vertical scroll crosses this threshold.

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