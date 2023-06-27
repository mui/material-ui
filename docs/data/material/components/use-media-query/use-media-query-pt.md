---
product: material-ui
title: Consulta de mídia no React para design responsivo
githubLabel: 'hook: useMediaQuery'
---

# useMediaQuery

<p class="description">Este é um hook de consulta de mídia CSS para React. Ele ouve correspondências para uma consulta de mídia no CSS. Permite a renderização de componentes com base no fato de a consulta corresponder ou não.</p>

Algumas das principais características:

- ⚛️ Tem uma API React idiomática.
- 🚀 É performático, ele observa o documento para detectar quando suas consultas de mídia mudam, em vez de pesquisar os valores periodicamente.
- 📦 [1 kB gzipped](/size-snapshot/).
- 🤖 Suporta a renderização do lado do servidor.

[A paleta](/system/palette/) com funções de estilo.

## Consulta de mídia simples

Você deve fornecer uma consulta de mídia ao primeiro argumento do hook. The media query string can be any valid CSS media query, e.g. [`'(prefers-color-scheme: dark)'`](/material-ui/customization/dark-mode/#system-preference).

{{"demo": "SimpleMediaQuery.js", "defaultCodeOpen": true}}

⚠️ Você não pode usar `'print'` devido a limitação de navegadores, por exemplo, este bug presente no [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=774398).

## Usando auxiliares de ponto de quebra do Material-UI

You can use MUI's [breakpoint helpers](/material-ui/customization/breakpoints/) as follows:

```jsx
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

{{"demo": "ThemeHelper.js", "defaultCodeOpen": false}}

Como alternativa, você pode usar uma função de retorno, aceitando o tema como um primeiro argumento:

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

Você pode usar [json2mq](https://github.com/akiran/json2mq) para gerar uma string de consulta de mídia a partir de um objeto JavaScript.

## Usando a sintaxe JavaScript

Você pode usar [json2mq](https://github.com/akiran/json2mq) para gerar uma string de consulta de mídia a partir de um objeto JavaScript.

{{"demo": "JavaScriptMedia.js", "defaultCodeOpen": true}}

## Testando

Você precisa de uma implementação de [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) em seu ambiente de teste.

Por exemplo, [jsdom não suporta ainda](https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom). Você deve usar um polyfill para isso. É recomendável usar [css-mediaquery](https://github.com/ericf/css-mediaquery) para emular.

```js
import mediaQuery from 'css-mediaquery';

function createMatchMedia(width) {
  return (query) => ({
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

## Renderização somente do lado do cliente

Para executar a hidratação no lado do servidor, o hook precisa renderizar duas vezes. Uma primeira vez com `false`, o valor do servidor e uma segunda vez com o valor resolvido. Este ciclo de renderização de dupla passagem tem uma desvantagem. É mais lento. Você pode definir a opção `noSsr` para `true` se você estiver fazendo renderização **somente no lado cliente**.

```js
const matches = useMediaQuery('(min-width:600px)', { noSsr: true });
```

ou pode ativar globalmente com o tema:

```js
const theme = createTheme({
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
  },
});
```

## Renderização do lado servidor

:::warning
⚠️ Server-side rendering and client-side media queries are fundamentally at odds.
Be aware of the tradeoff. The support can only be partial.
:::

Try relying on client-side CSS media queries first. For instance, you could use:

- [`<Box display>`](/system/display/#hiding-elements)
- [`themes.breakpoints.up(x)`](/material-ui/customization/breakpoints/#css-media-queries)
- or [`sx prop`](/system/getting-started/the-sx-prop/)

If none of the above alternatives are an option, you can proceed reading this section of the documentation.

First, you need to guess the characteristics of the client request, from the server. You have the choice between using:

- **User agent**. Analise a string do user agent do cliente para extrair informações. É recomendável usar [ua-parser-js](https://github.com/faisalman/ua-parser-js) para analisar o user agent.
- **Client hints**. Leia as dicas que o cliente está enviando para o servidor. Esteja ciente de que esse recurso [não é suportado em qualquer lugar](https://caniuse.com/#search=client%20hint).

Finally, you need to provide an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to the `useMediaQuery` with the previously guessed characteristics. Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate matchMedia is recommended.

For instance on the server-side:

```js
import * as ReactDOMServer from 'react-dom/server';
import parser from 'ua-parser-js';
import mediaQuery from 'css-mediaquery';
import { ThemeProvider } from '@material-ui/core/styles';

function handleRender(req, res) {
  const deviceType = parser(req.headers['user-agent']).device.type || 'desktop';
  const ssrMatchMedia = query => ({
    matches: mediaQuery.match(query, {
      // O CSS estimado pelo navegador.
      width: deviceType === 'mobile' ? '0px' : '1024px',
    }),
  });

  const theme = createTheme({
    components: {
      // Modifica as opções padrão de useMediaQuery
      MuiUseMediaQuery: {
        defaultProps: {
          ssrMatchMedia,
        },
      },
    },
  });

  const html = ReactDOMServer.renderToString(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
  );

  // …
}
```

{{"demo": "ServerSide.js", "defaultCodeOpen": false}}

Make sure you provide the same custom match media implementation to the client-side to guarantee a hydration match.

## Migrando de `withWidth()`

The `withWidth()` higher-order component injects the screen width of the page. You can reproduce the same behavior with a `useWidth` hook:

{{"demo": "UseWidth.js"}}

## API

### `useMediaQuery(query, [options]) => matches`

#### Argumentos

1. `query` (_string_ | _func_): A string representing the media query to handle or a callback function accepting the theme (in the context) that returns a string.
2. `options` (_object_ [optional]):

- `options.defaultMatches` (_bool_ [optional]): As `window.matchMedia()` is unavailable on the server, we return a default matches during the first mount. O valor padrão é `false`.
- `options.matchMedia` (_func_ [optional]): You can provide your own implementation of _matchMedia_. Isso pode ser usado para manipular uma janela iframe com conteúdo.
- `options.noSsr` (_bool_ [opcional]): Padrão `false`. Para executar a hidratação no lado do servidor, o hook precisa renderizar duas vezes. Uma primeira vez com `false`, o valor do servidor e uma segunda vez com o valor resolvido. Este ciclo de renderização de dupla passagem tem uma desvantagem. É mais lento. Você pode definir esta opção para `true` se você estiver fazendo renderização **somente no lado cliente**.
- `options.ssrMatchMedia` (_func_ [optional]): You can provide your own implementation of _matchMedia_ in a [server-side rendering context](#server-side-rendering).

Note: You can change the default options using the [`default props`](/material-ui/customization/theme-components/#default-props) feature of the theme with the `MuiUseMediaQuery` key.

#### Retornos

`matches`: Matches is `true` if the document currently matches the media query and `false` when it does not.

#### Exemplos

```jsx
import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
```
