import * as React from 'react';
import { OverridableComponent, OverrideProps } from '@mui/types';
import { Instance, VirtualElement, Options, OptionsGeneric } from '@popperjs/core';
import { PortalProps } from '../Portal';
import { SlotComponentProps } from '../utils';

export type PopperPlacementType = Options['placement'];

interface PopperUnstyledComponentsPropsOverrides {}

export interface PopperUnstyledOwnProps {
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl?: null | VirtualElement | (() => VirtualElement);
  /**
   * Popper render function or node.
   */
  children?:
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
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: PortalProps['container'];
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps?: {
    root?: SlotComponentProps<
      'div',
      PopperUnstyledComponentsPropsOverrides,
      PopperUnstyledOwnerState
    >;
  };
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction?: 'ltr' | 'rtl';
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: PortalProps['disablePortal'];
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted?: boolean;
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers?: Options['modifiers'];
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement?: PopperPlacementType;
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions?: Partial<OptionsGeneric<any>>;
  /**
   * A ref that points to the used popper instance.
   */
  popperRef?: React.Ref<Instance>;
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition?: boolean;
}

export interface PopperUnstyledOwnerState extends PopperUnstyledOwnProps {}

export interface PopperUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & PopperUnstyledOwnProps;
  defaultComponent: D;
}

export type PopperUnstyledProps<
  D extends React.ElementType = PopperUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<PopperUnstyledTypeMap<P, D>, D> & {
  component?: D;
};

export interface PopperUnstyledRootSlotProps {
  className?: string;
  ref: React.Ref<any>;
  ownerState: PopperUnstyledOwnerState;
}
/**
 * Poppers rely on the 3rd party library [Popper.js](https://popper.js.org/docs/v2/) for positioning.
 *
 * Demos:
 *
 * - [Popper](https://mui.com/base/react-popper/)
 *
 * API:
 *
 * - [PopperUnstyled API](https://mui.com/base/api/popper-unstyled/)
 */
declare const PopperUnstyled: OverridableComponent<PopperUnstyledTypeMap>;

export default PopperUnstyled;
