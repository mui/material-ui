import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ButtonGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    color?: PropTypes.Color;
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    fullWidth?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: 'text' | 'outlined' | 'contained';
  };
  defaultComponent: D;
  classKey: ButtonGroupClassKey;
}

declare const ButtonGroup: OverridableComponent<ButtonGroupTypeMap>;

export type ButtonGroupClassKey =
  | 'root'
  | 'contained'
  | 'fullWidth'
  | 'grouped'
  | 'groupedText'
  | 'groupedTextPrimary'
  | 'groupedTextSecondary'
  | 'groupedOutlined'
  | 'groupedOutlinedPrimary'
  | 'groupedOutlinedSecondary'
  | 'groupedContained'
  | 'groupedContainedPrimary'
  | 'groupedContainedSecondary';

export type ButtonGroupProps<
  D extends React.ElementType = ButtonGroupTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonGroupTypeMap<P, D>, D>;

export default ButtonGroup;
