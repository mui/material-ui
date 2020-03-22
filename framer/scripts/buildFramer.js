/* eslint-disable no-console */

import { mkdir, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { defaultHandlers, parse as docgenParse } from 'react-docgen';
import muiDefaultPropsHandler from 'docs/src/modules/utils/defaultPropsHandler';
import Mustache from 'mustache';
import Case from 'case';
import deepmerge from 'deepmerge';
import { findComponents } from 'docs/src/modules/utils/find';
import { componentSettings, ignoredControls } from './framerConfig';
import additionalProps from './additionalProps';

// const DEBUG = true;

// Component(s) to update
// Use Empty array for all, or one or more components selectively. `['Button', 'CircularProgress']`
const COMPONENTS = [];

// Read the command-line args
const args = process.argv;
const rootDirectory = path.resolve(__dirname, '../../');
const framerDirectory = path.resolve(process.cwd(), args[3]);

if (args.length < 4) {
  console.log('\nERROR: syntax: buildFramer source-dir target-dir [ComponentName]\n');
  process.exit();
}

function getReactAPI(src, componentObject) {
  let reactAPI;
  try {
    reactAPI = docgenParse(src, null, defaultHandlers.concat(muiDefaultPropsHandler), {
      filename: componentObject.filename,
    });
  } catch (err) {
    console.log('Error parsing src for', componentObject.filename);
    throw err;
  }

  reactAPI.name = path.parse(componentObject.filename).name;

  return reactAPI;
}

// Return true if a prop is in the ignoredProps list, or description contains `@ignore`.
function ignore(reactAPI, prop) {
  // Test if the propName contains a (sub)string from ignoredProps
  const blacklist = componentSettings.all.ignoredProps.concat(
    componentSettings[reactAPI.name].ignoredProps,
  );
  const reducer = (accumulator, currentValue) =>
    accumulator || new RegExp(`^${currentValue}$`).test(prop.name);

  return (
    (prop.description && prop.description.includes('@ignore')) || blacklist.reduce(reducer, false)
  );
}

// Build the options list for Enum PropType / TS property types
function options(type, separator) {
  let optionsString = '';
  if (type.value) {
    if (type.name === 'enum') {
      type.value.forEach((value) => {
        optionsString += `${value.value}${separator}`;
      });
    } else if (type.name === 'union') {
      type.value.forEach((value) => {
        optionsString += `${value.name}${separator}`;
      });
    }
  }
  // Remove the trailing comma
  return optionsString.slice(0, -separator.length);
}

function otherValues(others) {
  let result = '';
  const keys = Object.keys(others);
  if (keys.length > 0) {
    result += keys.reduce((acc, key) => `${acc}\n      ${key}: ${others[key]},`, '');
  }
  return result;
}

function getTemplateStrings(reactAPI) {
  let tsInterface = '';
  let defaults = '';
  let controls = '';
  let style = '';

  reactAPI.propNames.forEach((propName) => {
    const prop = reactAPI.props[propName];
    prop.name = propName;

    if (ignore(reactAPI, prop)) {
      return;
    }

    /**
     * TS Interface
     */
    const propTypeTS = { ...prop.type };

    // TODO: Refactor as switch?
    if (propTypeTS.name === 'bool') {
      propTypeTS.name = 'boolean';
    }
    if (propTypeTS.name === 'color') {
      propTypeTS.name = 'string';
    }
    if (propTypeTS.name === 'file') {
      propTypeTS.name = 'string';
    }
    if (propTypeTS.name === 'image') {
      propTypeTS.name = 'string';
    }
    if (propTypeTS.name === 'node') {
      propTypeTS.name = 'React.ReactNode';
    }
    if (propTypeTS.name === 'element') {
      propTypeTS.name = 'React.ReactElement<any>';
    }
    if (propTypeTS.name === 'func') {
      propTypeTS.name = '() => void';
    }
    if (propTypeTS.name === 'array') {
      propTypeTS.name = 'string[]';
    }

    tsInterface += `  ${propName}${propTypeTS.required ? '' : '?'}: ${
      propTypeTS.value ? `${options(propTypeTS, ' | ')}` : `${propTypeTS.name}`
    };\n`;

    /**
     * Default values
     */
    if (prop.defaultValue) {
      defaults += `  ${propName}: ${prop.defaultValue.value},\n`;
    }

    /**
     * Property controls
     */
    const propTypeControls = { ...prop.type };

    if (propTypeControls.name === 'bool') {
      propTypeControls.name = 'boolean';
    }

    const { name, value, hidden, title, ...other } = propTypeControls;

    if (!ignoredControls.includes(prop.name)) {
      controls += `
${propName}: {
  type: ControlType.${Case.pascal(name)},
  title: ${title || `'${Case.sentence(propName)}'`},${
        value
          ? `
  options: [${options(propTypeControls, ', ')}],`
          : ''
      }${
        hidden
          ? `
  hidden: ${hidden},`
          : ''
      }${otherValues(other)}
},`;
    }
  });

  if (componentSettings[reactAPI.name].style) {
    const keys = Object.keys(componentSettings[reactAPI.name].style);
    keys.forEach((key) => {
      style += `  ${key}: '${componentSettings[reactAPI.name].style[key]}',\n`;
    });
  }

  return {
    componentName: reactAPI.name,
    // Omit the trailing \n
    tsInterface: tsInterface.slice(0, -1),
    defaultProps: defaults.slice(0, -1),
    propertyControls: controls.slice(1),
    style: style.slice(0, -1),
  };
}

function ensureExists(pat, mask, cb) {
  mkdir(pat, mask, (err) => {
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

function writeFile(reactAPI) {
  ensureExists(framerDirectory, 0o744, (err) => {
    if (err) {
      console.log('Error creating directory', framerDirectory);
      return;
    }

    const template = readFileSync(
      path.join(__dirname, `templates/${componentSettings[reactAPI.name].template}`),
      'utf8',
    );
    const fileString = Mustache.render(template, getTemplateStrings(reactAPI));
    writeFileSync(path.resolve(framerDirectory, `${reactAPI.name}.tsx`), fileString);
    console.log('Built Framer component for', reactAPI.name);
  });
}

function buildFramer(componentObject) {
  const src = readFileSync(componentObject.filename, 'utf8');

  if (src.match(/@ignore - internal component\./) || src.match(/@ignore - do not document\./)) {
    return;
  }

  const reactAPI = getReactAPI(src, componentObject);

  if (COMPONENTS.length > 0) {
    if (COMPONENTS.indexOf(reactAPI.name) === -1) {
      return;
    }
  }

  // Add additional props, if the template values exist for this component
  if (componentSettings[reactAPI.name].propValues) {
    reactAPI.props = deepmerge(reactAPI.props, additionalProps(reactAPI.name));
  }

  reactAPI.propNames = Object.keys(reactAPI.props);

  // Relative location in the file system
  reactAPI.filename = componentObject.filename.replace(rootDirectory, '');

  if (typeof DEBUG !== 'undefined') {
    console.log(reactAPI.props);
  }
  writeFile(reactAPI);
}

function run() {
  const components = findComponents(path.resolve(process.cwd(), args[2]));

  components.forEach((component) => {
    if (args[4]) {
      if (args[4] === path.parse(component.filename).name) {
        buildFramer(component);
      }
      // Only convert components with settings
    } else if (Object.keys(componentSettings).includes(path.parse(component.filename).name)) {
      buildFramer(component);
    }
  });
}

run();
