/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable no-console */

import { mkdir, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import * as reactDocgen from 'react-docgen';
import generateMarkdown from '../src/modules/utils/generateMarkdown';
import { findPagesMarkdown, findComponents } from '../src/modules/utils/find';
import { getComponents } from '../src/modules/utils/parseMarkdown';
import createMuiTheme from '../../src/styles/theme';
import getStylesCreator from '../../src/styles/getStylesCreator';

function ensureExists(pat, mask, cb) {
  mkdir(pat, mask, err => {
    if (err) {
      if (err.code === 'EEXIST') {
        cb(null); // ignore the error if the folder already exists
      } else {
        cb(err); // something else went wrong
      }
    } else {
      cb(null); // successfully created folder
    }
  });
}

const docsApiDirectory = path.resolve(__dirname, '../../pages/api');
const theme = createMuiTheme();

function buildDocs(options) {
  const { componentPath, pagesMarkdown } = options;
  const src = readFileSync(componentPath, 'utf8');

  if (src.match(/@ignore - internal component\./)) {
    return;
  }

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const component = require(componentPath);
  const styles = {
    classes: [],
    name: null,
  };

  if (component.styles && component.default.options) {
    // Collect the customization points of the `classes` property.
    styles.classes = Object.keys(getStylesCreator(component.styles).create(theme)).filter(
      className => !className.match(/^(@media|@keyframes)/),
    );
    styles.name = component.default.options.name;
  }

  let reactAPI;
  try {
    reactAPI = reactDocgen.parse(src);
  } catch (err) {
    console.log('Error parsing src for', componentPath);
    throw err;
  }

  reactAPI.name = path.parse(componentPath).name;
  reactAPI.styles = styles;
  reactAPI.pagesMarkdown = pagesMarkdown;
  reactAPI.src = src;
  let markdown;
  try {
    markdown = generateMarkdown(reactAPI);
  } catch (err) {
    console.log('Error generating markdown for', componentPath);
    throw err;
  }

  ensureExists(docsApiDirectory, 0o744, err => {
    if (err) {
      console.log('Error creating directory', docsApiDirectory);
      return;
    }

    writeFileSync(path.resolve(docsApiDirectory, `${kebabCase(reactAPI.name)}.md`), markdown);
    writeFileSync(
      path.resolve(docsApiDirectory, `${kebabCase(reactAPI.name)}.js`),
      `// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './${kebabCase(reactAPI.name)}.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default withRoot(Page);
`,
    );

    console.log('Built markdown docs for', componentPath);
  });
}

const pagesMarkdown = findPagesMarkdown()
  .map(markdown => {
    const markdownSource = readFileSync(markdown.filename, 'utf8');

    return {
      ...markdown,
      components: getComponents(markdownSource),
    };
  })
  .filter(markdown => markdown.components.length > 0);

const components = findComponents();

components.forEach(component => {
  buildDocs({
    componentPath: component.filename,
    pagesMarkdown,
  });
});
