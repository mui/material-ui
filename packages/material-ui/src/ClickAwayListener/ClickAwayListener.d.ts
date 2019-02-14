import * as React from 'react';

export interface ClickAwayListenerProps {
  children: React.ReactNode;
  mouseEvent?: 'onClick' | 'onMouseDown' | 'onMouseUp' | false;
  onClickAway: (event: React.MouseEvent<Document>) => void;
  touchEvent?: 'onTouchStart' | 'onTouchEnd' | false;
}

declare const ClickAwayListener: React.ComponentType<ClickAwayListenerProps>;

export default ClickAwayListener;
