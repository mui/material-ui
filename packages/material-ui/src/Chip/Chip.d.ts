import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface ChipProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ChipClassKey> {
  color?: PropTypes.Color;
  avatar?: React.ReactElement<any>;
  clickable?: boolean;
  component?: React.ReactType<ChipProps>;
  deleteIcon?: React.ReactElement<any>;
  label?: React.ReactNode;
  onDelete?: React.EventHandler<any>;
  onKeyDown?: React.EventHandler<React.KeyboardEvent<any>>;
}

export type ChipClassKey =
  | 'root'
  | 'clickable'
  | 'clickablePrimary'
  | 'clickableSecondary'
  | 'deletable'
  | 'deletablePrimary'
  | 'deletableSecondary'
  | 'avatar'
  | 'avatarPrimary'
  | 'avatarSecondary'
  | 'avatarChildren'
  | 'label'
  | 'deleteIcon'
  | 'deleteIconPrimary'
  | 'deleteIconSecondary';

declare const Chip: React.ComponentType<ChipProps>;

export default Chip;
