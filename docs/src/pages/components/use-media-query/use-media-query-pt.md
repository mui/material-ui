---
title: Consulta de mídia no React para design responsivo
---

# useMediaQuery

<p class="description">Este é um hook de CSS media query para React. Ele ouve correspondências para uma consulta de mídia no CSS. Permite a renderização de componentes com base no fato de a consulta corresponder ou não.</p>

Algumas das principais características:

- ⚛️ Tem uma API React idiomática.
- 🚀 Com desempenho, ele observa o documento para detectar quando suas consultas de mídia mudam, em vez de pesquisar os valores periodicamente.
- 📦 [1 kB gzipped](/size-snapshot).
- 🤖 Ele suporta a renderização do lado do servidor.

## Consulta de mídia simples

Você deve fornecer uma consulta de mídia ao primeiro argumento do hook. The media query string can be any valid CSS media query, e.g. [`'(prefers-color-scheme: dark)'`](/customization/palette/#user-preference).

{{"demo": "pages/components/use-media-query/SimpleMediaQuery.js", "defaultCodeOpen": true}}

⚠️ You can't use `'print'` per browsers limitation, e.g. [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=774398).

## Usando helpers de ponto de quebra do Material-UI

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

{{"demo": "pages/components/use-media-query/ThemeHelper.js", "defaultCodeOpen": false}}

Alternatively, you can use a callback function, accepting the theme as a first argument:

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

⚠️ There is **no default** theme support, you have to inject it in a parent theme provider.

## Usando a sintaxe JavaScript

You can use [json2mq](https://github.com/akiran/json2mq) to generate media query string from a JavaScript object.

{{"demo": "pages/components/use-media-query/JavaScriptMedia.js", "defaultCodeOpen": true}}

## Testando

You need an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) in your test environment.

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

describe('MeusTestes', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });
});
```

## Renderização no servidor (Server-Side Rendering)

> ⚠️ Renderização do lado servidor e consultas de mídia do lado cliente são fundamentalmente conflitantes. Esteja ciente da escolha. O suporte só pode ser parcial.

Try relying on client-side CSS media queries first. For instance, you could use:

- [`<Box display>`](/system/display/#hiding-elements)
- [`themes.breakpoints.up(x)`](/customization/breakpoints/#css-media-queries)
- ou [`<Hidden implementation="css">`](/components/hidden/#css)

If none of the above alternatives are an option, you can proceed reading this section of the documentation.

First, you need to guess the characteristics of the client request, from the server. You have the choice between using:

- **User agent**. Analise a string do user agent do cliente para extrair informações. É recomendável usar [ua-parser-js](https://github.com/faisalman/ua-parser-js) para analisar o user agent.
- **Client hints**. Leia as dicas que o cliente está enviando para o servidor. Esteja ciente de que esse recurso [não é suportado em qualquer lugar](https://caniuse.com/#search=client%20hint).

Finally, you need to provide an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to the `useMediaQuery` with the previously guessed characteristics. Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate matchMedia is recommended.

Por exemplo:

```js
import ReactDOMServer from 'react-dom/server';
import parser from 'ua-parser-js';
import mediaQuery from 'css-mediaquery';
import { ThemeProvider } from '@material-ui/core/styles';

function handleRender(req, res) {
  const deviceType = parser(req.headers['user-agent']).device.type || 'desktop';
  const ssrMatchMedia = query => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser.
      width: deviceType === 'mobile' ? '0px' : '1024px',
    }),
  });

  const html = ReactDOMServer.renderToString(
    <ThemeProvider
      theme={{
        props: {
          // Change the default options of useMediaQuery
          MuiUseMediaQuery: { ssrMatchMedia },
        },
      }}
    >
      <App />
    </ThemeProvider>,
  );

  // …
}
```

{{"demo": "pages/components/use-media-query/ServerSide.js"}}

## Migrando de `withWidth()`

The `withWidth()` higher-order component injects the screen width of the page. You can reproduce the same behavior with a `useWidth` hook:

{{"demo": "pages/components/use-media-query/UseWidth.js"}}

## API

### `useMediaQuery(query, [options]) => matches`

#### Argumentos

1. `query` (*String* | *Function*): Uma string representando a consulta de mídia a ser manipulada ou uma função de retorno de chamada aceitando o tema (no contexto) que retorna uma string.
2. `options` (*Object* [opcional]): 
  - `options.defaultMatches` (*Boolean* [opcional]): Como `window.matchMedia()` não esta disponível no servidor, retornamos uma correspondência padrão durante a primeira montagem. O valor padrão é `false`.
  - `options.noSsr` (*Boolean* [opcional]): Padrão é `false`. Para realizar a reconciliação de renderização do lado do servidor, ele precisa renderizar duas vezes. Uma primeira vez sem nada e uma segunda vez com os filhos. Este ciclo de renderização de dupla passagem tem uma desvantagem. É mais lento. Você pode definir esse sinalizador para `true` se você **não estiver fazendo a renderização do lado do servidor**.
  - `options.ssrMatchMedia` (*Function* [opcional]) Você pode fornecer sua própria implementação de *matchMedia*. Isso é especialmente útil para [suporte de renderização no lado do servidor](#server-side-rendering).

Note: You can change the default options using the [`default props`](/customization/globals/#default-props) feature of the theme with the `MuiUseMediaQuery` key.

#### Retornos

`matches`: Matches is `true` if the document currently matches the media query and `false` when it does not.

#### Exemplos

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
```