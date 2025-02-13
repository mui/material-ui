import * as React from 'react';
import { PopperProps } from '@mui/base';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type TooltipSlot = 'root' | 'arrow';

export interface TooltipSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the arrow.
   * @default 'span'
   */
  arrow?: React.ElementType;
}

export interface TooltipPropsVariantOverrides {}
export interface TooltipPropsColorOverrides {}
export interface TooltipPropsSizeOverrides {}

export type TooltipSlotsAndSlotProps = CreateSlotsAndSlotProps<
  TooltipSlots,
  {
    root: SlotProps<
      'div',
      { component?: React.ElementType; sx?: SxProps } & Omit<PopperProps, 'direction'>,
      TooltipOwnerState
    >;
    arrow: SlotProps<'span', {}, TooltipOwnerState>;
  }
>;

export interface TooltipTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    TooltipSlotsAndSlotProps &
    Pick<PopperProps, 'disablePortal' | 'direction' | 'keepMounted' | 'modifiers'> & {
      /**
       * If `true`, adds an arrow to the tooltip.
       * @default false
       */
      arrow?: boolean;
      /**
       * Tooltip reference element.
       */
      children: React.ReactElement<any>;
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, TooltipPropsColorOverrides>;
      /**
       * Set to `true` if the `title` acts as an accessible description.
       * By default the `title` acts as an accessible label for the child.
       * @default false
       */
      describeChild?: boolean;
      /**
       * Do not respond to focus-visible events.
       * @default false
       */
      disableFocusListener?: boolean;
      /**
       * Do not respond to hover events.
       * @default false
       */
      disableHoverListener?: boolean;
      /**
       * Makes a tooltip not interactive, i.e. it will close when the user
       * hovers over the tooltip before the `leaveDelay` is expired.
       * @default false
       */
      disableInteractive?: boolean;
      /**
       * Do not respond to long press touch events.
       * @default false
       */
      disableTouchListener?: boolean;
      /**
       * The number of milliseconds to wait before showing the tooltip.
       * This prop won't impact the enter touch delay (`enterTouchDelay`).
       * @default 100
       */
      enterDelay?: number;
      /**
       * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
       * @default 0
       */
      enterNextDelay?: number;
      /**
       * The number of milliseconds a user must touch the element before showing the tooltip.
       * @default 700
       */
      enterTouchDelay?: number;
      /**
       * If `true`, the tooltip follow the cursor over the wrapped element.
       * @default false
       */
      followCursor?: boolean;
      /**
       * This prop is used to help implement the accessibility logic.
       * If you don't provide this prop. It falls back to a randomly generated id.
       */
      id?: string;
      /**
       * The number of milliseconds to wait before hiding the tooltip.
       * This prop won't impact the leave touch delay (`leaveTouchDelay`).
       * @default 0
       */
      leaveDelay?: number;
      /**
       * The number of milliseconds after the user stops touching an element before hiding the tooltip.
       * @default 1500
       */
      leaveTouchDelay?: number;
      /**
       * Callback fired when the component requests to be closed.
       *
       * @param {React.SyntheticEvent} event The event source of the callback.
       */
      onClose?: (event: React.SyntheticEvent | Event) => void;
      /**
       * Callback fired when the component requests to be open.
       *
       * @param {React.SyntheticEvent} event The event source of the callback.
       */
      onOpen?: (event: React.SyntheticEvent) => void;
      /**
       * If `true`, the component is shown.
       */
      open?: boolean;
      /**
       * Tooltip placement.
       * @default 'bottom'
       */
      placement?:
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
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', TooltipPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
       */
      title: React.ReactNode;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'solid'
       */
      variant?: OverridableStringUnion<VariantProp, TooltipPropsVariantOverrides>;
    };
  defaultComponent: D;
}

export type TooltipProps<
  D extends React.ElementType = TooltipTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<TooltipTypeMap<P, D>, D>;

export interface TooltipOwnerState extends ApplyColorInversion<TooltipProps> {
  touch: boolean;
}
