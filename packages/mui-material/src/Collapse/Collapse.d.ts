import * as React from 'react';
import { SxProps } from '@mui/system';
import { TransitionStatus } from 'react-transition-group';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { TransitionProps } from '../transitions/transition';
import { CollapseClasses } from './collapseClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface CollapseSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
  /**
   * The component that renders the wrapper.
   * @default 'div'
   */
  wrapper?: React.ElementType | undefined;
  /**
   * The component that renders the inner wrapper.
   * @default 'div'
   */
  wrapperInner?: React.ElementType | undefined;
}

export interface CollapseRootSlotPropsOverrides {}

export interface CollapseWrapperSlotPropsOverrides {}

export interface CollapseWrapperInnerSlotPropsOverrides {}

export type CollapseSlotsAndSlotProps = CreateSlotsAndSlotProps<
  CollapseSlots,
  {
    root: SlotProps<'div', CollapseRootSlotPropsOverrides, CollapseOwnerState>;
    wrapper: SlotProps<'div', CollapseWrapperSlotPropsOverrides, CollapseOwnerState>;
    wrapperInner: SlotProps<'div', CollapseWrapperInnerSlotPropsOverrides, CollapseOwnerState>;
  }
>;

export interface CollapseProps
  extends StandardProps<TransitionProps, 'timeout'>, CollapseSlotsAndSlotProps {
  /**
   * The content node to be collapsed.
   */
  children?: React.ReactNode;
  className?: string | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CollapseClasses> | undefined;
  /**
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize?: string | number | undefined;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<TransitionProps> | undefined;
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing?: TransitionProps['easing'] | undefined;
  /**
   * If `true`, the component will transition in.
   */
  in?: boolean | undefined;
  /**
   * The transition orientation.
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical' | undefined;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout?: TransitionProps['timeout'] | 'auto' | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface CollapseOwnerState extends CollapseProps {
  state: TransitionStatus;
}

/**
 * The Collapse transition is used by the
 * [Vertical Stepper](https://next.mui.com/material-ui/react-stepper/#vertical-stepper) StepContent component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * Demos:
 *
 * - [Card](https://next.mui.com/material-ui/react-card/)
 * - [Lists](https://next.mui.com/material-ui/react-list/)
 * - [Transitions](https://next.mui.com/material-ui/transitions/)
 *
 * API:
 *
 * - [Collapse API](https://next.mui.com/material-ui/api/collapse/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition/#Transition-props)
 */

export default function Collapse(props: CollapseProps): React.JSX.Element;
