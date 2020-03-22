/* eslint-disable no-console */
import Benchmark from 'benchmark';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StylesProvider } from '@material-ui/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

const suite = new Benchmark.Suite('core', {
  onError: (event) => {
    console.log(event.target.error);
  },
});
Benchmark.options.minSamples = 100;

function NakedButton(props) {
  return <button type="button" {...props} />;
}

function HocButton(props) {
  return <NakedButton {...props} />;
}

suite
  .add('ButtonBase', () => {
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()}>
        <ButtonBase>Material-UI</ButtonBase>
      </StylesProvider>,
    );
  })
  .add('HocButton', () => {
    ReactDOMServer.renderToString(
      <StylesProvider>
        <HocButton />
      </StylesProvider>,
    );
  })
  .add('NakedButton', () => {
    ReactDOMServer.renderToString(
      <StylesProvider>
        <NakedButton />
      </StylesProvider>,
    );
  })
  .add('ButtonBase enable ripple', () => {
    ReactDOMServer.renderToString(<ButtonBase>Material-UI</ButtonBase>);
  })
  .add('ButtonBase disable ripple', () => {
    ReactDOMServer.renderToString(<ButtonBase disableRipple>Material-UI</ButtonBase>);
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run();
