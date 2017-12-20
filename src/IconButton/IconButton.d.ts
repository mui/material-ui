import * as React from 'react';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase';
import { Color, StandardProps } from '../MuiProps';

export interface IconButtonProps extends StandardProps<ButtonBaseProps, IconButtonClassKey> {
  buttonRef?: React.Ref<any>;
  color?: Color | 'contrast';
  disabled?: boolean;
  disableRipple?: boolean;
  rootRef?: React.Ref<any>;
}

export type IconButtonClassKey =
  | ButtonBaseClassKey
  | 'colorAccent'
  | 'colorContrast'
  | 'colorPrimary'
  | 'colorInherit'
  | 'label'
  | 'icon'
  | 'keyboardFocused';

declare const IconButton: React.ComponentType<IconButtonProps>;

export default IconButton;
