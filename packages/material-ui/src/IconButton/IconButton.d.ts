import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface IconButtonProps<C = {}>
  extends StandardProps<ButtonBaseProps<C>, IconButtonClassKey> {
  color?: PropTypes.Color;
  disabled?: boolean;
  disableRipple?: boolean;
}

export type IconButtonClassKey =
  | 'root'
  | 'colorInherit'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'disabled'
  | 'label';

declare class IconButton<C> extends React.Component<C & IconButtonProps<C>> {}

export default IconButton;
