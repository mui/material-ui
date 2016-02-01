import merge from 'lodash.merge';
import Colors from './colors';
import ColorManipulator from '../utils/color-manipulator';
import autoPrefix from './auto-prefix';
import lightBaseTheme from './baseThemes/lightBaseTheme';
import zIndex from './zIndex';
import {autoprefixer, callOnce, rtl} from './transformers';
import compose from 'lodash.flowright';

/**
 * Get the MUI theme corresponding to a base theme.
 * It's possible to override the computed theme values
 * by providing a second argument. The calculated
 * theme will be deeply merged with the second argument.
 */
export default function getMuiTheme(baseTheme, muiTheme) {
  baseTheme = merge({}, lightBaseTheme, baseTheme);
  const {
    palette,
    spacing,
  } = baseTheme;

  muiTheme = merge({
    isRtl: false,
    userAgent: undefined,
    zIndex,
    baseTheme,
    rawTheme: baseTheme, // To provide backward compatibility.
    appBar: {
      color: palette.primary1Color,
      textColor: palette.alternateTextColor,
      height: spacing.desktopKeylineIncrement,
    },
    avatar: {
      borderColor: 'rgba(0, 0, 0, 0.08)',
    },
    badge: {
      color: palette.alternateTextColor,
      textColor: palette.textColor,
      primaryColor: palette.accent1Color,
      primaryTextColor: palette.alternateTextColor,
      secondaryColor: palette.primary1Color,
      secondaryTextColor: palette.alternateTextColor,
    },
    button: {
      height: 36,
      minWidth: 88,
      iconButtonSize: spacing.iconSize * 2,
    },
    cardText: {
      textColor: palette.textColor,
    },
    checkbox: {
      boxColor: palette.textColor,
      checkedColor: palette.primary1Color,
      requiredColor: palette.primary1Color,
      disabledColor: palette.disabledColor,
      labelColor: palette.textColor,
      labelDisabledColor: palette.disabledColor,
    },
    datePicker: {
      color: palette.primary1Color,
      textColor: palette.alternateTextColor,
      calendarTextColor: palette.textColor,
      selectColor: palette.primary2Color,
      selectTextColor: palette.alternateTextColor,
    },
    dropDownMenu: {
      accentColor: palette.borderColor,
    },
    flatButton: {
      color: Colors.transparent,
      buttonFilterColor: '#999999',
      disabledTextColor: ColorManipulator.fade(palette.textColor, 0.3),
      textColor: palette.textColor,
      primaryTextColor: palette.accent1Color,
      secondaryTextColor: palette.primary1Color,
    },
    floatingActionButton: {
      buttonSize: 56,
      miniSize: 40,
      color: palette.accent1Color,
      iconColor: palette.alternateTextColor,
      secondaryColor: palette.primary1Color,
      secondaryIconColor: palette.alternateTextColor,
      disabledTextColor: palette.disabledColor,
    },
    gridTile: {
      textColor: Colors.white,
    },
    inkBar: {
      backgroundColor: palette.accent1Color,
    },
    leftNav: {
      width: spacing.desktopKeylineIncrement * 4,
      color: palette.canvasColor,
    },
    listItem: {
      nestedLevelDepth: 18,
    },
    menu: {
      backgroundColor: palette.canvasColor,
      containerBackgroundColor: palette.canvasColor,
    },
    menuItem: {
      dataHeight: 32,
      height: 48,
      hoverColor: 'rgba(0, 0, 0, .035)',
      padding: spacing.desktopGutter,
      selectedTextColor: palette.accent1Color,
    },
    menuSubheader: {
      padding: spacing.desktopGutter,
      borderColor: palette.borderColor,
      textColor: palette.primary1Color,
    },
    paper: {
      backgroundColor: palette.canvasColor,
      zDepthShadows: [
        [1, 6, 0.12, 1, 4, 0.12],
        [3, 10, 0.16, 3, 10, 0.23],
        [10, 30, 0.19, 6, 10, 0.23],
        [14, 45, 0.25, 10, 18, 0.22],
        [19, 60, 0.30, 15, 20, 0.22],
      ].map(d => (
        `0 ${d[0]}px ${d[1]}px ${ColorManipulator.fade(palette.shadowColor, d[2])},
         0 ${d[3]}px ${d[4]}px ${ColorManipulator.fade(palette.shadowColor, d[5])}`
      )),
    },
    radioButton: {
      borderColor: palette.textColor,
      backgroundColor: palette.alternateTextColor,
      checkedColor: palette.primary1Color,
      requiredColor: palette.primary1Color,
      disabledColor: palette.disabledColor,
      size: 24,
      labelColor: palette.textColor,
      labelDisabledColor: palette.disabledColor,
    },
    raisedButton: {
      color: palette.alternateTextColor,
      textColor: palette.textColor,
      primaryColor: palette.accent1Color,
      primaryTextColor: palette.alternateTextColor,
      secondaryColor: palette.primary1Color,
      secondaryTextColor: palette.alternateTextColor,
      disabledColor: ColorManipulator.darken(palette.alternateTextColor, 0.1),
      disabledTextColor: ColorManipulator.fade(palette.textColor, 0.3),
    },
    refreshIndicator: {
      strokeColor: palette.borderColor,
      loadingStrokeColor: palette.primary1Color,
    },
    slider: {
      trackSize: 2,
      trackColor: palette.primary3Color,
      trackColorSelected: palette.accent3Color,
      handleSize: 12,
      handleSizeDisabled: 8,
      handleSizeActive: 18,
      handleColorZero: palette.primary3Color,
      handleFillColor: palette.alternateTextColor,
      selectionColor: palette.primary1Color,
      rippleColor: palette.primary1Color,
    },
    snackbar: {
      textColor: palette.alternateTextColor,
      backgroundColor: palette.textColor,
      actionColor: palette.accent1Color,
    },
    table: {
      backgroundColor: palette.canvasColor,
    },
    tableHeader: {
      borderColor: palette.borderColor,
    },
    tableHeaderColumn: {
      textColor: palette.accent3Color,
      height: 56,
      spacing: 24,
    },
    tableFooter: {
      borderColor: palette.borderColor,
      textColor: palette.accent3Color,
    },
    tableRow: {
      hoverColor: palette.accent2Color,
      stripeColor: ColorManipulator.lighten(palette.primary1Color, 0.55),
      selectedColor: palette.borderColor,
      textColor: palette.textColor,
      borderColor: palette.borderColor,
      height: 48,
    },
    tableRowColumn: {
      height: 48,
      spacing: 24,
    },
    timePicker: {
      color: palette.alternateTextColor,
      textColor: palette.accent3Color,
      accentColor: palette.primary1Color,
      clockColor: palette.textColor,
      clockCircleColor: palette.clockCircleColor,
      headerColor: palette.pickerHeaderColor || palette.primary1Color,
      selectColor: palette.primary2Color,
      selectTextColor: palette.alternateTextColor,
    },
    toggle: {
      thumbOnColor: palette.primary1Color,
      thumbOffColor: palette.accent2Color,
      thumbDisabledColor: palette.borderColor,
      thumbRequiredColor: palette.primary1Color,
      trackOnColor: ColorManipulator.fade(palette.primary1Color, 0.5),
      trackOffColor: palette.primary3Color,
      trackDisabledColor: palette.primary3Color,
      labelColor: palette.textColor,
      labelDisabledColor: palette.disabledColor,
      trackRequiredColor: ColorManipulator.fade(palette.primary1Color, 0.5),
    },
    toolbar: {
      backgroundColor: ColorManipulator.darken(palette.accent2Color, 0.05),
      height: 56,
      titleFontSize: 20,
      iconColor: 'rgba(0, 0, 0, .40)',
      separatorColor: 'rgba(0, 0, 0, .175)',
      menuHoverColor: 'rgba(0, 0, 0, .10)',
    },
    tabs: {
      backgroundColor: palette.primary1Color,
      textColor: ColorManipulator.fade(palette.alternateTextColor, 0.7),
      selectedTextColor: palette.alternateTextColor,
    },
    textField: {
      textColor: palette.textColor,
      hintColor: palette.disabledColor,
      floatingLabelColor: palette.textColor,
      disabledTextColor: palette.disabledColor,
      errorColor: Colors.red500,
      focusColor: palette.primary1Color,
      backgroundColor: 'transparent',
      borderColor: palette.borderColor,
    },
  }, muiTheme);

  const transformers = [autoprefixer, rtl, callOnce].map(t => t(muiTheme)).filter(t => t);
  muiTheme.prefix = autoPrefix.getTransform(muiTheme.userAgent);
  muiTheme.prepareStyles = compose(...transformers);

  return muiTheme;
}
