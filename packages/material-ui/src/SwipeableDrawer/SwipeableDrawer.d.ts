import * as React from 'react';
import { Omit } from '@material-ui/types';
import { DrawerProps } from '../Drawer';

export interface SwipeableDrawerProps extends Omit<DrawerProps, 'onClose' | 'open'> {
  disableBackdropTransition?: boolean;
  disableDiscovery?: boolean;
  disableSwipeToOpen?: boolean;
  hysteresis?: number;
  minFlingVelocity?: number;
  onClose: React.ReactEventHandler<{}>;
  onOpen: React.ReactEventHandler<{}>;
  open: boolean;
  SwipeAreaProps?: object;
  swipeAreaWidth?: number;
}

/**
 *
 * Demos:
 *
 * - [Drawers](https://mui.com/components/drawers/)
 *
 * API:
 *
 * - [SwipeableDrawer API](https://mui.com/api/swipeable-drawer/)
 * - inherits [Drawer API](https://mui.com/api/drawer/)
 */
declare const SwipeableDrawer: React.ComponentType<SwipeableDrawerProps>;

export default SwipeableDrawer;
