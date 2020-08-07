import * as React from 'react';
import PopperJs, { ReferenceObject } from 'popper.js';
import { Omit } from '..';
import { PortalProps } from '../Portal';

export type PopperPlacementType =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';

export interface PopperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  ref?: React.Ref<HTMLDivElement>;
  /**
   * A HTML element, [referenceObject](https://popper.js.org/docs/v1/#referenceObject),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl?: null | ReferenceObject | (() => ReferenceObject);
  /**
   * Popper render function or node.
   */
  children:
    | React.ReactNode
    | ((props: {
        placement: PopperPlacementType;
        TransitionProps?: {
          in: boolean;
          onEnter: () => {};
          onExited: () => {};
        };
      }) => React.ReactNode);
  /**
   * A HTML element, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: PortalProps['container'];
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: PortalProps['disablePortal'];
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   */
  keepMounted?: boolean;
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v1/#modifiers).
   */
  modifiers?: object;
  /**
   * If `true`, the popper is visible.
   */
  open: boolean;
  /**
   * Popper placement.
   */
  placement?: PopperPlacementType;
  /**
   * Options provided to the [`popper.js`](https://popper.js.org/docs/v1/) instance.
   */
  popperOptions?: object;
  /**
   * A ref that points to the used popper instance.
   */
  popperRef?: React.Ref<PopperJs>;
  /**
   * Help supporting a react-transition-group/Transition component.
   */
  transition?: boolean;
}

/**
 * Poppers rely on the 3rd party library [Popper.js](https://popper.js.org/docs/v1/) for positioning.
 * Demos:
 *
 * - [Autocomplete](https://material-ui.com/components/autocomplete/)
 * - [Menus](https://material-ui.com/components/menus/)
 * - [Popper](https://material-ui.com/components/popper/)
 *
 * API:
 *
 * - [Popper API](https://material-ui.com/api/popper/)
 */
export default function Popper(props: PopperProps): JSX.Element;
