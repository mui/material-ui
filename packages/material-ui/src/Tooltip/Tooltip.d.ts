import * as React from 'react';
import { StandardProps } from '..';
import { TransitionProps } from '../transitions/transition';

export interface TooltipProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, TooltipClassKey, 'title', false> {
  children: React.ReactElement;
  disableFocusListener?: boolean;
  disableHoverListener?: boolean;
  disableTouchListener?: boolean;
  enterDelay?: number;
  enterTouchDelay?: number;
  id?: string;
  interactive?: boolean;
  leaveDelay?: number;
  leaveTouchDelay?: number;
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
  PopperProps?: object;
  title: React.ReactNode;
  TransitionComponent?: React.ComponentType<TransitionProps>;
  TransitionProps?: TransitionProps;
}

export type TooltipClassKey =
  | 'popper'
  | 'popperInteractive'
  | 'tooltip'
  | 'touch'
  | 'tooltipPlacementLeft'
  | 'tooltipPlacementRight'
  | 'tooltipPlacementTop'
  | 'tooltipPlacementBottom';

declare const Tooltip: React.ComponentType<TooltipProps>;

export default Tooltip;
