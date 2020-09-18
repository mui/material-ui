# サーバーサイドレンダリング

<p class="description">サーバーサイドレンダリングの最も一般的な使用例は、ユーザー（または検索エンジンのクローラー）が最初にアプリを要求した際に、最初に提示される画面を描画するのに使われます。</p>

サーバはリクエストを受け付けると、必要なコンポーネントをHTMLフォーマットの文字列として書き出し、クライアント側に送り返します。 そして、初回リクエスト以降のレンダリングはクライアント側で行います。

## Material-UIをサーバ上で使用する

Material-UIは、サーバーでのレンダリングの制約を考慮してゼロから設計されましたが、正しく統合されるかどうかはユーザー次第です。 サーバサイドレンダリングでは必要とされるCSSが正しく渡される必要があります。HTML要素だけを返しクライアントサイドでCSSが挿入されるのを待つようにコード書かれた場合、CSSが適用される前後でチラつき（俗にいうFOUC）が発生する場合があります。 クライアントにスタイルを注入するには、次のことが必要です。

1. 新しい[`ServerStyleSheets`](/styles/api/#serverstylesheets) のインスタンスを毎リクエストごとに作成する。
2. Server-side collectorを使用しReactのコンポーネントツリーを描画する。
3. コンポーネントツリーで必要となるCSSを読み込む
4. CSSをツリーと一緒にクライアント側へ渡す。

クライアントサイドでは上記のサーバサイドで書かれたCSSが取り除かれるより前に、本来のCSSが挿入されます。

## 設定する

ここからは、サーバーサイドレンダリングをどう設定するかについて見ていきます。

### テーマ

サーバー側とクライアント側で共有されるテーマを作成します。

`theme.js`

```js
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
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
    background: {
      default: '#fff',
    },
  },
});

export default theme;
```

### サーバーサイド

サーバーサイドのコードは概ね次の様になります。 ここでは[Express](https://expressjs.com/en/guide/using-middleware.html) 使用し、[app.use](https://expressjs.com/en/api.html)を用いてサーバへの全てのリクエストを捌いていきます。 もしExpressや他のサーバーアプリケーションにあまり馴染みがない場合、サーバーへのリクエストごとにhandleRender関数が呼ばれるということだけを覚えておいてください。

`server.js`

```js
import express from 'express';

// この箇所は後のセクションで埋めていきます。
function renderFullPage(html, css) {
  /* ... */
}

function handleRender(req, res) {
  /* ... */
}

const app = express();

// Isso é acionado toda vez que o servidor recebe uma solicitação.
*/
}

const app = express();

// Isso é acionado toda vez que o servidor recebe uma solicitação.
```

### リクエストハンドリング

リクエストをサーバで受け付けた後、まず最初に行わなくてはいけないのは新しい`ServerStyleSheets`インスタンスの作成です。

画面を描画する際に、ルートコンポーネントである`App`コンポーネントを [`StylesProvider`](/styles/api/#stylesprovider)と [`ThemeProvider`](/styles/api/#themeprovider)でラップします。 これによりスタイルの設定が行われ、コンポーネントツリー内に存在する全てのコンポーネントが`theme`インスタンスにアクセスできる様になります。

サーバーサイドレンダリングにおいて最も重要なステップは、最初に描画されるHTMLをクライアントに**渡す前**に描画しきることです。 これを実現するために [ReactDOMServer.renderToString()](https://reactjs.org/docs/react-dom-server.html)を使用します。

その後、対象のCSS を`sheets` インスタンスから`sheets.toString()`を用いて文字列として取得します。 ここで、先ほどの`renderFullPage`関数の中で、これらの値がどの様に受け渡されるを見ていきます。

```jsx
import express from 'express';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

function handleRender(req, res) {
  const sheets = new ServerStyleSheets();

  // Render the component to a string.
  import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

function handleRender(req, res) {
  const sheets = new ServerStyleSheets();

  // Render the component to a string.
  res.send(renderFullPage(html, css));
}

const app = express();

app.use('/build', express.static('build'));

// This is fired every time the server-side receives a request.
  const css = sheets.toString();

  // Send the rendered page back to the client.
*/
}

const app = express();

// Isso é acionado toda vez que o servidor recebe uma solicitação.
```

### コンポーネントHTML・CSSをテンプレートに挿入する

最後に、コンポーネントツリーから作成されたCSSとHTMLをクライアントサイドで描画するためのテンプレートに差し込みます。

```js
function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My page</title>
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}
```

### クライアントサイド

クライアント側は簡単です。 サーバーサイドで生成された CSS を削除するだけです。 クライアント側のコードを見てみましょう:

`client.js`

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

ReactDOM.hydrate(<Main />, document.querySelector('#root'));
```

## 参考実装

We host different reference implementations which you can find in the [GitHub repository](https://github.com/mui-org/material-ui) under the [`/examples`](https://github.com/mui-org/material-ui/tree/master/examples) folder:

- [このチュートリアルの実装サンプル](https://github.com/mui-org/material-ui/tree/next/examples/ssr)
- [Gatsby](https://github.com/mui-org/material-ui/tree/next/examples/gatsby)
- https://github.com/mui-org/material-ui/tree/master/examples/nextjs

## トラブルシューティング

FAQに投稿された [My App doesn't render correctly on the server](/getting-started/faq/#my-app-doesnt-render-correctly-on-the-server)を参照してみてください。
