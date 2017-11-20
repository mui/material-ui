import * as React from 'react';
import { StandardProps } from '..';

export interface TooltipProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  TooltipClassKey,
  'title'
> {
  disableTriggerFocus?: boolean;
  disableTriggerHover?: boolean;
  disableTriggerTouch?: boolean;
  id?: string;
  onRequestClose?: (event: React.ChangeEvent<{}>) => void;
  onRequestOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
  title: React.ReactNode;
  enterDelay?: number;
  leaveDelay?: number;
  placement?:
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
  PopperProps?: object;
}

export type TooltipClassKey =
  | 'root'
  | 'popper'
  | 'popperClose'
  | 'tooltip'
  | 'tooltipLeft'
  | 'tooltipRight'
  | 'tooltipTop'
  | 'tooltipBottom'
  | 'tooltipOpen'
  ;

declare const Tooltip: React.ComponentType<TooltipProps>;

export default Tooltip;
