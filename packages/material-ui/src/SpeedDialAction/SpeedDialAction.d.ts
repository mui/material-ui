import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '..';
import { FabProps } from '../Fab';
import { TooltipProps } from '../Tooltip';
import { SpeedDialActionClasses } from './speedDialActionClasses';

export interface SpeedDialActionProps extends StandardProps<Partial<TooltipProps>, 'children'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SpeedDialActionClasses>;
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
   * The icon to display in the SpeedDial Fab.
   */
  icon?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
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
