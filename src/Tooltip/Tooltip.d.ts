import * as React from 'react';
import { StyledComponent } from '..';

export type TooltipProps = React.HTMLAttributes<HTMLDivElement> & {
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

declare const Tooltip: StyledComponent<TooltipProps, TooltipClassKey>;

export default Tooltip;
