/* eslint-disable no-console, no-underscore-dangle */

import Benchmark from 'benchmark';
import fs from 'fs';
import path from 'path';
import React from 'react';
import styled, { ServerStyleSheet } from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import styledEmotion from 'react-emotion';
import { renderStylesToString } from 'emotion-server';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 'none',
    border: 0,
    margin: 0, // Remove the margin in Safari
    borderRadius: 0,
    padding: 0, // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    '-moz-appearance': 'none', // Reset
    '-webkit-appearance': 'none', // Reset
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
  },
})(NakedButton);

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
  // Remove grey highlight
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: 'transparent', // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 'none',
  border: 0,
  margin: 0, // Remove the margin in Safari
  borderRadius: 0,
  padding: 0, // Remove the padding in Firefox
  cursor: 'pointer',
  userSelect: 'none',
  verticalAlign: 'middle',
  '-moz-appearance': 'none', // Reset
  '-webkit-appearance': 'none', // Reset
  textDecoration: 'none',
  // So we take precedent over the style of a native <a /> element.
  color: 'inherit',
});

const sheetsCache = new Map();

suite
  .add('Markdown', () => {
    ReactDOMServer.renderToString(<Markdown>{markdown}</Markdown>);
  })
  .add('StyledButton', () => {
    const sheet = new ServerStyleSheet();
    ReactDOMServer.renderToString(sheet.collectStyles(<StyledButton>Material-UI</StyledButton>));
  })
  .add('EmotionButton', () => {
    renderStylesToString(ReactDOMServer.renderToString(<EmotionButton>Material-UI</EmotionButton>));
  })
  .add('JssButton cache requests', () => {
    ReactDOMServer.renderToString(
      <MuiThemeProvider theme={theme} sheetsManager={new Map()} sheetsCache={sheetsCache}>
        <JssButton>Material-UI</JssButton>
      </MuiThemeProvider>,
    );
  })
  .add('JssButton cache instances', () => {
    ReactDOMServer.renderToString(
      <MuiThemeProvider theme={theme}>
        <JssButton>Material-UI</JssButton>
      </MuiThemeProvider>,
    );
  })
  .add('JssButton no cache', () => {
    ReactDOMServer.renderToString(
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <JssButton>Material-UI</JssButton>
      </MuiThemeProvider>,
    );
  })
  .add('JssButton no styles', () => {
    ReactDOMServer.renderToString(
      <MuiThemeProvider theme={theme} sheetsManager={new Map()} disableStylesGeneration>
        <JssButton>Material-UI</JssButton>
      </MuiThemeProvider>,
    );
  })
  .add('ButtonBase cache instances', () => {
    ReactDOMServer.renderToString(
      <MuiThemeProvider theme={theme}>
        <ButtonBase>Material-UI</ButtonBase>
      </MuiThemeProvider>,
    );
  })
  .add('ButtonBase cache requests', () => {
    ReactDOMServer.renderToString(
      <MuiThemeProvider theme={theme} sheetsManager={new Map()} sheetsCache={sheetsCache}>
        <ButtonBase>Material-UI</ButtonBase>
      </MuiThemeProvider>,
    );
  })
  .add('ButtonBase no cache', () => {
    ReactDOMServer.renderToString(
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <ButtonBase>Material-UI</ButtonBase>
      </MuiThemeProvider>,
    );
  })
  .add('HocButton', () => {
    ReactDOMServer.renderToString(
      <MuiThemeProvider theme={theme}>
        <HocButton />
      </MuiThemeProvider>,
    );
  })
  .add('NakedButton', () => {
    ReactDOMServer.renderToString(
      <MuiThemeProvider theme={theme}>
        <NakedButton />
      </MuiThemeProvider>,
    );
  })
  .add('ButtonBase cache', () => {
    ReactDOMServer.renderToString(
      <MuiThemeProvider theme={theme}>
        <ButtonBase>Material-UI</ButtonBase>
      </MuiThemeProvider>,
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
