import React from 'react';
import ColorManipulator from '../utils/color-manipulator';
import Transitions from '../styles/transitions';
import TextFieldHint from './TextFieldHint';
import TextFieldLabel from './TextFieldLabel';
import TextFieldUnderline from './TextFieldUnderline';

const getStyles = (props) => {
  const {
    disabled,
    errorStyle,
    errorText,
    floatingLabelText,
    fullWidth,
    height,
    hasValue,
    isFocused,
    muiTheme,
    multiLine,
  } = props;

  const {
    baseTheme,
    textField: {
      floatingLabelColor,
      focusColor,
      disabledTextColor,
      backgroundColor,
      hintColor,
      errorColor,
    },
  } = muiTheme;

  const styles = {
    root: {
      verticalAlign: 'top',
      fontSize: 16,
      lineHeight: '24px',
      width: fullWidth ? '100%' : 256,
      height: height + (floatingLabelText ? 48 : 24),
      display: 'inline-block',
      position: 'relative',
      backgroundColor: backgroundColor,
      fontFamily: baseTheme.fontFamily,
      transition: Transitions.easeOut('200ms', 'height'),
      marginTop: multiLine ? 8 : 0, // can't explain why this is needed
                                    // floatingLabel + error example requires
                                    // to match vertical spacing on docs site
    },
    error: {
      position: 'relative',
      bottom: 1,
      fontSize: 12,
      lineHeight: '12px',
      color: errorColor,
      transition: Transitions.easeOut(),
    },
    floatingLabel: {
      color: hintColor,
      pointerEvents: 'none',
    },
    floatingLabelWrapper: {
      height: height + (floatingLabelText ? 48 : 24),
      paddingTop: props.floatingLabelText ? 26 : 0,
      boxSizing: 'border-box',
    },
  };

  Object.assign(styles.error, errorStyle);


  if (isFocused) {
    styles.floatingLabel.color = focusColor;
  }

  if (hasValue) {
    styles.floatingLabel.color = ColorManipulator.fade(disabled ? disabledTextColor : floatingLabelColor, 0.5);
  }

  if (errorText) {
    if (isFocused) {
      styles.floatingLabel.color = styles.error.color;
    }
  }

  return styles;
};

const defaultProps = {
  disabled: false,
  multiLine: false,
  fullWidth: false,
  type: 'text',
  underlineShow: true,
};

const propTypes = {
  children: React.PropTypes.node,

  /**
   * The css class name of the root element.
   */
  className: React.PropTypes.string,

  /**
   * The text string to use for the default value.
   */
  defaultValue: React.PropTypes.any,

  /**
   * Disables the text field if set to true.
   */
  disabled: React.PropTypes.bool,

  /**
   * The style object to use to override error styles.
   */
  errorStyle: React.PropTypes.object,

  /**
   * The error content to display.
   */
  errorText: React.PropTypes.node,

  /**
   * The style object to use to override floating label styles.
   */
  floatingLabelStyle: React.PropTypes.object,

  /**
   * The content to use for the floating label element.
   */
  floatingLabelText: React.PropTypes.node,

  /**
   * If true, the field receives the property width 100%.
   */
  fullWidth: React.PropTypes.bool,

  /**
   * The height of the control being decorated
   */
  height: React.PropTypes.number,

  /**
   * Override the inline-styles of the TextField's hint text element.
   */
  hintStyle: React.PropTypes.object,

  /**
   * The hint content to display.
   */
  hintText: React.PropTypes.node,
  /**
   * The decorator should appear like it has a value
   */
  hasValue: React.PropTypes.bool,

  /**
   * The id prop for the text field.
   */
  id: React.PropTypes.string.isRequired,

  /**
   * The decorator should appear focussed (e.g blue underline)
   */
  isFocused: React.PropTypes.bool,

  /**
   * Override the inline-styles of the TextField's input element.
   * When multiLine is false: define the style of the input element.
   * When multiLine is true: define the style of the container of the textarea.
   */
  inputStyle: React.PropTypes.object,


  muiTheme: React.PropTypes.object,

  /**
   * Name applied to the input.
   */
  name: React.PropTypes.string,

  /**
   * Override the inline-styles of the root element.
   */
  style: React.PropTypes.object,

  /**
   * Override the inline-styles of the
   * TextField's underline element when disabled.
   */
  underlineDisabledStyle: React.PropTypes.object,

  /**
   * Override the inline-styles of the TextField's
   * underline element when focussed.
   */
  underlineFocusStyle: React.PropTypes.object,

  /**
   * If true, shows the underline for the text field.
   */
  underlineShow: React.PropTypes.bool,

  /**
   * Override the inline-styles of the TextField's underline element.
   */
  underlineStyle: React.PropTypes.object,
};

const TextFieldDecorator = (props) => {
  const {
    children,
    className,
    disabled,
    errorStyle,
    errorText,
    floatingLabelStyle,
    floatingLabelText,
    hasValue,
    hintText,
    hintStyle,
    id,
    isFocused,
    muiTheme,
    style,
    underlineDisabledStyle,
    underlineFocusStyle,
    underlineShow,
    underlineStyle,
    ...other,
  } = props;

  const {
    prepareStyles,
  } = muiTheme;

  const styles = getStyles(props);
  const errorTextElement = errorText ? (
    <div style={prepareStyles(styles.error)}>{errorText}</div>
  ) : null;

  const floatingLabelTextElement = floatingLabelText && (
    <TextFieldLabel
      disabled={disabled}
      htmlFor={id}
      muiTheme={muiTheme}
      shrink={hasValue || isFocused}
      style={Object.assign(styles.floatingLabel, floatingLabelStyle)}
    >
      {floatingLabelText}
    </TextFieldLabel>
  );


  return (
    <div className={className} style={prepareStyles(Object.assign(styles.root, style))}>
      {floatingLabelTextElement}
      {hintText ?
        <TextFieldHint
          muiTheme={muiTheme}
          show={!(hasValue || (floatingLabelText && !isFocused))}
          style={hintStyle}
          text={hintText}
        /> :
        null
      }
      <div style={styles.floatingLabelWrapper}>
        {children}
        {errorTextElement}
      </div>
      {underlineShow ?
        <TextFieldUnderline
          disabled={disabled}
          disabledStyle={underlineDisabledStyle}
          error={!!errorText}
          errorStyle={errorStyle}
          focus={isFocused}
          focusStyle={underlineFocusStyle}
          muiTheme={muiTheme}
          style={underlineStyle}
        /> :
        null
      }
    </div>
  );
};

TextFieldDecorator.propTypes = propTypes;
TextFieldDecorator.defaultProps = defaultProps;

export default TextFieldDecorator;
