import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase';

export interface IconButtonProps extends StandardProps<
  ButtonBaseProps,
  IconButtonClassKey
> {
  color?: PropTypes.Color | 'contrast';
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
  | 'keyboardFocused'
  ;

declare const IconButton: React.ComponentType<IconButtonProps>;

export default IconButton;
