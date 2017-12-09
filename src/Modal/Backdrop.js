import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

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
    backgroundColor: theme.palette.common.lightBlack,
    transition: theme.transitions.create('opacity'),
    willChange: 'opacity',
    opacity: 0,
  },
  invisible: {
    backgroundColor: theme.palette.common.transparent,
  },
});

/**
 * @ignore - internal component.
 */
function Backdrop(props) {
  const { classes, className: classNameProp, invisible, ...other } = props;

  const className = classNames(
    classes.root,
    {
      [classes.invisible]: invisible,
    },
    classNameProp,
  );

  return <div data-mui-test="Backdrop" className={className} aria-hidden="true" {...other} />;
}

Backdrop.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the backdrop is invisible.
   */
  invisible: PropTypes.bool,
};

Backdrop.defaultProps = {
  invisible: false,
};

export default withStyles(styles, { name: 'MuiBackdrop' })(Backdrop);
