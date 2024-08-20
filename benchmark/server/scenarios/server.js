/* eslint-disable no-console */
import express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { SheetsRegistry } from 'jss';
import { createTheme } from '@mui/material/styles';
import {
  styled as materialStyled,
  StylesProvider,
  ThemeProvider,
  createGenerateClassName,
} from '@mui/styles';
import { green, red } from '@mui/material/colors';
import { spacing, palette, unstable_styleFunctionSx as styleFunction } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const StyledFunction = materialStyled('div')({
  color: 'blue',
});

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

const theme = createTheme({
  palette: {
    primary: green,
    accent: red,
  },
});

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
          <Box key={String(index)} sx={{ m: 1 }} />
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
      sx: {
        color: 'primary.main',
        bgColor: 'background.paper',
        fontFamily: 'h6.fontFamily',
        fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
        p: [2, 3, 4],
        border: {
          sm: 1,
          md: 2,
        },
      },
    });
  }

  res.send(renderFullPage('hello', ''));
}

const app = express();
app.get('/spacing', renderSpacing);
app.get('/palette', renderPalette);
app.get('/system', renderSystem);
app.get('/avatar', renderAvatar);
app.get('/styled-function', renderStyledFunction);
app.get('/box', renderBox);

const port = 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
