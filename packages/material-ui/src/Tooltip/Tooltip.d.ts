import * as React from 'react';
import { StandardProps } from '..';
import { TransitionProps } from '../transitions/transition';
import { PopperProps } from '../Popper/Popper';

export interface TooltipProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, TooltipClassKey, 'title'> {
  arrow?: boolean;
  children: React.ReactElement;
  disableFocusListener?: boolean;
  disableHoverListener?: boolean;
  disableTouchListener?: boolean;
  enterDelay?: number;
  enterNextDelay?: number;
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
  PopperProps?: Partial<PopperProps>;
  title: React.ReactNode;
  TransitionComponent?: React.ComponentType<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
  TransitionProps?: TransitionProps;
}

export type TooltipClassKey =
  | 'popper'
  | 'popperInteractive'
  | 'popperArrow'
  | 'tooltip'
  | 'tooltipArrow'
  | 'arrow'
  | 'touch'
  | 'tooltipPlacementLeft'
  | 'tooltipPlacementRight'
  | 'tooltipPlacementTop'
  | 'tooltipPlacementBottom';

/**
 *
 * Demos:
 *
 * - [Tooltips](https://material-ui.com/components/tooltips/)
 *
 * API:
 *
 * - [Tooltip API](https://material-ui.com/api/tooltip/)
 */
declare const Tooltip: React.ComponentType<TooltipProps>;

export default Tooltip;
