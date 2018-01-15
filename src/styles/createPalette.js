import warning from 'warning';
import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.
import indigo from '../colors/indigo';
import pink from '../colors/pink';
import grey from '../colors/grey';
import red from '../colors/red';
import common from '../colors/common';
import { getContrastRatio, darken, lighten } from './colorManipulator';

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
    paper: common.white,
    default: grey[50],
    appBar: grey[100],
    contentFrame: grey[200],
    chip: grey[300],
    avatar: grey[400],
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
    paper: grey[800],
    default: '#303030',
    appBar: grey[900],
    contentFrame: grey[900],
    chip: grey[700],
    avatar: grey[600],
  },
  line: {
    stepper: grey[600],
  },
};

function addLightOrDark(intent, direction, shade, tonalOffset) {
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffset);
    } else if (direction === 'dark') {
      intent.dark = darken(intent.main, tonalOffset * 1.5);
    }
  }
}

export default function createPalette(palette: Object) {
  const {
    primary = {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
    },
    secondary = {
      light: pink.A200,
      main: pink.A400,
      dark: pink.A700,
    },
    error = {
      main: red[500],
    },
    type = 'light',
    contrastThreshold = 3,
    tonalOffset = 0.2,
    ...other
  } = palette;

  if (!primary.main && primary[500]) {
    primary.main = primary[500];
  }
  addLightOrDark(primary, 'light', '300', tonalOffset);
  addLightOrDark(primary, 'dark', '700', tonalOffset);

  if (!secondary.main && secondary.A400) {
    secondary.main = secondary.A400;
  }
  addLightOrDark(secondary, 'light', 'A200', tonalOffset);
  addLightOrDark(secondary, 'dark', 'A700', tonalOffset);

  if (!error.main && error[500]) {
    error.main = error[500];
  }

  function getContrastText(background) {
    // Use the same logic as
    // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
    // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
    const contrastText =
      getContrastRatio(background, dark.text.primary) >= contrastThreshold
        ? dark.text.primary
        : light.text.primary;

    if (process.env.NODE_ENV !== 'production') {
      const contrast = getContrastRatio(background, contrastText);
      warning(
        contrast >= 3,
        [
          `Material-UI: the contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`,
          'falls below the WACG recommended absolute minimum contrast ratio of 3:1.',
          'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
        ].join('\n'),
      );
    }

    return contrastText;
  }

  if (!primary.contrastText) {
    primary.contrastText = getContrastText(primary.main);
  }

  if (!secondary.contrastText) {
    secondary.contrastText = getContrastText(secondary.main);
  }

  const types = { dark, light };
  warning(Boolean(types[type]), `Material-UI: the palette type \`${type}\` is not supported.`);

  const paletteOutput = deepmerge(
    {
      common,
      type,
      primary,
      secondary,
      error,
      grey,
      types,
      text: types[type].text,
      input: types[type].input,
      action: types[type].action,
      background: types[type].background,
      line: types[type].line,
      contrastThreshold,
      getContrastText,
    },
    other,
    {
      clone: false, // No need to clone deep
    },
  );

  return paletteOutput;
}
