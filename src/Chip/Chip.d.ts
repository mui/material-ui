import * as React from 'react';
import { StyledComponent } from '..';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: React.ReactNode;
  label?: React.ReactNode;
  onKeyDown?: React.EventHandler<React.KeyboardEvent<any>>;
  onRequestDelete?: React.EventHandler<any>;
  tabIndex?: number;
}

export default class Chip extends StyledComponent<ChipProps> {}
