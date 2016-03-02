import React from 'react';
const propTypes = {
  /**
   * True if current count exceeds maximum count.
   */
  countError: React.PropTypes.bool,

  /**
   * Current number of character in the Textfield.
   */
  currentChar: React.PropTypes.number,

  /**
   * Override the inline-styles of the error element.
   */
  errorStyle: React.PropTypes.object,

  /**
   * Maximum number of character in the Textfield.
   */
  maxChar: React.PropTypes.number,

  /**
   * @ignore
   * The material-ui theme applied to this component.
   */
  muiTheme: React.PropTypes.object.isRequired,

  /**
   * Override the inline-styles of the root element.
   */
  style: React.PropTypes.object,
};

const defaultProps = {
};

const TextCharCount = (props) => {
  const {
    countError,
    currentChar,
    maxChar,
    muiTheme,
    style,
    errorStyle,
  } = props;

  const {
    prepareStyles,
    textField: {
      hintColor,
      errorColor,
    },
  } = muiTheme;

  const styles = {
    root: {
      position: 'relative',
      color: hintColor,
      float: 'right',
      fontSize: '12px',
      bottom: 8,
    },
    error: {
      color: errorColor,
    },
  };

  let regularStyle = Object.assign({}, styles.root, style);
  if (countError) regularStyle = Object.assign({}, styles.root, styles.error, errorStyle);

  return (
    <div style={prepareStyles(regularStyle)}>
    {currentChar}/{maxChar}
    </div>
  );
};

TextCharCount.propTypes = propTypes;
TextCharCount.defaultProps = defaultProps;

export default TextCharCount;
