import * as React from 'react';

export interface ClickAwayListenerProps {
  /**
   * The wrapped element.
   */
  children: React.ReactNode;
  /**
   * If `true`, the React tree is ignored and only the DOM tree is considered.
   * This prop changes how portaled elements are handled.
   */
  disableReactTree?: boolean;
  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent?: 'onClick' | 'onMouseDown' | 'onMouseUp' | false;
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: (event: React.MouseEvent<Document>) => void;
  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent?: 'onTouchStart' | 'onTouchEnd' | false;
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 * Demos:
 *
 * - [Click Away Listener](https://mui.com/components/click-away-listener/)
 * - [Menus](https://mui.com/components/menus/)
 *
 * API:
 *
 * - [ClickAwayListener API](https://mui.com/api/click-away-listener/)
 */
export default function ClickAwayListener(props: ClickAwayListenerProps): JSX.Element;
