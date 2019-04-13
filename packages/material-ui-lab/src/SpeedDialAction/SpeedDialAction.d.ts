import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { TooltipProps } from '@material-ui/core/Tooltip';

export interface SpeedDialActionProps
  extends StandardProps<Partial<TooltipProps>, SpeedDialActionClassKey, never, false> {
  ButtonProps?: Partial<ButtonProps>;
  delay?: number;
  icon: React.ReactNode;
  TooltipClasses?: TooltipProps['classes'];
  tooltipPlacement?: TooltipProps['placement'];
  tooltipTitle?: React.ReactNode;
  tooltipOpen?: boolean;
}

export type SpeedDialActionClassKey = 'root' | 'button' | 'buttonClosed';

declare const SpeedDialAction: React.ComponentType<SpeedDialActionProps>;

export default SpeedDialAction;
