import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
  scThemeBackground,
  scThemePrimaryDark,
  scThemeMainDefault,
  scThemeBasicXLight,
  scThemeBasicXXXLight,
  scThemeBasicXXDark,
  scThemeForeground,
  scThemeBasicDark,
  scThemeBasicWhite,
  scBackDropColor,
  scThemeBasicDefault,
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
    primary1Color: scThemePrimaryDark,
    primary2Color: scThemeMainDefault,
    primary3Color: scThemeBasicXLight,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: scThemeForeground,
    alternateTextColor: scThemeBasicWhite,    
    canvasColor: scThemeBackground,
    borderColor: scThemeBasicDefault,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
    inverseColor: scThemeBasicDark,
    lightBackground: scThemeBasicWhite,
    darkBackground: scThemeBasicXXDark,
    backDropColor: scBackDropColor,        
  },
};
