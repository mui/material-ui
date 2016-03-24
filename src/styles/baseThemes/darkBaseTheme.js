import {
cyan700,
grey600,
pinkA100, pinkA200, pinkA400,
fullWhite,
} from '../colors';
import ColorManipulator from '../../utils/colorManipulator';
import spacing from '../spacing';

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: cyan700,
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: pinkA200,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: ColorManipulator.fade(fullWhite, 0.3),
    disabledColor: ColorManipulator.fade(fullWhite, 0.3),
    pickerHeaderColor: ColorManipulator.fade(fullWhite, 0.12),
    clockCircleColor: ColorManipulator.fade(fullWhite, 0.12),
  },
};
