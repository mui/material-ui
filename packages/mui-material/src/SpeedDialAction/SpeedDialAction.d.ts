import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { FabProps, FabTypeMap } from '../Fab';
import { TooltipProps } from '../Tooltip';
import { SpeedDialActionClasses } from './speedDialActionClasses';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils';
import { SpeedDialProps } from '../SpeedDial/SpeedDial';

export interface SpeedDialActionSlots {
  /**
   * The component that renders the root component.
   * @default Fab
   */
  root?: React.ElementType;
  /**
   * The component that renders the tooltip.
   * @default Tooltip
   */
  tooltip?: React.ElementType;
}

export type SpeedDialActionSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SpeedDialActionSlots,
  {
    root: SlotProps<React.ElementType<FabProps>, {}, SpeedDialActionOwnerState>;
    tooltip: SlotProps<React.ElementType<TooltipProps>, {}, SpeedDialActionOwnerState>;
  }
>;

export interface SpeedDialActionOwnProps
  extends Partial<Omit<FabProps, 'children'>>,
    SpeedDialActionSlotsAndSlotProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SpeedDialActionClasses>;
  /**
   * Props applied to the [`Fab`](/material-ui/api/fab/) component.
   * @default {}
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
   * If `true`, the component is shown.
   */
  open?: SpeedDialProps['open'];
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * `classes` prop applied to the [`Tooltip`](/material-ui/api/tooltip/) element.
   */
  TooltipClasses?: TooltipProps['classes'];
  /**
   * Placement of the tooltip.
   * @default 'left'
   */
  tooltipPlacement?: TooltipProps['placement'];
  /**
   * Label to display in the tooltip.
   */
  tooltipTitle?: React.ReactNode;
  /**
   * Make the tooltip always visible when the SpeedDial is open.
   * @default false
   */
  tooltipOpen?: boolean;
}

export interface SpeedDialActionTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = FabTypeMap['defaultComponent'],
> {
  props: AdditionalProps & SpeedDialActionOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Speed Dial](https://next.mui.com/material-ui/react-speed-dial/)
 *
 * API:
 *
 * - [SpeedDialAction API](https://next.mui.com/material-ui/api/speed-dial-action/)
 * - inherits [Fab API](https://next.mui.com/material-ui/api/fab/)
 */
declare const SpeedDialAction: OverridableComponent<SpeedDialActionTypeMap>;

export type SpeedDialActionProps<
  RootComponent extends React.ElementType = SpeedDialActionTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<SpeedDialActionTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export interface SpeedDialActionOwnerState extends SpeedDialActionProps {}

export default SpeedDialAction;
