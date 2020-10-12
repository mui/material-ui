import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { FabProps } from '../Fab';
import { TooltipProps } from '../Tooltip';

export interface SpeedDialActionProps extends StandardProps<Partial<TooltipProps>, 'children'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    fab?: string;
    fabClosed?: string;
    staticTooltip?: string;
    staticTooltipClosed?: string;
    staticTooltipLabel?: string;
    tooltipPlacementLeft?: string;
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
