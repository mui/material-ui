import React, {PropTypes} from 'react';
import transitions from '../styles/transitions';

const propTypes = {
  /**
   * @ignore
   * The material-ui theme applied to this component.
   */
  muiTheme: PropTypes.object.isRequired,
  /**
   * True if the hint text should be visible.
   */
  show: PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * The hint text displayed.
   */
  text: PropTypes.node,
};

const defaultProps = {
  show: true,
};

const TextFieldHint = (props) => {
  const {
    muiTheme,
    show,
    style,
    text,
  } = props;

  const {
    prepareStyles,
    textField: {
      hintColor,
    },
  } = muiTheme;

  const styles = {
    root: {
      position: 'absolute',
      opacity: show ? 1 : 0,
      color: hintColor,
      transition: transitions.easeOut(),
      bottom: 12,
    },
  };

  return (
    <div style={prepareStyles(Object.assign({}, styles.root, style))}>
      {text}
    </div>
  );
};

TextFieldHint.propTypes = propTypes;
TextFieldHint.defaultProps = defaultProps;

export default TextFieldHint;
