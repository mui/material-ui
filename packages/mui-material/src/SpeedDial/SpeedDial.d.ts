import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { FabProps } from '../Fab';
import { TransitionProps } from '../transitions';
import { SpeedDialClasses } from './speedDialClasses';
import { CreateSlotsAndSlotProps, SlotComponentProps } from '../utils/types';

export type CloseReason = 'toggle' | 'blur' | 'mouseLeave' | 'escapeKeyDown';
export type OpenReason = 'toggle' | 'focus' | 'mouseEnter';

export interface SpeedDialSlots {
  /**
   * The component that renders the root slot.
   * @default 'div'
   */
  root: React.ElementType;
  /**
   * The component that renders the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Zoom
   */
  transition: React.ElementType;
}

export type SpeedDialSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SpeedDialSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on div element.
     */
    root: SlotComponentProps<'div', React.HTMLAttributes<HTMLDivElement>, SpeedDialOwnerState>;
    /**
     * Props forwarded to the transition slot.
     * By default, the avaible props are based on the [Zoom](https://mui.com/material-ui/api/zoom/#props) component.
     */
    transition: SlotComponentProps<React.ElementType, TransitionProps, SpeedDialOwnerState>;
  }
>;

export interface SpeedDialProps
  extends Omit<
      StandardProps<React.HTMLAttributes<HTMLDivElement>, 'children'>,
      'slots' | 'slotProps'
    >,
    SpeedDialSlotsAndSlotProps {
  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SpeedDialClasses>;
  /**
   * The aria-label of the button element.
   * Also used to provide the `id` for the `SpeedDial` element and its children.
   */
  ariaLabel: string;
  /**
   * The direction the actions open relative to the floating action button.
   * @default 'up'
   */
  direction?: 'up' | 'down' | 'left' | 'right';
  /**
   * If `true`, the SpeedDial is hidden.
   * @default false
   */
  hidden?: boolean;
  /**
   * Props applied to the [`Fab`](https://mui.com/material-ui/api/fab/) element.
   * @default {}
   */
  FabProps?: Partial<FabProps>;
  /**
   * The icon to display in the SpeedDial Fab. The `SpeedDialIcon` component
   * provides a default Icon with animation.
   */
  icon?: React.ReactNode;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"blur"`, `"mouseLeave"`, `"escapeKeyDown"`.
   */
  onClose?: (event: React.SyntheticEvent<{}>, reason: CloseReason) => void;
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"focus"`, `"mouseEnter"`.
   */
  onOpen?: (event: React.SyntheticEvent<{}>, reason: OpenReason) => void;
  /**
   * If `true`, the component is shown.
   */
  open?: boolean;
  /**
   * The icon to display in the SpeedDial Fab when the SpeedDial is open.
   */
  openIcon?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The component used for the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Zoom
   * * @deprecated Use `slots.transition` instead. This prop will be removed in a future major release. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  TransitionComponent?: React.JSXElementConstructor<TransitionProps>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration?: TransitionProps['timeout'];
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @deprecated Use `slotProps.transition` instead. This prop will be removed in a future major release. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  TransitionProps?: TransitionProps;
}

export interface SpeedDialOwnerState extends SpeedDialProps {}

/**
 *
 * Demos:
 *
 * - [Speed Dial](https://mui.com/material-ui/react-speed-dial/)
 *
 * API:
 *
 * - [SpeedDial API](https://mui.com/material-ui/api/speed-dial/)
 */
export default function SpeedDial(props: SpeedDialProps): React.JSX.Element;
