import * as React from 'react';
import { Omit } from '@material-ui/types';
import { DrawerProps } from '../Drawer';

export interface SwipeableDrawerProps extends Omit<DrawerProps, 'onClose' | 'open'> {
  /**
   * Disable the backdrop transition.
   * This can improve the FPS on low-end devices.
   */
  disableBackdropTransition?: boolean;
  /**
   * If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit
   * to promote accidental discovery of the swipe gesture.
   */
  disableDiscovery?: boolean;
  /**
   * If `true`, swipe to open is disabled. This is useful in browsers where swiping triggers
   * navigation actions. Swipe to open is disabled on iOS browsers by default.
   */
  disableSwipeToOpen?: boolean;
  /**
   * Affects how far the drawer must be opened/closed to change his state.
   * Specified as percent (0-1) of the width of the drawer
   */
  hysteresis?: number;
  /**
   * Defines, from which (average) velocity on, the swipe is
   * defined as complete although hysteresis isn't reached.
   * Good threshold is between 250 - 1000 px/s
   */
  minFlingVelocity?: number;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: React.ReactEventHandler<{}>;
  /**
   * Callback fired when the component requests to be opened.
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: React.ReactEventHandler<{}>;
  /**
   * If `true`, the drawer is open.
   */
  open: boolean;
  /**
   * The element is used to intercept the touch events on the edge.
   */
  SwipeAreaProps?: object;
  /**
   * The width of the left most (or right most) area in pixels where the
   * drawer can be swiped open from.
   */
  swipeAreaWidth?: number;
}

/**
 *
 * Demos:
 *
 * - [Drawers](https://material-ui.com/components/drawers/)
 *
 * API:
 *
 * - [SwipeableDrawer API](https://material-ui.com/api/swipeable-drawer/)
 * - inherits [Drawer API](https://material-ui.com/api/drawer/)
 */
declare const SwipeableDrawer: React.ComponentType<SwipeableDrawerProps>;

export default SwipeableDrawer;
