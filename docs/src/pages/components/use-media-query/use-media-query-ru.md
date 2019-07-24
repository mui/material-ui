---
title: Consulta de mídia no React para design responsivo
---

# useMediaQuery

<p class="description">Это хук медиа-запроса CSS для React. Он ожидает(слушает) совпадения с медиа-запросом CSS. Он позволяет отображать компоненты в зависимости от того, соответствует запрос или нет.</p>

Some of the key features:

- ⚛️ Имеет идиоматический React API.
- 🚀 Он производителен. Он наблюдает за документом, чтобы определить, когда его медиа-запросы изменяются, вместо периодического опроса значения.
- 1 [1 кБ в сжатом виде](/size-snapshot).
- 🤖 It supports server-side rendering.

## Простой медиа-запрос

Вы должны предоставить медиа-запросу первый аргумент хука. Строка медиа-запроса может быть любым допустимым значением медиа-запросом CSS, например, `'print'`.

{{"demo": "pages/components/use-media-query/SimpleMediaQuery.js", "defaultCodeOpen": true}}

## Использование помощников точек перелома Material-UI

Вы можете использовать [помощников точек перелома Material-UI](/customization/breakpoints/) следующим образом:

```jsx
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

{{"demo": "pages/components/use-media-query/ThemeHelper.js"}}

Alternatively, you can use a callback function, accepting the theme as a first argument:

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

⚠️ There is **no default** theme support, you have to inject it in a parent theme provider.

## Using JavaScript syntax

You can use [json2mq](https://github.com/akiran/json2mq) to generate media query string from a JavaScript object.

{{"demo": "pages/components/use-media-query/JavaScriptMedia.js", "defaultCodeOpen": true}}

## Server-side rendering

An implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) is required on the server. We recommend using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate it.

{{"demo": "pages/components/use-media-query/ServerSide.js"}}

⚠️ Server-side rendering and client-side media queries are fundamentally at odds. Be aware of the tradeoff. The support can only be partial.

Try relying on client-side CSS media queries first. For instance, you could use:

- [`<Box display>`](/system/display/#hiding-elements)
- [`<Hidden implementation="css">`](/components/hidden/#css)
- or [`themes.breakpoints.up(x)`](/customization/breakpoints/#css-media-queries)

## Тестирование

Similar to the server-side case, you need an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) in your test environment.

For instance, [jsdom doesn't support it yet](https://github.com/jsdom/jsdom/blob/master/test/web-platform-tests/to-upstream/html/browsers/the-window-object/window-properties-dont-upstream.html). You should polyfill it. We recommend using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate it.

```js
import mediaQuery from 'css-mediaquery';

function createMatchMedia(width) {
  return query => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
}

describe('MyTests', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });
});
```

## Migrating from `withWidth()`

The `withWidth()` higher-order component injects the screen width of the page. You can reproduce the same behavior with a `useWidth` hook:

{{"demo": "pages/components/use-media-query/UseWidth.js"}}

## API

### `useMediaQuery(query, [options]) => matches`

#### Аргументы

1. `query` (*String* | *Function*): A string representing the media query to handle or a callback function accepting the theme (in the context) that returns a string.
2. `options` (*Object* [optional]): 
    - `options.defaultMatches` (*Boolean* [optional]): As `window.matchMedia()` is unavailable on the server, we return a default matches during the first mount. The default value is `false`.
    - `options.noSsr` (*Boolean* [optional]): Defaults to `false`. In order to perform the server-side rendering reconciliation, it needs to render twice. A first time with nothing and a second time with the children. This double pass rendering cycle comes with a drawback. It's slower. You can set this flag to `true` if you are **not doing server-side rendering**.
    - `options.ssrMatchMedia` (*Function* [optional]) You might want to use an heuristic to approximate the screen of the client browser. For instance, you could be using the user-agent or the client-hint https://caniuse.com/#search=client%20hint. You can provide a global ponyfill using [`custom props`](/customization/globals/#default-props) on the theme. Check the [server-side rendering example](#server-side-rendering).

#### Возвращает

`matches`: Matches is `true` if the document currently matches the media query and `false` when it does not.

#### Примеры

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('print');

  return <span>{`@media (min-width:600px) matches: ${matches}`}</span>;
}
```