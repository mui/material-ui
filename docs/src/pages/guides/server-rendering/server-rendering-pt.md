# Renderização no servidor

<p class="description">A situação de uso mais comum para a renderização do lado do servidor, é manipular a renderização inicial quando um usuário (ou rastreador de mecanismo de pesquisa) solicita sua aplicação.</p>

Quando o servidor recebe a solicitação, ele renderiza o(s) componente(s) requerido(s) em uma cadeia HTML e o envia como uma resposta ao cliente. A partir desse momento, o cliente assume as funções de renderização.

## Material-UI no servidor

O Material-UI foi projetado em base com garantias de renderização no servidor, mas cabe a você certificar-se de que ele será integrado corretamente. É importante fornecer a página com o CSS necessário, caso contrário a página irá renderizar somente o HTML até o CSS ser injetado pelo cliente, causando uma tremulação (FOUC). Para injetar o estilo no cliente, precisamos:

1. Criar uma nova instância do [`emotion cache`](https://emotion.sh/docs/@emotion/cache) em cada request.
2. Renderizar a árvore React com o coletor do lado do servidor.
3. Capturar o CSS.
4. Passar o CSS para o cliente.

No cliente, o css será injetado uma segunda vez antes de remover o css injetado no servidor.

## Configurando

No passo a passo a seguir, vamos ver como configurar a renderização do lado do servidor.

### O tema

Crie um tema que será compartilhado entre o cliente e o servidor:

`theme.js`

```js
import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Cria a instância do tema.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
```

### O lado do servidor

A seguir um esboço para o aspecto do que o servidor deve lidar. Nós iremos configurar um [Express middleware](https://expressjs.com/en/guide/using-middleware.html) usando [app.use](https://expressjs.com/en/api.html) para manipular todas requests que chegarem no servidor. Se você não estiver familiarizado com o Express ou Middlewares, saiba que a função `handleRender` será executada cada vez que o servidor receber uma request.

`server.js`

```js
import express from 'express';

// Vamos preenchê-las nas seções a seguir.
function renderFullPage(html, css) {
  /* ... */
}

function handleRender(req, res) {
  /* ... */
}

const app = express();

// Isso é acionado toda vez que o servidor recebe uma solicitação.
app.use(handleRender);

const port = 3000;
app.listen(port);
```

### Manipulando as requests

A primeira coisa que nós precisamos fazer em cada request é criar um novo `emotion cache`.

Na renderização, vamos envolver o `App`, no componente raiz, dentro de um [`CacheProvider`](https://emotion.sh/docs/cache-provider) e [`ThemeProvider`](/styles/api/#themeprovider) para disponibilizar as configurações de estilo para todos componentes.

O passo chave na renderização do servidor é renderizar o HTML inicial do componentes **antes** de enviar para o lado do cliente. Para fazer isso, usamos [ReactDOMServer.renderToString()](https://reactjs.org/docs/react-dom-server.html).

O Material-UI está usando o [`Emotion`](https://emotion.sh) como engine de estilos padrão. Portanto, precisamos extrair os estilos da instância do emotion. Para isso, precisaremos compartilhar a mesma configuração de cache entre cliente e servidor.

`getCache.js`

```js
import createCache from '@emotion/cache';

export default function getCache() {
  const cache = createCache({ key: 'css' });
  cache.compat = true;
  return cache;
}
```

Com isso, nós vamos criar uma nova instância do emotion cache e usá-la para extrair os estilos críticos para o html também.

Vamos ver como isso é passado na função `renderFullPage`.

```jsx
import express from 'express';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import createEmotionServer from '@emotion/server/create-instance';
import App from './App';
import theme from './theme';
import getCache from './getCache';

function handleRender(req, res) {
  const cache = getCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>,
  );

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, emotionCss));
}

const app = express();

app.use('/build', express.static('build'));

// This is fired every time the server-side receives a request.
app.use(handleRender);

const port = 3000;
app.listen(port);
```

### Injetando HTML e CSS do componente inicial

O passo final no lado do servidor é injetar o HTML e CSS do componentes inicial em um template para ser renderizado no lado do cliente.

```js
function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My page</title>
        ${css}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}
```

### O lado do cliente

O lado do cliente é mais direto. Tudo que nós faremos é usar a mesma configuração de cache do lado do servidor. Vamos dar uma olhada no arquivo do cliente:

`client.js`

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import App from './App';
import theme from './theme';
import getCache from './getCache';

function Main() {
  return (
    <CacheProvider value={getCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.hydrate(<Main />, document.querySelector('#root'));
```

## Implementações de referência

Nós hospedamos diferentes referências de implementação que você pode encontrar em nosso [Repositório GitHub](https://github.com/mui-org/material-ui) dentro da pasta [`/examples`](https://github.com/mui-org/material-ui/tree/HEAD/examples):

- [A implementação de referência deste tutorial](https://github.com/mui-org/material-ui/tree/HEAD/examples/ssr)
- [Gatsby](https://github.com/mui-org/material-ui/tree/HEAD/examples/gatsby)
- [Next.js](https://github.com/mui-org/material-ui/tree/HEAD/examples/nextjs) ([TypeScript version](https://github.com/mui-org/material-ui/tree/HEAD/examples/nextjs-with-typescript))

## Resolução de problemas

Confira a resposta no FAQ: [Minha aplicação não é renderizada corretamente no servidor](/getting-started/faq/#my-app-doesnt-render-correctly-on-the-server).