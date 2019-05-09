import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import { isHorizontal } from '../Drawer/Drawer';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: theme.zIndex.drawer - 1,
  },
  anchorLeft: {
    right: 'auto',
  },
  anchorRight: {
    left: 'auto',
    right: 0,
  },
  anchorTop: {
    bottom: 'auto',
    right: 0,
  },
  anchorBottom: {
    top: 'auto',
    bottom: 0,
    right: 0,
  },
});

/**
 * @ignore - internal component.
 */
const SwipeArea = React.forwardRef(function SwipeArea(props, ref) {
  const { anchor, classes, className, width, ...other } = props;

  return (
    <div
      className={clsx(classes.root, classes[`anchor${capitalize(anchor)}`], className)}
      ref={ref}
      style={{
        [isHorizontal(anchor) ? 'width' : 'height']: width,
      }}
      {...other}
    />
  );
});

SwipeArea.propTypes = {
  /**
   * Side on which to attach the discovery area.
   */
  anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']).isRequired,
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The width of the left most (or right most) area in pixels where the
   * drawer can be swiped open from.
   */
  width: PropTypes.number.isRequired,
};

export default withStyles(styles, { name: 'PrivateSwipeArea' })(SwipeArea);
