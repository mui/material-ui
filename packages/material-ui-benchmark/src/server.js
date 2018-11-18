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
import Pricing from 'docs/src/pages/getting-started/page-layout-examples/pricing/Pricing';
import createBox from '@material-ui/styles/createBox';
import { spacing, palette } from '@material-ui/system';

const BoxMUI = createBox(spacing);

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

function renderPricing(req, res) {
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

function renderBox(req, res) {
  const sheetsRegistry = new SheetsRegistry();
  const generateClassName = createGenerateClassName();
  const html = ReactDOMServer.renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()} sheetsCache={sheetsCache}>
        <div>
          {Array.from(new Array(1000)).map((_, index) => (
            <BoxMUI key={String(index)} m={[1, 2, 3]}>
              Material-UI
            </BoxMUI>
          ))}
        </div>
      </MuiThemeProvider>
    </JssProvider>,
  );
  const css = sheetsRegistry.toString();
  res.send(renderFullPage(html, css));
}

function renderSpacing(req, res) {
  for (let i = 0; i < 10000; i += 1) {
    spacing({
      theme: {},
      p: [1, 2, 3],
    });
  }

  res.send(renderFullPage('hello', ''));
}

function renderPalette(req, res) {
  for (let i = 0; i < 10000; i += 1) {
    palette({
      theme: {},
      bg: ['blue', 'red'],
    });
  }

  res.send(renderFullPage('hello', ''));
}

const app = express();
app.get('/', renderPricing);
app.get('/box', renderBox);
app.get('/spacing', renderSpacing);
app.get('/palette', renderPalette);

const port = 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
