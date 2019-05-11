---
title: Medienanfragen in React für Responsive Design
---

# useMediaQuery

<p class="description">Dies ist ein CSS-Media-Abfrage-Hook für React. Es wartet auf Übereinstimmungen mit einer CSS-Medienabfrage. Es ermöglicht das Rendern von Komponenten basierend darauf, ob die Abfrage übereinstimmt oder nicht.</p>

Einige der wichtigsten Funktionen:

- ⚛️ Es verfügt über eine idiomatische React-API.
- 🚀 Es ist performant. Es observiert das Dokument, welches erkennt, wenn sich die Medienabfragen ändern, anstatt die Werte regelmäßig abzufragen.
- 📦 [ kB](/size-snapshot) gzipped.
- 💄 Es ist eine Alternative zu react-responsive und react-media, die auf Einfachheit abzielen.
- 🤖 Es unterstützt serverseitiges Rendering.

## Einfache Medienabfrage

Sie sollten eine Medienabfrage für das erste Argument des Hooks bereitstellen. Die Medienabfragezeichenfolge kann durch jede gültige CSS-Medienabfrage erfolgen, z.B. `'print'`.

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) entspricht: ${matches}`}</span>;
}
```

{{"demo": "pages/components/use-media-query/SimpleMediaQuery.js"}}

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

## Server-Rendering

Auf dem Server ist eine Implementierung von [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) erforderlich. Wir empfehlen die Verwendung von [css-mediaquery](https://github.com/ericf/css-mediaquery). Wir empfehlen außerdem die Verwendung der `useMediaQueryTheme` Version des Hooks, die Eigenschaften aus dem Design abruft. Auf diese Weise können Sie einmal eine `ssrMatchMedia` Option für Ihren gesamten React-Baum angeben.

{{"demo": "pages/components/use-media-query/ServerSide.js"}}

## Migration von `withWidth()`

Die Komponente höherer Ordnung `withWidth()` fügt die Bildschirmbreite der Seite ein. Sie können das gleiche Verhalten wie folgt reproduzieren:

```jsx
function MyComponent() {
  const theme = useTheme();
  const width =
    [...theme.breakpoints.keys].reverse().reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.only(key));

      return !output && matches ? key : output;
    }, null) || 'xs';

  return <span>{width}</span>;
}
```

{{"demo": "pages/components/use-media-query/UseWidth.js"}}

## API

### `useMediaQuery(query, [options]) => matches`

#### Argumente

1. `query` (*String*): Eine string Representation der Medienabfrage.
2. `Optionen` (*Object* [optional]): 
    - ` options.defaultMatches ` (*Boolean* [optional]): Da `window.matchMedia()` auf dem Server nicht verfügbar ist, wird ein Standard Match zurückgegeben. Der Standardwert ist `false`.
    - `options.noSsr ` (*Boolean* [optional]): Standardeinstellung ist `false`. Um den serverseitigen Renderingabgleich durchzuführen, muss er zweimal gerendert werden. Ein erstes Mal mit nichts und ein zweites Mal mit den Kind-Elementen. Dieser Zyklus mit zwei Durchgängen ist mit einem Nachteil verbunden. Es ist langsamer. Sie können diese Flag auf `true` setzten, wenn Sie **nicht serverseitig** rendern.
    - `options.ssrMatchMedia` (*Function* [optional]) Vielleicht möchten Sie eine Heuristik verwenden, um annähernd den Bildschirm des Client - Browser zu bestimmen. Sie könnten beispielsweise den Benutzeragenten oder den Client-Hinweis https://caniuse.com/#search=client%20hint verwenden. Sie können eine globale Ponyfill mit [`benutzerdefinierten Eigenschaften`](/customization/globals/#default-props) für das Theme bereitstellen. Lesen Sie hier mehr dazu: [serverseitige Rendering Beispiel](#server-side-rendering).

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