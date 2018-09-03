import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { TooltipProps } from '@material-ui/core/Tooltip';

export interface SpeedDialActionProps
  extends StandardProps<ButtonProps & Partial<TooltipProps>, SpeedDialActionClassKey> {
  ButtonProps?: Partial<ButtonProps>;
  delay?: number;
  icon: React.ReactNode;
  tooltipPlacement?:
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
  tooltipTitle?: React.ReactNode;
}

export type SpeedDialActionClassKey = 'root' | 'button' | 'buttonClosed';

declare const SpeedDialAction: React.ComponentType<SpeedDialActionProps>;

export default SpeedDialAction;
