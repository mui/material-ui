import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Fade from '../Fade';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    // Improve scrollable dialog support.
    zIndex: -1,
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    // To move under black style rule in v5.
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    WebkitTapHighlightColor: 'transparent',
    // Disable scroll capabilities.
    touchAction: 'none',
  },
  /* Styles applied to the root element if `invisible={true}`. */
  invisible: {
    backgroundColor: 'transparent',
  },
  /* Styles applied to the root element if `backgroundColor="black`. */
  black: {},
  /* Styles applied to the root element if `backgroundColor="white`. */
  white: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
};

const Backdrop = React.forwardRef(function Backdrop(props, ref) {
  const {
    backgroundColor = 'black',
    children,
    classes,
    className,
    invisible = false,
    open,
    transitionDuration,
    ...other
  } = props;

  return (
    <Fade in={open} timeout={transitionDuration} {...other}>
      <div
        data-mui-test="Backdrop"
        className={clsx(
          classes.root,
          classes[backgroundColor],
          {
            [classes.invisible]: invisible,
          },
          className,
        )}
        aria-hidden
        ref={ref}
      >
        {children}
      </div>
    </Fade>
  );
});

Backdrop.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The background color.
   */
  backgroundColor: PropTypes.oneOf(['black', 'white']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible: PropTypes.bool,
  /**
   * If `true`, the backdrop is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

export default withStyles(styles, { name: 'MuiBackdrop' })(Backdrop);
