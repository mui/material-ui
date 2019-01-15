import * as React from 'react';
import { Omit } from '..';
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

declare const SwipeableDrawer: React.ComponentType<SwipeableDrawerProps>;

export default SwipeableDrawer;
