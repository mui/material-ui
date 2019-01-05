import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface LinkProps
  extends StandardProps<
    React.HTMLAttributes<HTMLAnchorElement> & ButtonBaseProps,
    LinkClassKey,
    'component'
  > {
  color?: PropTypes.Color;
  component?: React.ReactType<LinkProps>;
  disabled?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export type LinkClassKey =
  | 'root'
  | 'label'
  | 'primary'
  | 'secondary'
  | 'colorInherit'
  | 'focusVisible'
  | 'disabled'
  | 'sizeSmall'
  | 'sizeLarge';

declare const Link: React.ComponentType<LinkProps>;

export default Link;
