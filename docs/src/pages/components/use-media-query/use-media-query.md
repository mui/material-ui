---
title: Media queries in React for responsive design
---

# useMediaQuery

<p class="description">This is a CSS media query hook for React. It listens for matches to a CSS media query. It allows the rendering of components based on whether the query matches or not.</p>

Some of the key features:

- ⚛️ It has an idiomatic React API.
- 🚀 It's performant, it observes the document to detect when its media queries change, instead of polling the values periodically.
- 📦 [1 kB gzipped](/size-snapshot).
- 🤖 It supports server-side rendering.

## Simple media query

You should provide a media query to the first argument of the hook.
The media query string can by any valid CSS media query, e.g. `'print'`.

{{"demo": "pages/components/use-media-query/SimpleMediaQuery.js", "defaultCodeOpen": true}}

## Using Material-UI's breakpoint helpers

You can use Material-UI's [breakpoint helpers](/customization/breakpoints/) as follows:

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

An implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) is required on the server.
Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate it is recommended.

{{"demo": "pages/components/use-media-query/ServerSide.js"}}

⚠️ Server-side rendering and client-side media queries are fundamentally at odds.
Be aware of the tradeoff. The support can only be partial.

Try relying on client-side CSS media queries first.
For instance, you could use:

- [`<Box display>`](/system/display/#hiding-elements)
- [`<Hidden implementation="css">`](/components/hidden/#css)
- or [`themes.breakpoints.up(x)`](/customization/breakpoints/#css-media-queries)

## Testing

Similar to the server-side case, you need an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) in your test environment.

For instance, [jsdom doesn't support it yet](https://github.com/jsdom/jsdom/blob/master/test/web-platform-tests/to-upstream/html/browsers/the-window-object/window-properties-dont-upstream.html). You should polyfill it.
Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate it is recommended.

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

The `withWidth()` higher-order component injects the screen width of the page.
You can reproduce the same behavior with a `useWidth` hook:

{{"demo": "pages/components/use-media-query/UseWidth.js"}}

## API

### `useMediaQuery(query, [options]) => matches`

#### Arguments

1. `query` (*String* | *Function*): A string representing the media query to handle or a callback function accepting the theme (in the context) that returns a string.
2. `options` (*Object* [optional]):
  - `options.defaultMatches` (*Boolean* [optional]):
  As `window.matchMedia()` is unavailable on the server,
  we return a default matches during the first mount. The default value is `false`.
  - `options.noSsr` (*Boolean* [optional]): Defaults to `false`.
  In order to perform the server-side rendering reconciliation, it needs to render twice.
  A first time with nothing and a second time with the children.
  This double pass rendering cycle comes with a drawback. It's slower.
  You can set this flag to `true` if you are **not doing server-side rendering**.
  - `options.ssrMatchMedia` (*Function* [optional]) You might want to use an heuristic to approximate
  the screen of the client browser.
  For instance, you could be using the user-agent or the client-hint https://caniuse.com/#search=client%20hint.
  You can provide a global ponyfill using [`custom props`](/customization/globals/#default-props) on the theme. Check the [server-side rendering example](#server-side-rendering).

#### Returns

`matches`: Matches is `true` if the document currently matches the media query and `false` when it does not.

#### Examples

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('print');

  return <span>{`@media (min-width:600px) matches: ${matches}`}</span>;
}
```
