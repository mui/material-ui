import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface IconButtonProps extends StandardProps<ButtonBaseProps, IconButtonClassKey> {
  color?: PropTypes.Color;
  disabled?: boolean;
  disableRipple?: boolean;
  size?: 'small' | 'medium';
}

export type IconButtonClassKey =
  | 'root'
  | 'colorInherit'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'disabled'
  | 'sizeSmall'
  | 'label';

declare const IconButton: React.ComponentType<IconButtonProps>;

export default IconButton;
