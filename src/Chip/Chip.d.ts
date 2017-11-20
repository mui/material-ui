import * as React from 'react';
import { StandardProps } from '..';

export interface ChipProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  ChipClassKey
> {
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

declare const Chip: React.ComponentType<ChipProps>;

export default Chip;
