import * as React from 'react';
import { StyledComponent, PropTypes } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface IconButtonProps extends ButtonBaseProps {
  color?: PropTypes.Color | 'contrast';
  disabled?: boolean;
  disableRipple?: boolean;
  rootRef?: React.Ref<any>;
}

export type IconButtonClassKey =
  | 'root'
  | 'colorAccent'
  | 'colorContrast'
  | 'colorPrimary'
  | 'colorInherit'
  | 'disabled'
  | 'label'
  | 'icon'
  | 'keyboardFocused'
  ;

declare const IconButton: StyledComponent<IconButtonProps, IconButtonClassKey>;

export default IconButton;
