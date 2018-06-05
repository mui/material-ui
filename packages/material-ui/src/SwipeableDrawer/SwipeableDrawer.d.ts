import * as React from 'react';
import { Omit } from '..';
import { DrawerProps } from '../Drawer';

export interface SwipeableDrawerProps<C> extends Omit<DrawerProps<C>, 'onClose' | 'open'> {
  disableBackdropTransition?: boolean;
  disableDiscovery?: boolean;
  disableSwipeToOpen?: boolean;
  onClose: React.ReactEventHandler<{}>;
  onOpen: React.ReactEventHandler<{}>;
  open: boolean;
  swipeAreaWidth?: number;
}

declare class SwipeableDrawer<C> extends React.Component<C & SwipeableDrawerProps<C>> {}

export default SwipeableDrawer;
