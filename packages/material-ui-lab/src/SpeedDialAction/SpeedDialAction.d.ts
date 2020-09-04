import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@material-ui/core';
import { FabProps } from '@material-ui/core/Fab';
import { TooltipProps } from '@material-ui/core/Tooltip';

export interface SpeedDialActionProps extends StandardProps<Partial<TooltipProps>, 'children'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the Fab component. */
    fab?: string;
    /** Styles applied to the Fab component if `open={false}`. */
    fabClosed?: string;
    /** Styles applied to the root element if `tooltipOpen={true}`. */
    staticTooltip?: string;
    /** Styles applied to the root element if `tooltipOpen={true}` and `open={false}`. */
    staticTooltipClosed?: string;
    /** Styles applied to the static tooltip label if `tooltipOpen={true}`. */
    staticTooltipLabel?: string;
    /** Styles applied to the root if `tooltipOpen={true}` and `tooltipPlacement="left"`` */
    tooltipPlacementLeft?: string;
    /** Styles applied to the root if `tooltipOpen={true}` and `tooltipPlacement="right"`` */
    tooltipPlacementRight?: string;
  };
  /**
   * Props applied to the [`Fab`](/api/fab/) component.
   * @default {}
   */
  FabProps?: Partial<FabProps>;
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   * @default 0
   */
  delay?: number;
  /**
   * The Icon to display in the SpeedDial Fab.
   */
  icon?: React.ReactNode;
  /**
   * `classes` prop applied to the [`Tooltip`](/api/tooltip/) element.
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

export type SpeedDialActionClassKey = keyof NonNullable<SpeedDialActionProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Speed Dial](https://material-ui.com/components/speed-dial/)
 *
 * API:
 *
 * - [SpeedDialAction API](https://material-ui.com/api/speed-dial-action/)
 * - inherits [Tooltip API](https://material-ui.com/api/tooltip/)
 */
export default function SpeedDialAction(props: SpeedDialActionProps): JSX.Element;
