---
title: React-компонент Панель навигации
components: AppBar, Toolbar, Menu
---

# Панель навигации

<p class="description">Панель навигации отображает информацию и действия, относящиеся к текущему экрану.</p>

В [](https://material.io/design/components/app-bars-top.html)верхней панели приложений</a> отображается содержимое и действия, связанные с текущим экраном. Он используется для брендинга, заголовков экрана, навигации и действий.

It can transform into a contextual action bar or be used as a navbar.

## Простая панель навигации

{{"demo": "pages/components/app-bar/ButtonAppBar.js", "bg": true}}

## Панель навигации с основным полем поиска

Основная панель поиска.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js", "bg": true}}

## Панель навигации с меню

{{"demo": "pages/components/app-bar/MenuAppBar.js", "bg": true}}

## Панель навигации с полем для поиска

Боковая панель поиска.

{{"demo": "pages/components/app-bar/SearchAppBar.js", "bg": true}}

## Dense (Только для компьютеров)

{{"demo": "pages/components/app-bar/DenseAppBar.js", "bg": true}}

## Prominent

A prominent app bar.

{{"demo": "pages/components/app-bar/ProminentAppBar.js", "bg": true}}

## Bottom App Bar

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Fixed placement

When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. Here are 3 possible solutions:

1. You can use `position="sticky"` instead of fixed. ⚠️ sticky is not supported by IE 11.
2. You can render a second `<Toolbar />` component:

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. You can use `theme.mixins.toolbar` CSS:

```jsx
const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  )
};
```

## Scrolling

You can use the `useScrollTrigger()` hook to respond to user scroll actions.

### Скрытие панели навигации

The app bar hides on scroll down to leave more space for reading.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### Поднять Панель Приложения

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### Вернуться в начало страницы

A floating action buttons appears on scroll to make it easy to get back to the top of the page.

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