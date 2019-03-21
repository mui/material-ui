import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface ChipProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ChipClassKey> {
  avatar?: React.ReactElement;
  clickable?: boolean;
  color?: PropTypes.Color;
  component?: React.ElementType<ChipProps>;
  deleteIcon?: React.ReactElement;
  icon?: React.ReactElement;
  label?: React.ReactNode;
  onDelete?: React.EventHandler<any>;
  variant?: 'default' | 'outlined';
}

export type ChipClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'clickable'
  | 'clickableColorPrimary'
  | 'clickableColorSecondary'
  | 'deletable'
  | 'deletableColorPrimary'
  | 'deletableColorSecondary'
  | 'outlined'
  | 'outlinedPrimary'
  | 'outlinedSecondary'
  | 'avatar'
  | 'avatarColorPrimary'
  | 'avatarColorSecondary'
  | 'avatarChildren'
  | 'icon'
  | 'iconColorPrimary'
  | 'iconColorSecondary'
  | 'label'
  | 'deleteIcon'
  | 'deleteIconColorPrimary'
  | 'deleteIconColorSecondary'
  | 'deleteIconOutlinedColorPrimary'
  | 'deleteIconOutlinedColorSecondary';

declare const Chip: React.ComponentType<ChipProps>;

export default Chip;
