import transitions from '../styles/transitions';
import {darken, fade} from '../utils/colorManipulator';

export default function getStyles(props, context, state) {
  const {disabled, disabledBackgroundColor, fullWidth, primary, secondary, mini, style, type} = props;
  const {button, flatButton, floatingActionButton, paper, raisedButton} = context.muiTheme;

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
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 12px',
    backgroundColor: backgroundColor,
    transition: transitions.easeOut(),
    boxShadow: (disabled || type === 'flat') ? 0 : paper.zDepthShadows[state.zDepth - 1],
    lineHeight: `${buttonHeight}px`,
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
    icon: {
      color: labelColor,
      fill: labelColor,
      margin: '0 4px',
      verticalAlign: 'middle',
    },
    label: {
      color: labelColor,
      textTransform: button.textTransform,
      fontWeight: button.fontWeight,
      fontSize: button.fontSize,
      userSelect: 'none',
      margin: '0 4px',
    },
    ripple: ripple,
  };
}
