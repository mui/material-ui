import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
  scThemeBackground,
  scThemePrimaryDefault,
  scThemeBasicXLight,
  scThemeBasicXXXLight,
  scThemeForeground
} from '../colors';
import {fade} from '../../utils/colorManipulator';
import spacing from '../spacing';

/**
 *  SPEAK Theme is the default theme for speak-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */

export default {
  spacing: spacing,
  fontFamily: 'Open Sans, Arial, sans-serif',
  palette: {
    primary1Color: scThemePrimaryDefault,
    primary2Color: scThemePrimaryDefault,
    primary3Color: scThemeBasicXLight,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: scThemeForeground,
    alternateTextColor: white,
    canvasColor: scThemeBackground,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
};
