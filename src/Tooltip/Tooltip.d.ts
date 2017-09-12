import * as React from 'react';
import { StyledComponent } from '..';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.Node;
  onRequestClose?: (event: React.ChangeEvent<{}>) => void;
  onRequestOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean,
  place?:
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
}

export default class Tooltip extends StyledComponent<TooltipProps> {}
