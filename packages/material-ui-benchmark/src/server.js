/* eslint-disable no-console */

import './bootstrap';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SheetsRegistry } from 'jss';
import { createMuiTheme } from '@material-ui/core/styles';
import { StylesProvider, ThemeProvider, createGenerateClassName } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Pricing from 'docs/src/pages/getting-started/page-layout-examples/pricing/Pricing';
import { spacing, palette } from '@material-ui/system';
import Avatar from '@material-ui/core/Avatar';
import { styleFunction, unstable_Box as Box } from '@material-ui/core/Box/Box';
import styledComponents, { ServerStyleSheet } from 'styled-components';
import styledEmotion from '@emotion/styled';
import UIBox, { extractStyles } from 'ui-box';
import { Provider as StyletronProvider, styled } from 'styletron-react';
import { Server as Styletron } from 'styletron-engine-atomic';

const StyledBox = styledComponents('div')`${styleFunction}`;
const EmotionBox = styledEmotion('div')`${styleFunction}`;
const StyletronBox = styled('div', styleFunction);

function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Material-UI</title>
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
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
  const html = ReactDOMServer.renderToString(
    <StylesProvider
      sheetsRegistry={sheetsRegistry}
      generateClassName={createGenerateClassName()}
      sheetsManager={new Map()}
      sheetsCache={sheetsCache}
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
        <div>
          {Array.from(new Array(1000)).map((_, index) => (
            <Box key={String(index)} m={1} />
          ))}
        </div>
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
      <ThemeProvider theme={theme}>
        <div>
          {Array.from(new Array(1000)).map((_, index) => (
            <Avatar key={String(index)} m={1} />
          ))}
        </div>
      </ThemeProvider>
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

function renderUIBox(req, res) {
  const html = ReactDOMServer.renderToString(
    <div>
      {Array.from(new Array(1000)).map((_, index) => (
        <UIBox key={String(index)} margin={`${index}px`} />
      ))}
    </div>,
  );

  const { styles } = extractStyles();
  res.send(renderFullPage(html, styles));
}

const engine = new Styletron();

function renderStyletronBox(req, res) {
  const html = ReactDOMServer.renderToString(
    <StyletronProvider value={engine}>
      <div>
        {Array.from(new Array(1000)).map((_, index) => (
          <StyletronBox theme={{}} key={String(index)} p={1} />
        ))}
      </div>
    </StyletronProvider>,
  );

  const styles = engine.getStylesheetsHtml();

  res.send(renderFullPage(html, styles));
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
app.get('/box', renderBox);
app.get('/styled-box', renderStyledBox);
app.get('/emotion-box', renderEmotionBox);
app.get('/ui-box', renderUIBox);
app.get('/styletron-box', renderStyletronBox);

const port = 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
