---
title: React-компонент Панель навигации
components: AppBar, Toolbar, Menu
---

# Панель навигации

<p class="description">Панель навигации отображает информацию и действия, относящиеся к текущему экрану.</p>

В [](https://material.io/design/components/app-bars-top.html)верхней панели приложений</a> отображается содержимое и действия, связанные с текущим экраном. Она используется для брендинга, заголовков экрана, навигации и действий.

Она может использоваться как контекстное меню или как навигационная панель.

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

## Выступающая

Выступающая панель навигации.

{{"demo": "pages/components/app-bar/ProminentAppBar.js", "bg": true}}

## Нижняя панели навигации

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 400}}

## Фиксированное положение

Когда вы рендерите навигационную панель с фиксированным положением, размер элемента не влияет на остальную часть страницы. Это может быть причиной того, что часть вашего содержимого может стать невидимой, скрываясь за навигационной панелью. Есть 3 варианта решения:

1. Вы можете использовать `position="sticky"` вместо `"fixed"`. ⚠️ `"sticky"` не поддерживается в IE 11.
2. Вы можете отрендерить второй `<Toolbar />` компонент:

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* содержимое */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. Вы можете использовать `theme.mixins.toolbar` в CSS:

```jsx
const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* содержимое */}</Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  )
};
```

## Прокрутка

Вы можете использовать `useScrollTrigger()` хук, отвечающий за механизм прокрутки.

### Скрыть панель навигации

Панель навигации прячется при прокрутке вниз, освобождая место для чтения.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true}}

### Надвинуть панель навигации

Панель навигации наползает на содержимое при прокрутке, сообщая пользователю, что он находится не в начале страницы.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true}}

### Вернуться в начало страницы

Плавающая кнопка появляется при прокрутке, позволяя легко вернуться в начало страницы.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true}}

### `useScrollTrigger ([options]) => триггер`

#### Аргументы

1. `варианты` (*объекта* [optional]):

- `options.disableHysteresis` (*Boolean* [optional]): По умолчанию - `false`. Отключение запаздывания. Игнорирование направления прокрутки когда определено `trigger` значение.
- `options.target` (*Node* [optional]): По умолчанию `window`.
- `options.threshold` (*Number* [optional]): По умолчанию `100`. Измените значение `trigger` когда вертикальная прокрутка строго первышает этот порог (исключительно).

#### Возвращает

`trigger`: Соответствует ли положение прокрутки критерию?

#### Примеры

```jsx
<div>
```