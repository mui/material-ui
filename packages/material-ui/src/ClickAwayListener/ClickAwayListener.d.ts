import * as React from 'react';

export interface ClickAwayListenerProps {
  children: React.ReactNode;
  mouseEvent?: 'onClick' | 'onMouseDown' | 'onMouseUp' | false;
  onClickAway: (event: React.MouseEvent<Document>) => void;
  touchEvent?: 'onTouchStart' | 'onTouchEnd' | false;
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 *
 * Demos:
 * - {@link https://material-ui.com/components/click-away-listener Click Away Listener}
 * - {@link https://material-ui.com/components/menus Menus}
 *
 * API:
 * - {@link https://material-ui.com/api/ClickAwayListener ClickAwayListener API}
 *
 */
declare const ClickAwayListener: React.ComponentType<ClickAwayListenerProps>;

export default ClickAwayListener;
