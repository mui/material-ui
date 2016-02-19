import {
cyan500, cyan700,
pinkA200,
grey100, grey300, grey400, grey500,
white, darkBlack, fullBlack,
} from '../colors';
import ColorManipulator from '../../utils/color-manipulator';
import Spacing from '../spacing';

/*
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */

export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: ColorManipulator.fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: ColorManipulator.fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
};
