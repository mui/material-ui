/* eslint-disable no-console */

import { mkdir, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import { defaultHandlers, parse as docgenParse } from 'react-docgen';
import muiDefaultPropsHandler from '../src/modules/utils/defaultPropsHandler';
import generateMarkdown from '../src/modules/utils/generateMarkdown';
import { findPagesMarkdown, findComponents } from '../src/modules/utils/find';
import { getHeaders } from '../src/modules/utils/parseMarkdown';
import parseTest from '../src/modules/utils/parseTest';
import createMuiTheme from '../../packages/material-ui/src/styles/createMuiTheme';
import getStylesCreator from '../../packages/material-ui-styles/src/getStylesCreator';

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

function getInheritance(testInfo, src) {
  let inheritedComponentName = testInfo.inheritComponent;

  if (inheritedComponentName == null) {
    const match = src.match(inheritedComponentRegexp);
    if (match !== null) {
      inheritedComponentName = match[1];
    }
  }

  if (inheritedComponentName == null) {
    return null;
  }

  let pathname;

  switch (inheritedComponentName) {
    case 'Transition':
      pathname = 'https://reactcommunity.org/react-transition-group/#Transition';
      break;

    default:
      pathname = `/api/${kebabCase(inheritedComponentName)}`;
      break;
  }

  return {
    component: inheritedComponentName,
    pathname,
  };
}

async function buildDocs(options) {
  const { component: componentObject, pagesMarkdown } = options;
  const src = readFileSync(componentObject.filename, 'utf8');

  if (src.match(/@ignore - internal component\./) || src.match(/@ignore - do not document\./)) {
    return;
  }

  const spread = !src.match(/ = exactProp\(/);

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
        componentObject.filename.replace(
          `Select${path.sep}Select`,
          `NativeSelect${path.sep}NativeSelect`,
        ),
        'utf8',
      );
    }

    /**
     * Collect classes comments from the source
     */
    const stylesRegexp = /export const styles.*[\r\n](.*[\r\n])*};[\r\n][\r\n]/;
    const styleRegexp = /\/\* (.*) \*\/[\r\n]\s*(\w*)/g;
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
    reactAPI = docgenParse(src, null, defaultHandlers.concat(muiDefaultPropsHandler), {
      filename: componentObject.filename,
    });
  } catch (err) {
    console.log('Error parsing src for', componentObject.filename);
    throw err;
  }

  reactAPI.name = name;
  reactAPI.styles = styles;
  reactAPI.pagesMarkdown = pagesMarkdown;
  reactAPI.src = src;
  reactAPI.spread = spread;

  const testInfo = await parseTest(componentObject.filename);
  // no Object.assign to visually check for collisions
  reactAPI.forwardsRefTo = testInfo.forwardsRefTo;
  reactAPI.strictModeReady = testInfo.strictModeReady;

  // if (reactAPI.name !== 'TableCell') {
  //   return;
  // }

  // Relative location in the file system.
  reactAPI.filename = componentObject.filename.replace(rootDirectory, '');
  reactAPI.inheritance = getInheritance(testInfo, src);

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
      `import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './${kebabCase(reactAPI.name)}.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default Page;
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
    buildDocs({ component, pagesMarkdown }).catch(error => {
      console.warn(`error building docs for ${component.filename}`);
      console.error(error);
      process.exit(1);
    });
  });
}

run();
