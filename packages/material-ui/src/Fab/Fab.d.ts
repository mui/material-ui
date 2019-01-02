import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface FabProps extends StandardProps<ButtonBaseProps, FabClassKey, 'component'> {
  color?: PropTypes.Color;
  component?: React.ReactType<FabProps>;
  disabled?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  type?: string;
  variant?: 'round' | 'extended';
}

export type FabClassKey =
  | 'root'
  | 'label'
  | 'primary'
  | 'secondary'
  | 'extended'
  | 'focusVisible'
  | 'disabled'
  | 'colorInherit'
  | 'sizeSmall'
  | 'sizeMedium';

declare const Fab: React.ComponentType<FabProps>;

export default Fab;
