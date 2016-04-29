import transitions from '../styles/transitions';
import {darken, fade} from '../utils/colorManipulator';

export default function getStyles(props, context, state) {
  const {disabled, disabledBackgroundColor, fullWidth, primary, secondary, mini, style, type} = props;
  const {baseTheme, button, flatButton, floatingActionButton, paper, raisedButton} = context.muiTheme;

  const buttonTheme = (type === 'flat') ? flatButton :
    (type === 'fab') ? floatingActionButton : raisedButton;

  const hovered = (state.hovered || state.isKeyboardFocused) && !disabled;

  let backgroundColor = props.backgroundColor || buttonTheme.color;
  let labelColor = props.labelColor || buttonTheme.textColor;

  if (disabled) {
    backgroundColor = disabledBackgroundColor || buttonTheme.disabledColor;
    labelColor = buttonTheme.disabledTextColor;
  } else if (primary) {
    backgroundColor = buttonTheme.primaryColor;
    labelColor = buttonTheme.primaryTextColor;
  } else if (secondary) {
    backgroundColor = buttonTheme.secondaryColor;
    labelColor = buttonTheme.secondaryTextColor;
  }

  let ripple;

  if (type === 'flat') {
    backgroundColor = props.backgroundColor || buttonTheme.color; // FIXME: Code smell - resets flat button background
    backgroundColor = hovered ? fade(flatButton.buttonFilterColor, 0.2) : backgroundColor;

    ripple = {
      color: flatButton.buttonFilterColor,
      opacity: 0.3,
    };
  } else {
    backgroundColor = hovered ? darken(backgroundColor, 0.12) : backgroundColor;

    ripple = {
      color: labelColor,
      opacity: !(primary || secondary) ? 0.1 : 0.16, // FIXME: Code smell - Shouldn't have to second guess the color
    };
  }
  const buttonHeight = style && style.height || button.height;

  const buttonStyle = {
    display: 'inline-block',
    position: 'relative',
    lineHeight: `${buttonHeight}px`,
    backgroundColor: backgroundColor,
    transition: transitions.easeOut(),
    textAlign: 'center', // This is the default value for a button but not a link
    boxShadow: (disabled || type === 'flat') ? 0 : paper.zDepthShadows[state.zDepth - 1],
  };

  const flatRaisedButtonStyle = {
    height: buttonHeight,
    minWidth: fullWidth ? '100%' : button.minWidth,
    borderRadius: 2,
    verticalAlign: 'middle',
  };

  const fabButtonStyle = {
    width: mini ? floatingActionButton.miniSize : floatingActionButton.buttonSize,
    height: mini ? floatingActionButton.miniSize : floatingActionButton.buttonSize,
    borderRadius: '50%',
    overflow: 'hidden',
    verticalAlign: 'bottom',
  };

  return {
    root: Object.assign(buttonStyle, (type === 'fab') ? fabButtonStyle : flatRaisedButtonStyle),
    icon: (childInfo) => ({
      color: labelColor,
      fill: labelColor,
      verticalAlign: 'middle',
      marginLeft: childInfo.hasLabel && !childInfo.labelBefore ? 12 : 0,
      marginRight: childInfo.hasLabel && childInfo.labelBefore ? 12 : 0,
    }),
    label: (childInfo) => ({
      position: 'relative',
      color: labelColor,
      letterSpacing: 0,
      textTransform: button.textTransform,
      fontWeight: button.fontWeight,
      fontSize: button.fontSize,
      paddingLeft: childInfo.hasIcon && !childInfo.labelBefore ? 8 : baseTheme.spacing.desktopGutterLess,
      paddingRight: childInfo.hasIcon && childInfo.labelBefore ? 8 : baseTheme.spacing.desktopGutterLess,
      userSelect: 'none',
    }),
    ripple: ripple,
  };
}
