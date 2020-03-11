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
 *
 * Demos:
 * - {@link https://material-ui.com/components/drawers Drawers}
 *
 * API:
 * - {@link https://material-ui.com/api/SwipeableDrawer SwipeableDrawer API}
 * - inherits {@link https://material-ui.com/api//api/drawer Drawer API}
 */
declare const SwipeableDrawer: React.ComponentType<SwipeableDrawerProps>;

export default SwipeableDrawer;
