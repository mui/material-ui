import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ChipTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    avatar?: React.ReactElement;
    clickable?: boolean;
    color?: PropTypes.Color;
    deleteIcon?: React.ReactElement;
    disabled?: boolean;
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
  | 'disabled'
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

export type ChipProps<
  D extends React.ElementType = ChipTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ChipTypeMap<P, D>, D>;

export default Chip;
