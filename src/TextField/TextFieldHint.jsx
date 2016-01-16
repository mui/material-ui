import React from 'react';
import Transitions from '../styles/transitions';
import {mergeStyles, prepareStyles} from '../utils/styles';

const propTypes = {
  /**
   * The material-ui theme applied to this component.
   */
  muiTheme: React.PropTypes.object.isRequired,

  /**
   * True if the hint text should be visible.
   */
  show: React.PropTypes.bool,

  /**
   * Override the inline-styles of the root element.
   */
  style: React.PropTypes.object,

  /**
   * The hint text displayed.
   */
  text: React.PropTypes.node,
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
    textField: {
      hintColor,
    },
  } = muiTheme;

  const styles = {
    root: {
      position: 'absolute',
      opacity: show ? 1 : 0,
      color: hintColor,
      transition: Transitions.easeOut(),
      bottom: 12,
    },
  };

  return (
    <div style={prepareStyles(muiTheme, mergeStyles(styles.root, style))}>
      {text}
    </div>
  );
};

TextFieldHint.propTypes = propTypes;
TextFieldHint.defaultProps = defaultProps;

export default TextFieldHint;
