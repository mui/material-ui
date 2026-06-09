import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import App from './App.mjs';

export function renderPage() {
  const appHtml = ReactDOMServer.renderToString(React.createElement(App));

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <title>Material UI Node ESM SSR</title>
  </head>
  <body>
    <div id="root">${appHtml}</div>
  </body>
</html>`;
}
