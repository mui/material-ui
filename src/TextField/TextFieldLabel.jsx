import React from 'react';
import Transitions from '../styles/transitions';
import styleUtils from '../utils/styles';

const propTypes = {
  /**
   * The material-ui theme applied to this component.
   */
  muiTheme: React.PropTypes.object.isRequired,

  /**
   * The css class name of the root element.
   */
  className: React.PropTypes.string,

  /**
   * The label contents.
   */
  children: React.PropTypes.node,

  /**
   * Disables the label if set to true.
   */
  disabled: React.PropTypes.bool,

  /**
   * True if the floating label should shrink.
   */
  shrink: React.PropTypes.bool,

  /**
   * The id of the target element that this label should refer to.
   */
  htmlFor: React.PropTypes.string,

  /**
   * Callback function for when the label is selected via a touch tap.
   */
  onTouchTap: React.PropTypes.func,

  /**
   * Override the inline-styles of the floating label.
   */
  style: React.PropTypes.object,
};

const defaultProps = {
  disabled: false,
  shrink: false,
};

const TextFieldLabel = (props) => {

  const {
    muiTheme,
    className,
    children,
    disabled,
    shrink,
    htmlFor,
    style,
    onTouchTap,
  } = props;

  const styles = {
    root: {
      position: 'absolute',
      lineHeight: '22px',
      top: 38,
      transition: Transitions.easeOut(),
      zIndex: 1, // Needed to display label above Chrome's autocomplete field background
      cursor: disabled ? 'default' : 'text',
      transform: shrink
        ? 'perspective(1px) scale(0.75) translate3d(2px, -28px, 0)'
        : 'scale(1) translate3d(0, 0, 0)',
      transformOrigin: 'left top',
      pointerEvents: shrink ? 'none' : 'auto',
      userSelect: 'none',
    },
  };

  return (
    <label
      className={className}
      style={styleUtils.prepareStyles(muiTheme, styles.root, style)}
      htmlFor={htmlFor}
      onTouchTap={onTouchTap}
    >
      {children}
    </label>
  );
};

TextFieldLabel.propTypes = propTypes;
TextFieldLabel.defaultProps = defaultProps;

export default TextFieldLabel;
