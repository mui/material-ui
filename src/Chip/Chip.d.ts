import * as React from 'react';
import { StyledComponent } from '..';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: React.ReactNode;
  label?: React.ReactNode;
  onKeyDown?: React.EventHandler<React.KeyboardEvent<any>>;
  onRequestDelete?: React.EventHandler<any>;
}

export type ChipClassKey =
  | 'root'
  | 'clickable'
  | 'deletable'
  | 'avatar'
  | 'avatarChildren'
  | 'label'
  | 'deleteIcon'
  ;

declare const Chip: StyledComponent<ChipProps, ChipClassKey>;

export default Chip;
