/* eslint-disable no-console */

import { mkdir, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import * as reactDocgen from 'react-docgen';
import generateMarkdown from '../src/modules/utils/generateMarkdown';
import { findPagesMarkdown, findComponents } from '../src/modules/utils/find';
import { getHeaders } from '../src/modules/utils/parseMarkdown';
import createMuiTheme from '../../packages/material-ui/src/styles/createMuiTheme';
import getStylesCreator from '../../packages/material-ui/src/styles/getStylesCreator';

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

// Read the command-line args
const args = process.argv;

// Exit with a message
function exit(error) {
  console.log(error, '\n');
  process.exit();
}

if (args.length < 4) {
  exit('\nERROR: syntax: buildApi source target');
}

const rootDirectory = path.resolve(__dirname, '../../');
const docsApiDirectory = path.resolve(rootDirectory, args[3]);
const theme = createMuiTheme();

const inheritedComponentRegexp = /\/\/ @inheritedComponent (.*)/;

function getInheritance(src) {
  const inheritedComponent = src.match(inheritedComponentRegexp);

  if (!inheritedComponent) {
    return null;
  }

  const component = inheritedComponent[1];
  let pathname;

  switch (component) {
    case 'Transition':
      pathname = 'https://reactcommunity.org/react-transition-group/#Transition';
      break;

    case 'EventListener':
      pathname = 'https://github.com/oliviertassinari/react-event-listener';
      break;

    default:
      pathname = `/api/${kebabCase(component)}`;
      break;
  }

  return {
    component,
    pathname,
  };
}

function buildDocs(options) {
  const { component: componentObject, pagesMarkdown } = options;
  const src = readFileSync(componentObject.filename, 'utf8');

  if (src.match(/@ignore - internal component\./) || src.match(/@ignore - do not document\./)) {
    return;
  }

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const component = require(componentObject.filename);
  const name = path.parse(componentObject.filename).name;
  const styles = {
    classes: [],
    name: null,
    descriptions: {},
  };

  if (component.styles && component.default.options) {
    // Collect the customization points of the `classes` property.
    styles.classes = Object.keys(getStylesCreator(component.styles).create(theme)).filter(
      className => !className.match(/^(@media|@keyframes)/),
    );
    styles.name = component.default.options.name;

    let styleSrc = src;
    // Exception for Select where the classes are imported from NativeSelect
    if (name === 'Select') {
      styleSrc = readFileSync(
        componentObject.filename.replace('Select/Select', 'NativeSelect/NativeSelect'),
        'utf8',
      );
    }

    /**
     * Collect classes comments from the source
     */
    const stylesRegexp = /export const styles.*\n(.*\n)*};\n\n/;
    const styleRegexp = /\/\* (.*) \*\/\n\s*(\w*)/g;
    // Extract the styles section from the source
    const stylesSrc = stylesRegexp.exec(styleSrc);
    if (stylesSrc) {
      // Extract individual classes and descriptions
      stylesSrc[0].replace(styleRegexp, (match, desc, key) => {
        styles.descriptions[key] = desc;
      });
    }
  }

  let reactAPI;
  try {
    reactAPI = reactDocgen.parse(src);
  } catch (err) {
    console.log('Error parsing src for', componentObject.filename);
    throw err;
  }

  reactAPI.name = name;
  reactAPI.styles = styles;
  reactAPI.pagesMarkdown = pagesMarkdown;
  reactAPI.src = src;

  // if (reactAPI.name !== 'Snackbar') {
  //   return;
  // }

  // Relative location in the file system.
  reactAPI.filename = componentObject.filename.replace(rootDirectory, '');
  reactAPI.inheritance = getInheritance(src);

  let markdown;
  try {
    markdown = generateMarkdown(reactAPI);
  } catch (err) {
    console.log('Error generating markdown for', componentObject.filename);
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
      `import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './${kebabCase(reactAPI.name)}.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default withRoot(Page);
`,
    );

    console.log('Built markdown docs for', reactAPI.name);
  });
}

function run() {
  const pagesMarkdown = findPagesMarkdown()
    .map(markdown => {
      const markdownSource = readFileSync(markdown.filename, 'utf8');
      return {
        ...markdown,
        components: getHeaders(markdownSource).components,
      };
    })
    .filter(markdown => markdown.components.length > 0);
  const components = findComponents(path.resolve(rootDirectory, args[2]));

  components.forEach(component => {
    buildDocs({ component, pagesMarkdown });
  });
}

run();
