import * as React from 'react';
import { StyledComponent } from '..';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: React.ReactElement<any>;
  label?: React.ReactNode;
  onKeyDown?: React.EventHandler<React.KeyboardEvent<any>>;
  onRequestDelete?: React.EventHandler<any>;
  deleteIcon?: React.ReactElement<any>;
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
