import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ExtendButtonBase } from '../ButtonBase';
import { OverridableComponent, SimplifiedPropsOf, OverrideProps } from '../OverridableComponent';

declare const IconButton: ExtendButtonBase<{
  props: {
    align?: 'left' | 'right';
    color?: PropTypes.Color;
    disabled?: boolean;
    disableRipple?: boolean;
    size?: 'small' | 'medium';
  };
  defaultComponent: 'button';
  classKey: IconButtonClassKey;
}>;

export type IconButtonClassKey =
  | 'root'
  | 'alignLeft'
  | 'alignRight'
  | 'colorInherit'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'disabled'
  | 'sizeSmall'
  | 'label';

export type IconButtonProps = SimplifiedPropsOf<typeof IconButton>;

export default IconButton;
