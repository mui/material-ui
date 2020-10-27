/* eslint-disable no-console */
import Benchmark from 'benchmark';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Markdown from 'docs/src/pages/getting-started/templates/blog/Markdown';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const suite = new Benchmark.Suite('core', {
  onError: (event) => {
    console.log(event.target.error);
  },
});
Benchmark.options.minSamples = 100;

const markdown = fs.readFileSync(
  path.join(__dirname, '../../../docs/src/pages/getting-started/templates/blog/blog-post.1.md'),
  'UTF-8',
);

const store = createStore((state) => state, {
  options: {
    userLanguage: 'en',
  },
});

suite
  .add('Markdown', () => {
    ReactDOMServer.renderToString(<Markdown>{markdown}</Markdown>);
  })
  .add('MarkdownElement', () => {
    ReactDOMServer.renderToString(
      <Provider store={store}>
        <MarkdownElement text={markdown} />
      </Provider>,
    );
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run();
