/* eslint-disable no-console */

import './bootstrap';
import Benchmark from 'benchmark';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StylesProvider } from '@material-ui/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Markdown from 'docs/src/pages/getting-started/page-layout-examples/blog/Markdown';

const suite = new Benchmark.Suite('core', {
  onError: event => {
    console.log(event.target.error);
  },
});
Benchmark.options.minSamples = 100;

const markdown = fs.readFileSync(
  path.join(
    __dirname,
    '../../../docs/src/pages/getting-started/page-layout-examples/blog/blog-post.1.md',
  ),
  'UTF-8',
);

function NakedButton(props) {
  return <button type="button" {...props} />;
}

class HocButton extends React.Component {
  state = {};

  render() {
    return <NakedButton {...this.props} />;
  }
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
  .add('Markdown', () => {
    ReactDOMServer.renderToString(<Markdown>{markdown}</Markdown>);
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .run();
