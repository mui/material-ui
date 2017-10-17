import * as React from 'react';
import { StyledComponent, Omit } from '..';

export type TooltipProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
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
