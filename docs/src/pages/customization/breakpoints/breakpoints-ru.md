# Контрольные точки

<p class="description">API, позволяющее использовать контрольные точки во множестве контекстов.</p>

Для оптимального взаимодействия с пользователем material интерфейсы должны быть в состоянии адаптировать свое расположение в различных точках останова. Material-UI использует **упрощенную** реализацию оригинальной [спецификации](https://material.io/design/layout/responsive-layout-grid.html#breakpoints).

The breakpoints are used internally in various components to make them responsive, but you can also take advantage of them for controlling the layout of your application through the [Grid](/components/grid/) and [Hidden](/components/hidden/) components.

## Default breakpoints

Каждая контрольная точка (ключ) соответствует *фиксированной* ширине экрана (значению):

- **xs,** extra-small: 0px
- **sm,** small: 600px
- **md,** medium: 960px
- **lg,** large: 1280px
- **xl,** extra-large: 1920px

These breakpoint values are used to determine breakpoint ranges. Диапазон начинается с значения первой точки (включительно) до следующей, но не включая её:

```js
значение             |0px     600px    960px    1280px   1920px
ключ                     |xs      sm       md       lg       xl
ширина экрана  |----------|--------------|-------------------->
диапазон             |   xs   |   m   |   md |   lg   |   xl
```

These values can be [customized](#custom-breakpoints).

## CSS Media Queries

CSS media queries are the idiomatic approach to make your UI responsive. The theme provides four styles helpers to do so:

- [theme.breakpoints.up(key)](#theme-breakpoints-up-key-media-query)
- [theme.breakpoints.down(key)](#theme-breakpoints-down-key-media-query)
- [theme.breakpoints.only(key)](#theme-breakpoints-only-key-media-query)
- [theme.breakpoints.between(start, end)](#theme-breakpoints-between-start-end-media-query)

В следующем примере мы изменяем фоновой цвет (красный, синий или зеленый) в зависимости от ширины экрана.

```jsx
const styles = theme => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: green[500],
    },
  },
});
```

{{"demo": "pages/customization/breakpoints/MediaQuery.js"}}

## JavaScript Media Queries

Иногда использования CSS недостаточно. Во можете изменить дерево визуализации React'а основываясь на контрольных точках.

### useMediaQuery hook

You can learn more on the [useMediaQuery](/components/use-media-query/) page.

### withWidth()

> ⚠️ This higher-order component will be deprecated for the [useMediaQuery](/components/use-media-query/) hook.

```jsx
import withWidth from '@material-ui/core/withWidth';

function MyComponent(props) {
  return <div>{`Current width: ${props.width}`}</div>;
}

export default withWidth()(MyComponent);
```

In the following demo, we change the rendered DOM element (*em*, <u>u</u>, ~~del~~ & span) based on the screen width.

{{"demo": "pages/customization/breakpoints/WithWidth.js"}}

## Custom breakpoints

You define your project's breakpoints in the `theme.breakpoints` section of your theme.

- [`theme.breakpoints.values`](/customization/default-theme/?expand-path=$.breakpoints.values): Default to the [above values](#default-breakpoints). The keys are your screen names, and the values are the min-width where that breakpoint should start.
- `theme.breakpoints.unit`: Default to `px`. The unit used for the breakpoint's values.
- `theme.breakpoints.step`: Default to 5 (`0.05px`). The increment used to implement exclusive breakpoints.

If you change the default breakpoints's values, you need to provide them all:

```jsx
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})
```

Feel free to have as few or as many breakpoints as you want, naming them in whatever way you'd prefer for your project.

```js
const theme = createMuiTheme({
  breakpoints: {
    values: {
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});
```

If you are using TypeScript, you would also need to use [module augmentation](/guides/typescript/#customization-of-theme) for the theme to accept the above values.

```ts
declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}
```

## API

### `theme.breakpoints.up(key) => media query`

#### Аргументы

1. `key` (*String* | *Number*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixels.

#### Возвращает

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths greater than and including the screen size given by the breakpoint key.

#### Примеры

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, ∞)
    //       [960px, ∞)
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.down(key) => media query`

#### Аргументы

1. `key` (*String* | *Number*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixels.

#### Возвращает

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths less than and including the screen size given by the breakpoint key.

#### Примеры

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [0, md + 1)
    //       [0, lg)
    //       [0, 1280px)
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.only(key) => media query`

#### Аргументы

1. `key` (*String*): A breakpoint key (`xs`, `sm`, etc.).

#### Возвращает

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths including the screen size given by the breakpoint key.

#### Примеры

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, md + 1)
    //       [md, lg)
    //       [960px, 1280px)
    [theme.breakpoints.only('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.between(start, end) => media query`

#### Аргументы

1. `start` (*String*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixels.
2. `end` (*String*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixels.

#### Возвращает

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths greater than the screen size given by the breakpoint key in the first argument and less than the the screen size given by the breakpoint key in the second argument.

#### Примеры

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [sm, md + 1)
    //       [sm, lg)
    //       [600px, 1280px[
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `withWidth([options]) => higher-order component`

Вставить свойство `width`. Оно не изменяет переданный в него компонент; вместо этого оно возвращает новый компонент. Свойство точки останова `width` соответствует текущей ширине экрана. Это может быть одна из следующих точек останова:

```ts
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

Некоторые детали реализации, которые могут быть интересны для понимания:

- It forwards *non React static* properties so this HOC is more "transparent". For instance, it can be used to defined a `getInitialProps()` static method (next.js).

#### Аргументы

1. `варианты` (*объекта* [optional]): 
  - `options.withTheme` (*Boolean* [optional]): По умолчанию - `false`. Provide the `theme` object to the component as a property.
  - `options.noSSR` (*Boolean* [optional]): По умолчанию - `false`. In order to perform the server-side rendering reconciliation, it needs to render twice. A first time with nothing and a second time with the children. This double pass rendering cycle comes with a drawback. The UI might blink. You can set this flag to `true` if you are not doing server-side rendering.
  - `options.initialWidth` (*Breakpoint* [optional]): As `window.innerWidth` is unavailable on the server, we default to rendering an empty component during the first mount. You might want to use an heuristic to approximate the screen width of the client browser screen width. For instance, you could be using the user-agent or the client-hints. https://caniuse.com/#search=client%20hint, we also can set the initial width globally using [`custom properties`](/customization/globals/#default-props) on the theme. In order to set the initialWidth we need to pass a custom property with this shape:

```js
const theme = createMuiTheme({
  props: {
    // withWidth component ⚛️
    MuiWithWidth: {
      // Initial width property
      initialWidth: 'lg', // Breakpoint being globally set 🌎!
    },
  },
});
```

- `options.resizeInterval` (*Number* [optional]): Defaults to 166, corresponds to 10 frames at 60 Hz. Number of milliseconds to wait before responding to a screen resize event.

#### Возвращает

`компонент высшего порядка`: следует использовать, чтобы обернуть компонент.

#### Примеры

```jsx
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

function MyComponent(props) {
  if (isWidthUp('sm', props.width)) {
    return <span />
  }

  return <div />;
}

export default withWidth()(MyComponent);
```

## Default values

You can explore the default values of the breakpoints using [the theme explorer](/customization/default-theme/?expand-path=$.breakpoints) or by opening the dev tools console on this page (`window.theme.breakpoints`).