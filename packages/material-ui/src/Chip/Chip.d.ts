import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ChipTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
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
  defaultComponent: D;
  classKey: ChipClassKey;
}

declare const Chip: OverridableComponent<ChipTypeMap>;

export type ChipClassKey =
  | 'root'
  | 'sizeSmall'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorError'
  | 'clickable'
  | 'clickableColorPrimary'
  | 'clickableColorSecondary'
  | 'clickableColorError'
  | 'deletable'
  | 'deletableColorPrimary'
  | 'deletableColorSecondary'
  | 'deletableColorError'
  | 'outlined'
  | 'outlinedPrimary'
  | 'outlinedSecondary'
  | 'outlinedError'
  | 'avatar'
  | 'avatarSmall'
  | 'avatarColorPrimary'
  | 'avatarColorSecondary'
  | 'avatarColorError'
  | 'avatarChildren'
  | 'icon'
  | 'iconSmall'
  | 'iconColorPrimary'
  | 'iconColorSecondary'
  | 'iconColorError'
  | 'label'
  | 'labelSmall'
  | 'deleteIcon'
  | 'deleteIconSmall'
  | 'deleteIconColorPrimary'
  | 'deleteIconColorSecondary'
  | 'deleteIconColorError'
  | 'deleteIconOutlinedColorPrimary'
  | 'deleteIconOutlinedColorSecondary'
  | 'deleteIconOutlinedColorError';

export type ChipProps<
  D extends React.ElementType = ChipTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ChipTypeMap<P, D>, D>;

export default Chip;
