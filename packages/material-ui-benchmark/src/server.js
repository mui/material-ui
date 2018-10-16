/* eslint-disable no-console */

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Pricing from 'docs/src/pages/page-layout-examples/pricing/Pricing';

function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Material-UI</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <style id="jss-server-side">${css}</style>
      </body>
    </html>
  `;
}

const sheetsCache = new Map();

const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
});

function handleRender(req, res) {
  const sheetsRegistry = new SheetsRegistry();
  const generateClassName = createGenerateClassName();
  const html = ReactDOMServer.renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()} sheetsCache={sheetsCache}>
        <Pricing />
      </MuiThemeProvider>
    </JssProvider>,
  );
  const css = sheetsRegistry.toString();
  res.send(renderFullPage(html, css));
}

const app = express();
app.use(handleRender);

const port = 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
