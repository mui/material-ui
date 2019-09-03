import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { TooltipProps } from '@material-ui/core/Tooltip';

export interface SpeedDialActionProps
  extends StandardProps<Partial<TooltipProps>, SpeedDialActionClassKey, 'children'> {
  /**
   * Props applied to the [`Button`](/api/button/) component.
   */
  ButtonProps?: Partial<ButtonProps>;
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   */
  delay?: number;
  /**
   * The Icon to display in the SpeedDial Floating Action Button.
   */
  icon?: React.ReactNode;
  /**
   * Classes applied to the [`Tooltip`](/api/tooltip/) element.
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

export type SpeedDialActionClassKey = 'root' | 'button' | 'buttonClosed';

export default function SpeedDialAction(props: SpeedDialActionProps): JSX.Element;
