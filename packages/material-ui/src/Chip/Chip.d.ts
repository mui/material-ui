import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const Chip: OverridableComponent<{
  props: {
    avatar?: React.ReactElement;
    clickable?: boolean;
    color?: PropTypes.Color;
    deleteIcon?: React.ReactElement;
    icon?: React.ReactElement;
    label?: React.ReactNode;
    onDelete?: React.EventHandler<any>;
    size?: 'small' | 'medium';
    variant?: 'default' | 'outlined';
  };
  defaultComponent: 'div';
  classKey: ChipClassKey;
}>;

export type ChipClassKey =
  | 'root'
  | 'sizeSmall'
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
  | 'avatarSmall'
  | 'avatarColorPrimary'
  | 'avatarColorSecondary'
  | 'avatarChildren'
  | 'icon'
  | 'iconSmall'
  | 'iconColorPrimary'
  | 'iconColorSecondary'
  | 'label'
  | 'labelSmall'
  | 'deleteIcon'
  | 'deleteIconSmall'
  | 'deleteIconColorPrimary'
  | 'deleteIconColorSecondary'
  | 'deleteIconOutlinedColorPrimary'
  | 'deleteIconOutlinedColorSecondary';

export type ChipProps = SimplifiedPropsOf<typeof Chip>;

export default Chip;
