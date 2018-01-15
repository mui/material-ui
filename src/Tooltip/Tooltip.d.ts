import * as React from 'react';
import { IPopperProps } from 'react-popper';
import { StandardProps } from '..';

export interface TooltipProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, TooltipClassKey, 'title'> {
  children: React.ReactElement<any>;
  disableTriggerFocus?: boolean;
  disableTriggerHover?: boolean;
  disableTriggerTouch?: boolean;
  enterDelay?: number;
  id?: string;
  leaveDelay?: number;
  onClose?: (event: React.ChangeEvent<{}>) => void;
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
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
  PopperProps?: Partial<PopperProps>;
  title: React.ReactNode;
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
  | 'tooltipOpen';

interface PopperProps extends IPopperProps {
  PopperClassName: string;
}

declare const Tooltip: React.ComponentType<TooltipProps>;

export default Tooltip;
