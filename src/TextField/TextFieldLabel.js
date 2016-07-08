import React, {PropTypes} from 'react';
import transitions from '../styles/transitions';

function getStyles(props) {
  const defaultStyles = {
    position: 'absolute',
    lineHeight: '22px',
    top: 38,
    transition: transitions.easeOut(),
    zIndex: 1, // Needed to display label above Chrome's autocomplete field background
    cursor: props.disabled ? 'not-allowed' : 'text',
    transform: 'scale(1) translate(0, 0)',
    transformOrigin: 'left top',
    pointerEvents: 'auto',
    userSelect: 'none',
  };

  const shrinkStyles = props.shrink ? Object.assign({
    transform: 'scale(0.75) translate(0, -28px)',
    pointerEvents: 'none',
  }, props.shrinkStyle) : null;

  return {
    root: Object.assign(defaultStyles, props.style, shrinkStyles),
  };
}

const TextFieldLabel = (props) => {
  const {
    muiTheme,
    className,
    children,
    htmlFor,
    onTouchTap,
  } = props;

  const {prepareStyles} = muiTheme;
  const styles = getStyles(props);

  return (
    <label
      className={className}
      style={prepareStyles(styles.root)}
      htmlFor={htmlFor}
      onTouchTap={onTouchTap}
    >
      {children}
    </label>
  );
};

TextFieldLabel.propTypes = {
  /**
   * The label contents.
   */
  children: PropTypes.node,
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Disables the label if set to true.
   */
  disabled: PropTypes.bool,
  /**
   * The id of the target element that this label should refer to.
   */
  htmlFor: PropTypes.string,
  /**
   * @ignore
   * The material-ui theme applied to this component.
   */
  muiTheme: PropTypes.object.isRequired,
  /**
   * Callback function for when the label is selected via a touch tap.
   */
  onTouchTap: PropTypes.func,
  /**
   * True if the floating label should shrink.
   */
  shrink: PropTypes.bool,
  /**
   * Override the inline-styles of the root element when focused.
   */
  shrinkStyle: PropTypes.object,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
};

TextFieldLabel.defaultProps = {
  disabled: false,
  shrink: false,
};

export default TextFieldLabel;
