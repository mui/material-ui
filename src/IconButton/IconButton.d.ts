import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase';

export interface IconButtonProps extends StandardProps<ButtonBaseProps, IconButtonClassKey> {
  buttonRef?: React.Ref<any>;
  color?: PropTypes.Color;
  disabled?: boolean;
  disableRipple?: boolean;
  rootRef?: React.Ref<any>;
}

export type IconButtonClassKey =
  | ButtonBaseClassKey
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorInherit'
  | 'label'
  | 'icon';

declare const IconButton: React.ComponentType<IconButtonProps>;

export default IconButton;
