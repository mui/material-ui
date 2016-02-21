import React from 'react';
import Transitions from '../styles/transitions';
import {shouldUpdate} from 'recompose';
import {withShallow} from '../utils/recompose';

const propTypes = {
  /**
   * @ignore
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
   * Override the inline-styles of the root element.
   */
  style: React.PropTypes.object,
};

const TextFieldLabel = (props) => {
  const {
    muiTheme,
    className,
    children,
    disabled = false,
    shrink = false,
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
        ? 'perspective(1px) scale(0.75) translate3d(0, -28px, 0)'
        : 'scale(1) translate3d(0, 0, 0)',
      transformOrigin: 'left top',
      pointerEvents: shrink ? 'none' : 'auto',
      userSelect: 'none',
    },
  };

  const {
    prepareStyles,
  } = muiTheme;

  return (
    <label
      className={className}
      style={prepareStyles(Object.assign({}, styles.root, style))}
      htmlFor={htmlFor}
      onTouchTap={onTouchTap}
    >
      {children}
    </label>
  );
};

TextFieldLabel.propTypes = propTypes;

export default shouldUpdate(withShallow('style'))(TextFieldLabel);
