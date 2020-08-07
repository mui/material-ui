import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { FabProps } from '@material-ui/core/Fab';
import { TooltipProps } from '@material-ui/core/Tooltip';

export interface SpeedDialActionProps
  extends StandardProps<Partial<TooltipProps>, SpeedDialActionClassKey, 'children'> {
  /**
   * Props applied to the [`Fab`](/api/fab/) component.
   */
  FabProps?: Partial<FabProps>;
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
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
   */
  tooltipPlacement?: TooltipProps['placement'];
  /**
   * Label to display in the tooltip.
   */
  tooltipTitle?: React.ReactNode;
  /**
   * Make the tooltip always visible when the SpeedDial is open.
   */
  tooltipOpen?: boolean;
}

export type SpeedDialActionClassKey =
  | 'fab'
  | 'fabClosed'
  | 'staticTooltip'
  | 'staticTooltipClosed'
  | 'staticTooltipLabel'
  | 'tooltipPlacementLeft';

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
