import * as React from 'react';

export interface ClickAwayListenerProps {
  children: React.ReactNode;
  onClickAway: (event: React.ChangeEvent<{}>) => void;
}

declare const ClickAwayListener: React.ComponentType<ClickAwayListenerProps>;

export default ClickAwayListener;
