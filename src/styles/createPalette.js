// @flow

import warning from 'warning';
import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.
import indigo from '../colors/indigo';
import pink from '../colors/pink';
import grey from '../colors/grey';
import red from '../colors/red';
import common from '../colors/common';
import { getContrastRatio } from './colorManipulator';

export const light = {
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
    icon: 'rgba(0, 0, 0, 0.38)',
    divider: 'rgba(0, 0, 0, 0.12)',
    lightDivider: 'rgba(0, 0, 0, 0.075)',
  },
  input: {
    bottomLine: 'rgba(0, 0, 0, 0.42)',
    helperText: 'rgba(0, 0, 0, 0.54)',
    labelText: 'rgba(0, 0, 0, 0.54)',
    inputText: 'rgba(0, 0, 0, 0.87)',
    disabled: 'rgba(0, 0, 0, 0.42)',
  },
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.26)',
  },
  background: {
    default: grey[50],
    paper: common.white,
    appBar: grey[100],
    contentFrame: grey[200],
    chip: grey[300],
  },
  line: {
    stepper: grey[400],
  },
};

export const dark = {
  text: {
    primary: 'rgba(255, 255, 255, 1)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    hint: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)',
    divider: 'rgba(255, 255, 255, 0.12)',
    lightDivider: 'rgba(255, 255, 255, 0.075)',
  },
  input: {
    bottomLine: 'rgba(255, 255, 255, 0.7)',
    helperText: 'rgba(255, 255, 255, 0.7)',
    labelText: 'rgba(255, 255, 255, 0.7)',
    inputText: 'rgba(255, 255, 255, 1)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  action: {
    active: 'rgba(255, 255, 255, 1)',
    disabled: 'rgba(255, 255, 255, 0.3)',
  },
  background: {
    default: '#303030',
    paper: grey[800],
    appBar: grey[900],
    contentFrame: grey[900],
    chip: grey[800],
  },
  line: {
    // TODO: What should the dark theme have for stepper line? Not stated in style guide
    stepper: grey[400],
  },
};

function getContrastText(color) {
  if (getContrastRatio(color, common.black) < 7) {
    return dark.text.primary;
  }
  return light.text.primary;
}

export default function createPalette(palette: Object) {
  const {
    primary = indigo,
    primaryShade = 500,
    secondary = pink,
    secondaryShade = 'A200',
    error = red,
    errorShade = 'A400',
    type = 'light',
    ...other
  } = palette;
  const types = { dark, light };

  warning(Boolean(types[type]), `Material-UI: the palette type \`${type}\` is not supported.`);

  const paletteOutput = deepmerge(
    {
      common,
      type,
      primary,
      primaryShade,
      secondary,
      secondaryShade,
      error,
      errorShade,
      grey,
      types,
      text: types[type].text,
      input: types[type].input,
      action: types[type].action,
      background: types[type].background,
      line: types[type].line,
      getContrastText,
    },
    other,
    {
      clone: false, // No need to clone deep
    },
  );

  // Dev warnings
  if (process.env.NODE_ENV !== 'production') {
    const difference = (base, compare) => {
      if (!compare) {
        compare = {};
      }

      return Object.keys(base).filter(shade => !compare[shade]);
    };

    const paletteHueError = (name, base, compare) => {
      const missing = difference(base, compare);
      warning(
        missing.length === 0,
        [
          `Material-UI: theme.${name} does not have the following shades: 
          ${missing.join(',')}`,
          'See the default colors, indigo, or pink, as exported from material-ui/colors.',
        ].join('\n'),
      );
    };

    paletteHueError('primary', indigo, paletteOutput.primary);
    paletteHueError('secondary', pink, paletteOutput.secondary);
    paletteHueError('error', red, paletteOutput.error);
  }

  return paletteOutput;
}
