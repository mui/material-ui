/* eslint-disable no-console */
import { readFileSync } from 'fs';
import { writeJSON } from 'fs-extra';
import { getLineFeed } from './helpers';
import path from 'path';
import * as _ from 'lodash';
import { defaultHandlers, parse as docgenParse } from 'react-docgen';
import muiDefaultPropsHandler from '../src/modules/utils/defaultPropsHandler';
import propJsdocHandler from '../src/modules/utils/propJsdocHandler';
import { findPagesMarkdown, findComponents } from '../src/modules/utils/find';
import { getHeaders } from '../src/modules/utils/parseMarkdown';
import parseTest from '../src/modules/utils/parseTest';
import createMuiTheme from '../../packages/material-ui/src/styles/createMuiTheme';
import getStylesCreator from '../../packages/material-ui-styles/src/getStylesCreator';
import createGenerateClassName from '../../packages/material-ui-styles/src/createGenerateClassName';

const generateClassName = createGenerateClassName();

const rootDirectory = path.resolve(__dirname, '../../');
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
      pathname = 'https://reactcommunity.org/react-transition-group/transition#Transition-props';
      break;

    default:
      pathname = `/api/${_.kebabCase(inheritedComponentName)}`;
      break;
  }

  return {
    component: inheritedComponentName,
    pathname,
  };
}

async function buildComponentApi(componentObject) {
  const src = readFileSync(componentObject.filename, 'utf8');

  if (src.match(/@ignore - internal component\./) || src.match(/@ignore - do not document\./)) {
    return null;
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
    styles.globalClasses = styles.classes.reduce((acc, key) => {
      acc[key] = generateClassName(
        {
          key,
        },
        {
          options: {
            name: styles.name,
            theme: {},
          },
        },
      );
      return acc;
    }, {});

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
    reactAPI = docgenParse(
      src,
      null,
      defaultHandlers.concat(muiDefaultPropsHandler, propJsdocHandler),
      {
        filename: componentObject.filename,
      },
    );
  } catch (err) {
    console.log('Error parsing src for', componentObject.filename);
    throw err;
  }

  reactAPI.props = _.mapValues(
    _.omitBy(reactAPI.props, descriptor => {
      const hasIgnoreTag = descriptor.tags.find(tag => tag.title === 'ignore') !== undefined;
      return hasIgnoreTag;
    }),
    ({ ...descriptor }) => {
      return descriptor;
    },
  );
  reactAPI.name = name;
  reactAPI.styles = styles;
  reactAPI.src = src;
  reactAPI.spread = spread;
  reactAPI.EOL = getLineFeed(src);

  const testInfo = await parseTest(componentObject.filename);
  // no Object.assign to visually check for collisions
  reactAPI.forwardsRefTo = testInfo.forwardsRefTo;

  // if (reactAPI.name !== 'TableCell') {
  //   return;
  // }

  // Relative location in the file system.
  reactAPI.filename = componentObject.filename.replace(rootDirectory, '');
  reactAPI.inheritance = getInheritance(testInfo, src);

  console.log('Built API data for', reactAPI.name);
  return reactAPI;
}

async function run() {
  const outputPath = path.resolve(__dirname, '../static/api.json');
  const pagesMarkdown = findPagesMarkdown().map(markdown => {
    const markdownSource = readFileSync(markdown.filename, 'utf8');
    return {
      ...markdown,
      components: getHeaders(markdownSource).components,
    };
  });
  const components = process.argv
    .slice(2)
    .map(dir => {
      return findComponents(path.resolve(dir));
    })
    .reduce((accumulatedComponents, partialComponents) => {
      return accumulatedComponents.concat(partialComponents);
    }, []);

  /**
   * @param {string} componentName
   * @returns {string[]} - list of pathnames to pages using this component
   */
  function findPagesOfComponent(componentName) {
    return Array.from(
      new Set(
        pagesMarkdown
          .filter(markdown => {
            return markdown.components.includes(componentName);
          })
          .map(markdown => {
            return markdown.pathname;
          }),
      ),
    );
  }

  const componentApis = {};
  await Promise.all(
    components.map(async component => {
      try {
        const componentApi = await buildComponentApi(component);
        if (componentApi !== null) {
          const usedInPages = findPagesOfComponent(componentApi.name);

          componentApis[componentApi.name] = {
            ...componentApi,
            usedInPages,
          };
        }
      } catch (error) {
        console.warn(`error building docs for ${component.filename}`);
        console.error(error);
        process.exit(1);
      }
    }),
  );

  const muiApi = { components: componentApis };
  await writeJSON(outputPath, muiApi, { spaces: 2 });
}

run().catch(error => {
  console.error(error, '\n');
  process.exit();
});
