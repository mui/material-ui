/* eslint-disable no-console, no-underscore-dangle */

import './bootstrap';
import Benchmark from 'benchmark';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import styledComponents, { ServerStyleSheet } from 'styled-components';
import hash from '@emotion/hash';
import styledEmotion from '@emotion/styled';
import injectSheet, { JssProvider, SheetsRegistry } from 'react-jss';
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

const WithStylesButton = withStyles({
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
})(props => <button type="button" className={props.classes.root} {...props} />);

const JSSButton = injectSheet({
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
})(props => <button type="button" className={props.classes.root} {...props} />);

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
  },
  // system: () => ({
  //   color: 'blue',
  // }),
});

function HookButton(props) {
  const classes = useStyles();
  return <button type="button" className={classes.root} {...props} />;
}

const StyledComponentsButton = styledComponents.button`
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
// ${() => ({
//   color: 'blue',
// })}

const EmotionButton = styledEmotion('button')(
  {
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
  // () => ({
  //   color: 'blue',
  // }),
);

const rawJSS = () => ({
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
});

suite
  .add('JSSButton', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <JssProvider registry={sheetsRegistry}>
        <React.Fragment>
          {Array.from(new Array(5)).map((_, index) => (
            <JSSButton key={String(index)}>Material-UI</JSSButton>
          ))}
        </React.Fragment>
      </JssProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('Box', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsRegistry={sheetsRegistry}>
        {Array.from(new Array(5)).map((_, index) => (
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
      dynamicSheet.update({}).attach();
      sheetsRegistry.add(dynamicSheet);
    }

    ReactDOMServer.renderToString(
      <JssProvider registry={sheetsRegistry}>
        <React.Fragment>
          {Array.from(new Array(5)).map((_, index) => (
            <button key={String(index)} type="submit">
              Material-UI
            </button>
          ))}
        </React.Fragment>
      </JssProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('WithStylesButton', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsRegistry={sheetsRegistry}>
        {Array.from(new Array(5)).map((_, index) => (
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
        {Array.from(new Array(5)).map((_, index) => (
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
        <React.Fragment>
          {Array.from(new Array(5)).map((_, index) => (
            <StyledComponentsButton key={String(index)}>Material-UI</StyledComponentsButton>
          ))}
        </React.Fragment>,
      ),
    );
    sheet.getStyleTags();
  })
  .add('EmotionButton', () => {
    ReactDOMServer.renderToString(
      <StylesProvider>
        {Array.from(new Array(5)).map((_, index) => (
          <EmotionButton key={String(index)}>Material-UI</EmotionButton>
        ))}
      </StylesProvider>,
    );
  })
  .add('Naked', () => {
    const Raw = props => <button type="submit" {...props} />;
    ReactDOMServer.renderToString(
      <StylesProvider>
        <React.Fragment>
          {Array.from(new Array(5)).map((_, index) => (
            <Raw key={String(index)}>Material-UI</Raw>
          ))}
        </React.Fragment>
      </StylesProvider>,
    );
  })
  .add('hashing', () => {
    hash(JSON.stringify(rawJSS()));
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .run();
