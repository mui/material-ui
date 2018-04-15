import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import { isHorizontal } from '../Drawer/Drawer';

export const styles = theme => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: theme.zIndex.drawer - 1,
  },
  discoveryAnchorLeft: {
    right: 'auto',
  },
  discoveryAnchorRight: {
    left: 'auto',
    right: 0,
  },
  discoveryAnchorTop: {
    bottom: 'auto',
    right: 0,
  },
  discoveryAnchorBottom: {
    top: 'auto',
    bottom: 0,
    right: 0,
  },
});

/**
 * @ignore - internal component.
 */
function SwipeArea(props) {
  const { anchor, classes, swipeAreaWidth, ...other } = props;

  return (
    <div
      className={classNames(classes.root, classes[`discoveryAnchor${capitalize(anchor)}`])}
      style={{
        [isHorizontal(props) ? 'width' : 'height']: swipeAreaWidth,
      }}
      {...other}
    />
  );
}

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
   * The width of the left most (or right most) area in pixels where the
   * drawer can be swiped open from.
   */
  swipeAreaWidth: PropTypes.number.isRequired,
};

export default withStyles(styles)(SwipeArea);
