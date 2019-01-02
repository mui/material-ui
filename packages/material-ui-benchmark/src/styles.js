/* eslint-disable no-console, no-underscore-dangle */

import './bootstrap';
import Benchmark from 'benchmark';
import React, { Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import styledComponents, { ServerStyleSheet } from 'styled-components';
import styledEmotion from '@emotion/styled';
import { css } from '@emotion/core';
import { renderStylesToString } from 'emotion-server';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { withStyles, makeStyles, StylesProvider } from '@material-ui/styles';
import jss, { getDynamicStyles } from 'jss';
import { unstable_Box as Box } from '@material-ui/core/Box/Box';

const suite = new Benchmark.Suite('styles', {
  onError: event => {
    console.log(event.target.error);
  },
});
Benchmark.options.minSamples = 100;

global.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const cssContent = `
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
text-decoration: none`;

const cssObject = {
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
  },
  // system: () => ({
  //   color: 'blue',
  // }),
};

const emotionCss = css`${cssContent}`;

const WithStylesButton = withStyles(cssObject)(props =>
  <button type="submit" className={props.classes.root} {...props} />);

const EmotionButton = styledEmotion('button')`
  ${cssContent}
`;

const StyledComponentsButton = styledComponents.button`
      ${cssContent}
    `;

const useStyles = makeStyles(cssObject);

function HookButton(props) {
  const classes = useStyles();
  return <button type="button" className={classes.root} {...props} />;
}


const rawJSS = () => cssObject;

suite
  .add('Box', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsRegistry={sheetsRegistry}>
        {Array.from(new Array(5))
          .map((_, index) => (
            <Box key={String(index)} p={2}>
              Material-UI
            </Box>
          ))}
      </StylesProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('JSS naked', () => {
    const sheetsRegistry = new SheetsRegistry();

    const staticStyles = rawJSS();
    const dynamicStyles = getDynamicStyles(staticStyles);

    const staticSheet = jss.createStyleSheet(staticStyles);
    staticSheet.attach({
      link: false,
    });
    sheetsRegistry.add(staticSheet);

    if (dynamicStyles) {
      const dynamicSheet = jss.createStyleSheet(dynamicStyles, {
        link: true,
      });
      dynamicSheet.update({})
        .attach();
      sheetsRegistry.add(dynamicSheet);
    }

    ReactDOMServer.renderToString(
      <JssProvider registry={sheetsRegistry}>
        <Fragment>
          {Array.from(new Array(5))
            .map((_, index) => (
              <button key={String(index)} type="submit">
                Material-UI
              </button>
            ))}
        </Fragment>
      </JssProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('WithStylesButton', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsRegistry={sheetsRegistry}>
        {Array.from(new Array(5))
          .map((_, index) => (
            <WithStylesButton key={String(index)}>Material-UI</WithStylesButton>
          ))}
      </StylesProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('HookButton', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsRegistry={sheetsRegistry}>
        {Array.from(new Array(5))
          .map((_, index) => (
            <HookButton key={String(index)}>Material-UI</HookButton>
          ))}
      </StylesProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('StyledComponentsButton', () => {
    const sheet = new ServerStyleSheet();
    ReactDOMServer.renderToString(
      sheet.collectStyles(
        <Fragment>
          {Array.from(new Array(5))
            .map((_, index) => (
              <StyledComponentsButton key={String(index)}>Material-UI</StyledComponentsButton>
            ))}
        </Fragment>,
      ),
    );
    sheet.getStyleTags();
  })
  .add('EmotionButton', () => {
    ReactDOMServer.renderToString(
      <StylesProvider>
        {Array.from(new Array(5))
        .map((_, index) => (
          <EmotionButton key={String(index)}>Material-UI</EmotionButton>
        ))}
      </StylesProvider>,
    );
  })
  .add('EmotionCssButton', () => {
    ReactDOMServer.renderToString(
      <StylesProvider>
        {Array.from(new Array(5))
          .map((_, index) => (
            <button type="submit" css={emotionCss} key={String(index)}>Material-UI</button>
          ))}
      </StylesProvider>,
    );
  })
  .add('EmotionServerCssButton', () => {
    renderStylesToString(ReactDOMServer.renderToString(
      <StylesProvider>
        {Array.from(new Array(5))
          .map((_, index) => (
            <button type="submit" css={emotionCss} key={String(index)}>Material-UI</button>
          ))}
      </StylesProvider>,
    ));
  })
  .add('Naked', () => {
    ReactDOMServer.renderToString(
      <StylesProvider>
        {Array.from(new Array(5))
          .map((_, index) => (
            <button type="submit" key={String(index)}>Material-UI</button>
          ))}
      </StylesProvider>,
    );
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest')
      .map('name')}`);
  })
  .run({ async: true });
