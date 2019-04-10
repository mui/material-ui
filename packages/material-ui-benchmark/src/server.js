/* eslint-disable no-console */

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SheetsRegistry } from 'jss';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  styled as materialStyled,
  StylesProvider,
  ThemeProvider,
  createGenerateClassName,
} from '@material-ui/styles';
import { green, red } from '@material-ui/core/colors';
import Pricing from 'docs/src/pages/getting-started/page-layout-examples/pricing/Pricing';
import { spacing, palette } from '@material-ui/system';
import Avatar from '@material-ui/core/Avatar';
import Box, { styleFunction } from '@material-ui/core/Box';
import styledComponents, { ServerStyleSheet } from 'styled-components';
import styledEmotion from '@emotion/styled';

const StyledBox = styledComponents('div')`${styleFunction}`;
const EmotionBox = styledEmotion('div')`${styleFunction}`;

const StyledFunction = materialStyled('div')(() => ({
  color: 'blue',
}));

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

const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
  },
});

function renderPricing(req, res) {
  const sheetsRegistry = new SheetsRegistry();
  const html = ReactDOMServer.renderToString(
    <StylesProvider
      sheetsRegistry={sheetsRegistry}
      generateClassName={createGenerateClassName()}
      sheetsManager={new Map()}
    >
      <ThemeProvider theme={theme}>
        <Pricing />
      </ThemeProvider>
    </StylesProvider>,
  );
  const css = sheetsRegistry.toString();
  res.send(renderFullPage(html, css));
}

function renderBox(req, res) {
  const sheetsRegistry = new SheetsRegistry();
  const html = ReactDOMServer.renderToString(
    <StylesProvider
      sheetsRegistry={sheetsRegistry}
      generateClassName={createGenerateClassName()}
      sheetsManager={new Map()}
    >
      <ThemeProvider theme={theme}>
        {Array.from(new Array(1000)).map((_, index) => (
          <Box key={String(index)} m={1} />
        ))}
      </ThemeProvider>
    </StylesProvider>,
  );
  const css = sheetsRegistry.toString();
  res.send(renderFullPage(html, css));
}

function renderAvatar(req, res) {
  const sheetsRegistry = new SheetsRegistry();
  const html = ReactDOMServer.renderToString(
    <StylesProvider
      sheetsRegistry={sheetsRegistry}
      generateClassName={createGenerateClassName()}
      sheetsManager={new Map()}
    >
      {Array.from(new Array(1)).map((_, index) => (
        <Avatar key={String(index)}>Avatar</Avatar>
      ))}
    </StylesProvider>,
  );
  const css = sheetsRegistry.toString();
  res.send(renderFullPage(html, css));
}

function renderStyledFunction(req, res) {
  const sheetsRegistry = new SheetsRegistry();
  const html = ReactDOMServer.renderToString(
    <StylesProvider
      sheetsRegistry={sheetsRegistry}
      generateClassName={createGenerateClassName()}
      sheetsManager={new Map()}
    >
      {Array.from(new Array(1000)).map((_, index) => (
        <StyledFunction key={String(index)} />
      ))}
    </StylesProvider>,
  );
  const css = sheetsRegistry.toString();
  res.send(renderFullPage(html, css));
}

function renderStyledBox(req, res) {
  const sheet = new ServerStyleSheet();
  const html = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <div>
        {Array.from(new Array(1000)).map((_, index) => (
          <StyledBox key={String(index)} m={1} />
        ))}
      </div>,
    ),
  );

  const css = sheet.getStyleTags();
  res.send(renderFullPage(html, css));
}

function renderEmotionBox(req, res) {
  const html = ReactDOMServer.renderToString(
    <div>
      {Array.from(new Array(1000)).map((_, index) => (
        <EmotionBox key={String(index)} m={1} />
      ))}
    </div>,
  );

  res.send(renderFullPage(html, ''));
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
      bgColor: ['blue', 'red'],
    });
  }

  res.send(renderFullPage('hello', ''));
}

function renderSystem(req, res) {
  for (let i = 0; i < 10000; i += 1) {
    styleFunction({
      theme: {},
      color: 'primary.main',
      bgColor: 'background.paper',
      fontFamily: 'h6.fontFamily',
      fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
      p: [2, 3, 4],
      sm: {
        border: 1,
      },
      md: {
        border: 2,
      },
    });
  }

  res.send(renderFullPage('hello', ''));
}

const app = express();
app.get('/', renderPricing);
app.get('/spacing', renderSpacing);
app.get('/palette', renderPalette);
app.get('/system', renderSystem);
app.get('/avatar', renderAvatar);
app.get('/styled-function', renderStyledFunction);
app.get('/box', renderBox);
app.get('/styled-box', renderStyledBox);
app.get('/emotion-box', renderEmotionBox);

const port = 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
