/* eslint-disable no-console, no-underscore-dangle */

import Benchmark from 'benchmark';
import React from 'react';
import styled from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import styled2 from 'react-emotion';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

const suite = new Benchmark.Suite({
  async: true,
  minSamples: 100,
  minTime: 5,
});

global.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function CustomButton() {
  return <button type="button">Material-UI</button>;
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
    '&::-moz-focus-inner': {
      borderStyle: 'none', // Remove Firefox dotted outline.
    },
    '&$disabled': {
      pointerEvents: 'none', // Disable link interactions
      cursor: 'default',
    },
  },
})(({ classes, ...other }) => <button type="button" {...other} />);

const StyledComponents = styled.button`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Emotion = styled2('button')`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

suite
  .add('ButtonBase', () => {
    ReactDOMServer.renderToString(<ButtonBase>Material-UI</ButtonBase>);
  })
  .add('Grid', () => {
    ReactDOMServer.renderToString(<Grid>Material-UI</Grid>);
  })
  .add('JssButton', () => {
    ReactDOMServer.renderToString(<JssButton>Material-UI</JssButton>);
  })
  .add('StyledComponents', () => {
    ReactDOMServer.renderToString(<StyledComponents>Material-UI</StyledComponents>);
  })
  .add('Emotion', () => {
    ReactDOMServer.renderToString(<Emotion>Material-UI</Emotion>);
  })
  .add('Button', () => {
    ReactDOMServer.renderToString(<Button>Material-UI</Button>);
  })
  .add('ButtonBase disableRipple', () => {
    ReactDOMServer.renderToString(<ButtonBase disableRipple>Material-UI</ButtonBase>);
  })
  .add('button', () => {
    ReactDOMServer.renderToString(<CustomButton />);
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .run();
