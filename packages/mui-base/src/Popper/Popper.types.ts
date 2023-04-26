import { OverrideProps } from '@mui/types';
import { Instance, Options, OptionsGeneric, VirtualElement } from '@popperjs/core';
import * as React from 'react';
import { PortalProps } from '../Portal';
import { SlotComponentProps } from '../utils';

export type PopperPlacementType = Options['placement'];

export interface PopperRootSlotPropsOverrides {}

export interface PopperTransitionProps {
  in: boolean;
  onEnter: () => void;
  onExited: () => void;
}

export interface PopperChildrenProps {
  placement: PopperPlacementType;
  TransitionProps?: PopperTransitionProps;
}

export interface PopperOwnProps {
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl?: null | VirtualElement | HTMLElement | (() => HTMLElement) | (() => VirtualElement);
  /**
   * Popper render function or node.
   */
  children?: React.ReactNode | ((props: PopperChildrenProps) => React.ReactNode);
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: PortalProps['container'];
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
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'div', PopperRootSlotPropsOverrides, PopperOwnerState>;
  };
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: PopperSlots;
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition?: boolean;
}

export interface PopperSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type PopperOwnerState = PopperOwnProps;

export interface PopperTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & PopperOwnProps;
  defaultComponent: D;
}

export type PopperProps<
  D extends React.ElementType = PopperTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<PopperTypeMap<P, D>, D> & {
  component?: D;
};

export type PopperTooltipOwnProps = Omit<
  PopperOwnProps,
  'container' | 'keepMounted' | 'transition'
> & {
  TransitionProps?: PopperTransitionProps;
};

export interface PopperTooltipTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & PopperTooltipOwnProps;
  defaultComponent: D;
}

export type PopperTooltipProps<
  D extends React.ElementType = PopperTooltipTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<PopperTooltipTypeMap<P, D>, D> & {
  component?: D;
};

export interface PopperRootSlotProps {
  className?: string;
  ref: React.Ref<any>;
  ownerState: PopperOwnerState;
}
