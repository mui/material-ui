import React, {PropTypes} from 'react';
import transitions from '../styles/transitions';

const getStyles = (props) => {
  const {
    muiTheme: {
      textField: {
        hintColor,
        errorColor,
      },
    },

    errorText,
    adjustForMultiLine,
    adjustForFloatingLabel,
  } = props;

  const styles = {
    root: {
      position: 'relative',
      bottom: 2,
      fontSize: 12,
      lineHeight: '12px',
      color: errorText ? errorColor : hintColor,
      transition: transitions.easeOut(),
    },
  };

  if (adjustForFloatingLabel) {
    styles.root.bottom = adjustForMultiLine ? 3 : styles.root.fontSize + 3;
  }

  return styles;
};

const TextFieldHelperText = (props) => {
  const {
    muiTheme: {
      prepareStyles,
    },
    style,
    helperText,
    errorText,

    adjustForMultiLine, // eslint-disable-line no-unused-vars
    adjustForFloatingLabel, // eslint-disable-line no-unused-vars

    ...restProps,
  } = props;

  const styles = getStyles(props);

  return (
    <div style={prepareStyles(Object.assign(styles.root, style))} {...restProps}>
      {errorText || helperText}
    </div>
  );
};

TextFieldHelperText.propTypes = {
  /** @ignore */
  adjustForFloatingLabel: PropTypes.bool,
  /** @ignore */
  adjustForMultiLine: PropTypes.bool,
  /**
   * The error text that will override helper text.
   */
  errorText: PropTypes.node,
  /**
   * The helper text displayed.
   */
  helperText: PropTypes.node,
  /**
   * @ignore
   * The material-ui theme applied to this component.
   */
  muiTheme: PropTypes.object.isRequired,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
};

export default TextFieldHelperText;
