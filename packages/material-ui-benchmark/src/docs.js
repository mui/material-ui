/* eslint-disable no-console */

import Benchmark from 'benchmark';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
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

suite
  .add('Markdown', () => {
    ReactDOMServer.renderToString(<Markdown>{markdown}</Markdown>);
  })
  .add('MarkdownElement', () => {
    ReactDOMServer.renderToString(<MarkdownElement text={markdown} />);
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .run();
