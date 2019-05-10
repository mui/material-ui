import React from 'react';
import PropTypes from 'prop-types';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    zIndex: -1,
    position: 'fixed',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    // Disable scroll capabilities.
    touchAction: 'none',
  },
  /* Styles applied to the root element if `invisible={true}`. */
  invisible: {
    backgroundColor: 'transparent',
  },
};

/**
 * @ignore - internal component.
 */
const SimpleBackdrop = React.forwardRef(function SimpleBackdrop(props, ref) {
  const { invisible, open, ...other } = props;

  return open ? (
    <div
      data-mui-test="Backdrop"
      aria-hidden
      ref={ref}
      {...other}
      style={{
        ...styles.root,
        ...(invisible ? styles.invisible : {}),
        ...other.style,
      }}
    />
  ) : null;
});

SimpleBackdrop.propTypes = {
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible: PropTypes.bool,
  /**
   * If `true`, the backdrop is open.
   */
  open: PropTypes.bool.isRequired,
};

SimpleBackdrop.defaultProps = {
  invisible: false,
};

export default SimpleBackdrop;
