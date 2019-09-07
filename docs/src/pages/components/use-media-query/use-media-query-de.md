---
title: Medienanfragen in React für Responsive Design
---

# useMediaQuery

<p class="description">Dies ist ein CSS-Media-Abfrage-Hook für React. Es wartet auf Übereinstimmungen mit einer CSS-Medienabfrage. Es ermöglicht das Rendern von Komponenten basierend darauf, ob die Abfrage übereinstimmt oder nicht.</p>

Einige der wichtigsten Funktionen:

- ⚛️ Es verfügt über eine idiomatische React-API.
- 🚀 Es ist performant. Es observiert das Dokument, welches erkennt, wenn sich die Medienabfragen ändern, anstatt die Werte regelmäßig abzufragen.
- 📦 [ kB](/size-snapshot) gzipped.
- 🤖 It supports server-side rendering.

## Einfache Medienabfrage

Sie sollten eine Medienabfrage für das erste Argument des Hooks bereitstellen. Die Medienabfragezeichenfolge kann durch jede gültige CSS-Medienabfrage erfolgen, z.B. `'print'`.

{{"demo": "pages/components/use-media-query/SimpleMediaQuery.js", "defaultCodeOpen": true}}

## Verwenden der Haltepunkt-Helfer der Material-UI

Sie können die Material-UI [Haltepunkt-Helfer](/customization/breakpoints/) wie folgt verwenden:

```jsx
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') entspricht: ${matches}`}</span>;
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

## JavaScript-Syntax verwenden

You can use [json2mq](https://github.com/akiran/json2mq) to generate media query string from a JavaScript object.

{{"demo": "pages/components/use-media-query/JavaScriptMedia.js", "defaultCodeOpen": true}}

## Server-Rendering

An implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) is required on the server. Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate it is recommended.

{{"demo": "pages/components/use-media-query/ServerSide.js"}}

⚠️ Server-side rendering and client-side media queries are fundamentally at odds. Be aware of the tradeoff. The support can only be partial.

Try relying on client-side CSS media queries first. For instance, you could use:

- [`<Box display>`](/system/display/#hiding-elements)
- [`<Hidden implementation="css">`](/components/hidden/#css)
- or [`themes.breakpoints.up(x)`](/customization/breakpoints/#css-media-queries)

## Testen

Similar to the server-side case, you need an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) in your test environment.

For instance, [jsdom doesn't support it yet](https://github.com/jsdom/jsdom/blob/master/test/web-platform-tests/to-upstream/html/browsers/the-window-object/window-properties-dont-upstream.html). You should polyfill it. Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate it is recommended.

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

## Migration von `withWidth()`

Die Komponente höherer Ordnung `withWidth()` fügt die Bildschirmbreite der Seite ein. Sie können dasselbe Verhalten mit einem `useWidth` Hook reproduzieren:

{{"demo": "pages/components/use-media-query/UseWidth.js"}}

## API

### `useMediaQuery(query, [options]) => matches`

#### Argumente

1. `query` (*String* | *Function*): A string representing the media query to handle or a callback function accepting the theme (in the context) that returns a string.
2. `options` (*Object* [optional]): 
  - ` options.defaultMatches ` (*Boolean* [optional]): Da `window.matchMedia()` auf dem Server nicht verfügbar ist, wird ein Standard Match zurückgegeben. Der Standardwert ist `false`.
  - `options.noSsr ` (*Boolean* [optional]): Standardeinstellung ist `false`. Um den serverseitigen Renderingabgleich durchzuführen, muss er zweimal gerendert werden. Ein erstes Mal mit nichts und ein zweites Mal mit den Kind-Elementen. Dieser Zyklus mit zwei Durchgängen ist mit einem Nachteil verbunden. Es ist langsamer. Sie können diese Flag auf `true` setzten, wenn Sie **nicht serverseitig** rendern.
  - `options.ssrMatchMedia` (*Function* [optional]) Vielleicht möchten Sie eine Heuristik verwenden, um annähernd den Bildschirm des Client - Browser zu bestimmen. Sie könnten beispielsweise den Benutzeragenten oder den Client-Hinweis https://caniuse.com/#search=client%20hint verwenden. You can provide a global ponyfill using [`custom props`](/customization/globals/#default-props) on the theme. Lesen Sie hier mehr dazu: [serverseitige Rendering Beispiel](#server-side-rendering).

#### Rückgabewerte

`matches`: Match ist `true` wenn das Dokument aktuell mit der Medienabfrage übereinstimmt, und `false` wenn dies nicht der Fall ist.

#### Beispiele

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('print');

  return <span>{`@media (min-width:600px) entspricht: ${matches}`}</span>;
}
```