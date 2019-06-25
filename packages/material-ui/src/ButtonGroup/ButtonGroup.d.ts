import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const ButtonGroup: OverridableComponent<{
  props: {
    color?: PropTypes.Color;
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    fullWidth?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: 'outlined' | 'contained';
  };
  defaultComponent: 'div';
  classKey: ButtonGroupClassKey;
}>;

export type ButtonGroupClassKey =
  | 'root'
  | 'contained'
  | 'fullWidth'
  | 'grouped'
  | 'groupedOutlined'
  | 'groupedOutlinedPrimary'
  | 'groupedOutlinedSecondary'
  | 'groupedContained'
  | 'groupedContainedPrimary'
  | 'groupedContainedSecondary';

export type ButtonGroupProps = SimplifiedPropsOf<typeof ButtonGroup>;

export default ButtonGroup;
