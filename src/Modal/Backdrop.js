import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Fade from '../transitions/Fade';

export const styles = theme => ({
  root: {
    zIndex: -1,
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    // Remove grey highlight
    WebkitTapHighlightColor: theme.palette.common.transparent,
    willChange: 'opacity',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  invisible: {
    backgroundColor: theme.palette.common.transparent,
  },
});

function Backdrop(props) {
  const { classes, invisible, open, transitionDuration, ...other } = props;

  const className = classNames(classes.root, {
    [classes.invisible]: invisible,
  });

  return (
    <Fade appear in={open} timeout={transitionDuration} {...other}>
      <div data-mui-test="Backdrop" className={className} aria-hidden="true" />
    </Fade>
  );
}

Backdrop.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
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
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
};

Backdrop.defaultProps = {
  invisible: false,
};

export default withStyles(styles, { name: 'MuiBackdrop' })(Backdrop);
