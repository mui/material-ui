/* eslint-disable no-console */

import Benchmark from 'benchmark';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SheetsRegistry } from 'react-jss';
import { makeStyles, StylesProvider, styled } from '@material-ui/styles';
import Box, { styleFunction } from '@material-ui/core/Box';

const suite = new Benchmark.Suite('box', {
  onError: event => {
    console.log(event.target.error);
  },
});
Benchmark.options.minSamples = 100;

const cssObject = {
  root: {
    padding: 2,
    margin: 2,
  },
};

const useStyles = makeStyles(cssObject);
function HookBox(props) {
  const classes = useStyles();
  return <div className={classes.root} {...props} />;
}

const NoCacheBox = styled('div')(styleFunction, { name: 'MuiBox', _useStylesCache: null });

suite
  .add('Box', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsRegistry={sheetsRegistry}>
        {Array.from(new Array(100)).map((_, index) => (
          <Box key={String(index)} padding={2} margin={2}>
            Material-UI
          </Box>
        ))}
      </StylesProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('Box with disable props cache', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsRegistry={sheetsRegistry}>
        {Array.from(new Array(100)).map((_, index) => (
          <NoCacheBox key={String(index)} padding={2} margin={2}>
            Material-UI
          </NoCacheBox>
        ))}
      </StylesProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('useStyles', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsRegistry={sheetsRegistry}>
        {Array.from(new Array(100)).map((_, index) => (
          <HookBox key={String(index)}>Material-UI</HookBox>
        ))}
      </StylesProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('Inline style', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsRegistry={sheetsRegistry}>
        {Array.from(new Array(100)).map((_, index) => (
          <div key={String(index)} style={cssObject.root}>
            Material-UI
          </div>
        ))}
      </StylesProvider>,
    );
    sheetsRegistry.toString();
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .run();
