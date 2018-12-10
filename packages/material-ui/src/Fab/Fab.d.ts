import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ButtonBaseProps, ButtonBaseTypeMap } from '../ButtonBase';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const Fab: OverridableComponent<{
  outerProps: ButtonBaseTypeMap['outerProps'] & {
    color?: PropTypes.Color;
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    href?: string;
    size?: 'small' | 'medium' | 'large';
    type?: string;
    variant?: 'round' | 'extended';
  };
  defaultComponent: 'button';
  classKey: FabClassKey;
}>;

export type FabProps = SimplifiedPropsOf<typeof Fab>;

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

export default Fab;
