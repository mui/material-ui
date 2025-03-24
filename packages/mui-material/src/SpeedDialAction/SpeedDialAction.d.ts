import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '..';
import { FabProps } from '../Fab';
import { TooltipProps } from '../Tooltip';
import { SpeedDialActionClasses } from './speedDialActionClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface SpeedDialActionSlots {
  /**
   * The component that renders the fab.
   * @default Fab
   */
  fab?: React.ElementType;
  /**
   * The component that renders the tooltip.
   * @default Tooltip
   */
  tooltip?: React.ElementType;
  /**
   * The component that renders the static tooltip.
   * @default 'span'
   */
  staticTooltip?: React.ElementType;
  /**
   * The component that renders the static tooltip label.
   * @default 'span'
   */
  staticTooltipLabel?: React.ElementType;
}

export interface SpeedDialActionFabSlotPropsOverrides {}
export interface SpeedDialActionTooltipSlotPropsOverrides {}
export interface SpeedDialActionStaticTooltipSlotPropsOverrides {}
export interface SpeedDialActionStaticTooltipLabelSlotPropsOverrides {}

export type SpeedDialActionSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SpeedDialActionSlots,
  {
    /**
     * Props forwarded to the fab slot.
     * By default, the avaible props are based on the [Fab](https://mui.com/material-ui/api/fab/#props) component.
     */
    fab: SlotProps<
      React.ElementType<FabProps>,
      SpeedDialActionFabSlotPropsOverrides,
      SpeedDialActionOwnerState
    >;
    /**
     * Props forwarded to the tooltip slot.
     * By default, the avaible props are based on the [Tooltip](https://mui.com/material-ui/api/tooltip/#props) component.
     */
    tooltip: SlotProps<
      React.ElementType<TooltipProps>,
      SpeedDialActionTooltipSlotPropsOverrides,
      SpeedDialActionOwnerState
    >;
    /**
     * Props forwarded to the static tooltip slot.
     * By default, the avaible props are based on a span element.
     */
    staticTooltip: SlotProps<
      'span',
      SpeedDialActionStaticTooltipSlotPropsOverrides,
      SpeedDialActionOwnerState
    >;
    /**
     * Props forwarded to the static tooltip label slot.
     * By default, the avaible props are based on a span element.
     */
    staticTooltipLabel: SlotProps<
      'span',
      SpeedDialActionStaticTooltipLabelSlotPropsOverrides,
      SpeedDialActionOwnerState
    >;
  }
>;

export interface SpeedDialActionProps
  extends Omit<StandardProps<Partial<TooltipProps>, 'children'>, 'slotProps' | 'slots'>,
    SpeedDialActionSlotsAndSlotProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SpeedDialActionClasses>;
  /**
   * Props applied to the [`Fab`](https://mui.com/material-ui/api/fab/) component.
   * @default {}
   * @deprecated Use `slotProps.fab` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  FabProps?: Partial<FabProps>;
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   * @default 0
   */
  delay?: number;
  /**
   * The icon to display in the SpeedDial Fab.
   */
  icon?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * `classes` prop applied to the [`Tooltip`](https://mui.com/material-ui/api/tooltip/) element.
   * @deprecated Use `slotProps.tooltip.classes` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TooltipClasses?: TooltipProps['classes'];
  /**
   * Placement of the tooltip.
   * @default 'left'
   * @deprecated Use `slotProps.tooltip.placement` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  tooltipPlacement?: TooltipProps['placement'];
  /**
   * Label to display in the tooltip.
   * @deprecated Use `slotProps.tooltip.title` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  tooltipTitle?: React.ReactNode;
  /**
   * Make the tooltip always visible when the SpeedDial is open.
   * @default false
   * @deprecated Use `slotProps.tooltip.open` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  tooltipOpen?: boolean;
}

/**
 *
 * Demos:
 *
 * - [Speed Dial](https://v6.mui.com/material-ui/react-speed-dial/)
 *
 * API:
 *
 * - [SpeedDialAction API](https://v6.mui.com/material-ui/api/speed-dial-action/)
 * - inherits [Tooltip API](https://v6.mui.com/material-ui/api/tooltip/)
 */
export default function SpeedDialAction(props: SpeedDialActionProps): React.JSX.Element;

export interface SpeedDialActionOwnerState
  extends Omit<SpeedDialActionProps, 'slots' | 'slotProps'> {}
