import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase';

export interface IconButtonProps extends StandardProps<ButtonBaseProps, IconButtonClassKey> {
  color?: PropTypes.Color;
  disabled?: boolean;
  disableRipple?: boolean;
}

export type IconButtonClassKey =
  | ButtonBaseClassKey
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorInherit'
  | 'label';

declare const IconButton: React.ComponentType<IconButtonProps>;

export default IconButton;
