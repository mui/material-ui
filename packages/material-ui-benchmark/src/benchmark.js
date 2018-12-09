/* eslint-disable no-console, no-underscore-dangle */

import Benchmark from 'benchmark';
import fs from 'fs';
import path from 'path';
import React from 'react';
import styled, { ServerStyleSheet } from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import styledEmotion from 'react-emotion';
import { renderStylesToString } from 'emotion-server';
import { withStyles, makeStyles, ThemeProvider, StylesProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Markdown from 'docs/src/pages/getting-started/page-layout-examples/blog/Markdown';

const markdown = fs.readFileSync(
  path.join(
    __dirname,
    '../../../docs/src/pages/getting-started/page-layout-examples/blog/blog-post.1.md',
  ),
  'UTF-8',
);

const theme = createMuiTheme();

const suite = new Benchmark.Suite('ssr', {
  onError: event => {
    console.log(event.target.error);
  },
});

Benchmark.options.minSamples = 100;

global.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function NakedButton(props) {
  return <button type="button" {...props} />;
}

const JssButton = withStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    outline: 'none',
    border: 0,
    margin: 0,
    borderRadius: 0,
    padding: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    '-moz-appearance': 'none',
    '-webkit-appearance': 'none',
    textDecoration: 'none',
    color: 'inherit',
  },
})(NakedButton);

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    outline: 'none',
    border: 0,
    margin: 0,
    borderRadius: 0,
    padding: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    '-moz-appearance': 'none',
    '-webkit-appearance': 'none',
    textDecoration: 'none',
    color: 'inherit',
  },
});

function HookButton(props) {
  const classes = useStyles();
  return <button type="button" className={classes.root} {...props} />;
}

class HocButton extends React.Component {
  state = {};

  render() {
    return <NakedButton {...this.props} />;
  }
}

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: transparent;
  outline: none;
  border: 0;
  margin: 0;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  -moz-appearance: none;
  -webkit-appearance: none;
  text-decoration: none;
`;

const EmotionButton = styledEmotion('button')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: 'transparent',
  outline: 'none',
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: 'pointer',
  userSelect: 'none',
  verticalAlign: 'middle',
  '-moz-appearance': 'none',
  '-webkit-appearance': 'none',
  textDecoration: 'none',
  color: 'inherit',
});

const sheetsCache = new Map();

suite
  .add('JssButton cache requests', () => {
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsCache={sheetsCache}>
        <ThemeProvider theme={theme}>
          <JssButton>Material-UI</JssButton>
        </ThemeProvider>
      </StylesProvider>,
    );
  })
  .add('JssButton cache instances', () => {
    ReactDOMServer.renderToString(
      <StylesProvider>
        <ThemeProvider theme={theme}>
          <JssButton>Material-UI</JssButton>
        </ThemeProvider>
      </StylesProvider>,
    );
  })
  .add('JssButton no cache', () => {
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()}>
        <ThemeProvider theme={theme}>
          <JssButton>Material-UI</JssButton>
        </ThemeProvider>
      </StylesProvider>,
    );
  })
  .add('HookButton no cache', () => {
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()}>
        <ThemeProvider theme={theme}>
          <HookButton>Material-UI</HookButton>
        </ThemeProvider>
      </StylesProvider>,
    );
  })
  .add('JssButton no styles', () => {
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} disableGeneration>
        <ThemeProvider theme={theme}>
          <JssButton>Material-UI</JssButton>
        </ThemeProvider>
      </StylesProvider>,
    );
  })
  .add('StyledButton', () => {
    const sheet = new ServerStyleSheet();
    ReactDOMServer.renderToString(sheet.collectStyles(<StyledButton>Material-UI</StyledButton>));
  })
  .add('EmotionButton', () => {
    renderStylesToString(ReactDOMServer.renderToString(<EmotionButton>Material-UI</EmotionButton>));
  })
  .add('Markdown', () => {
    ReactDOMServer.renderToString(<Markdown>{markdown}</Markdown>);
  })
  .add('ButtonBase cache instances', () => {
    ReactDOMServer.renderToString(
      <ThemeProvider theme={theme}>
        <ButtonBase>Material-UI</ButtonBase>
      </ThemeProvider>,
    );
  })
  .add('ButtonBase cache requests', () => {
    ReactDOMServer.renderToString(
      <ThemeProvider theme={theme} sheetsManager={new Map()} sheetsCache={sheetsCache}>
        <ButtonBase>Material-UI</ButtonBase>
      </ThemeProvider>,
    );
  })
  .add('ButtonBase no cache', () => {
    ReactDOMServer.renderToString(
      <ThemeProvider theme={theme} sheetsManager={new Map()}>
        <ButtonBase>Material-UI</ButtonBase>
      </ThemeProvider>,
    );
  })
  .add('HocButton', () => {
    ReactDOMServer.renderToString(
      <ThemeProvider theme={theme}>
        <HocButton />
      </ThemeProvider>,
    );
  })
  .add('NakedButton', () => {
    ReactDOMServer.renderToString(
      <ThemeProvider theme={theme}>
        <NakedButton />
      </ThemeProvider>,
    );
  })
  .add('ButtonBase cache', () => {
    ReactDOMServer.renderToString(
      <ThemeProvider theme={theme}>
        <ButtonBase>Material-UI</ButtonBase>
      </ThemeProvider>,
    );
  })
  .add('ButtonBase ripple', () => {
    ReactDOMServer.renderToString(<ButtonBase>Material-UI</ButtonBase>);
  })
  .add('ButtonBase disableRipple', () => {
    ReactDOMServer.renderToString(<ButtonBase disableRipple>Material-UI</ButtonBase>);
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .run();
