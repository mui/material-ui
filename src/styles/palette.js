// @flow weak

import warning from 'warning';
import difference from 'lodash/difference';
import keys from 'lodash/keys';
import { indigo, pink, grey, red, black, white } from './colors';
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
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.26)',
  },
  background: {
    default: grey[50],
    paper: white,
    appBar: grey[100],
    contentFrame: grey[200],
    status: grey[300],
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
  action: {
    active: 'rgba(255, 255, 255, 1)',
    disabled: 'rgba(255, 255, 255, 0.3)',
  },
  background: {
    default: '#303030',
    paper: grey[800],
    appBar: grey[900],
    contentFrame: grey[900],
    status: black,
  },
};

function getContrastText(color) {
  if (getContrastRatio(color, black) < 7) {
    return dark.text.primary;
  }
  return light.text.primary;
}

export default function createPalette(options = {}) {
  const {
    primary = indigo,
    accent = pink,
    error = red,
    type = 'light',
  } = options;

  if (process.env.NODE_ENV !== 'production') {
    class PaletteColorError extends Error {
      constructor(themeColor) {
        const palette = createPalette();
        const message = [
          `${themeColor} must have the following attributes: ${keys(palette[themeColor])}`,
          'See the default colors, indigo, or pink, as exported from material-ui/style/colors.',
        ];
        super(message.join('\n'));
      }
    }

    if (difference(keys(indigo), keys(primary)).length) {
      throw new PaletteColorError('primary');
    }

    if (difference(keys(pink), keys(accent)).length) {
      throw new PaletteColorError('accent');
    }

    if (difference(keys(red), keys(error)).length) {
      throw new PaletteColorError('error');
    }
  }

  const shades = { dark, light };

  warning(shades[type], `Material-UI: the palette type \`${type}\` is not supported.`);

  return {
    type,
    text: shades[type].text,
    action: shades[type].action,
    background: shades[type].background,
    primary,
    accent,
    error,
    grey,
    getContrastText,
  };
}
