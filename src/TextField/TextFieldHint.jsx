import React from 'react';
import Transitions from '../styles/transitions';
import styleUtils from '../utils/styles';

const propTypes = {
  /**
   * True if the hint text should be hidden.
   */
  hidden: React.PropTypes.bool,

  /**
   * The material-ui theme applied to this component.
   */
  muiTheme: React.PropTypes.object.isRequired,

  /**
   * Override the inline-styles of the hint text.
   */
  style: React.PropTypes.object,

  /**
   * The hint text displayed.
   */
  text: React.PropTypes.string,
};

const defaultProps = {
  visible: true,
};

const TextFieldHint = (props) => {

  const {
    hidden,
    muiTheme,
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
      opacity: hidden ? 0 : 1,
      color: hintColor,
      transition: Transitions.easeOut(),
      bottom: 12,
    },
  };

  return (
    <div
      style={styleUtils.prepareStyles(muiTheme, styles.root, style)}>{text}
    </div>
  );
};

TextFieldHint.propTypes = propTypes;
TextFieldHint.defaultProps = defaultProps;

export default TextFieldHint;
