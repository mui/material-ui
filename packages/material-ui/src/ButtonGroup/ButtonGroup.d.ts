import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ButtonGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    color?: PropTypes.Color;
    disabled?: boolean;
    disableElevation?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    fullWidth?: boolean;
    orientation?: 'vertical' | 'horizontal';
    size?: 'small' | 'medium' | 'large';
    variant?: 'text' | 'outlined' | 'contained';
  };
  defaultComponent: D;
  classKey: ButtonGroupClassKey;
}

/**
 *
 * Demos:
 *
 * - [Button Group](https://material-ui.com/components/button-group/)
 *
 * API:
 *
 * - [ButtonGroup API](https://material-ui.com/api/button-group/)
 */
declare const ButtonGroup: OverridableComponent<ButtonGroupTypeMap>;

export type ButtonGroupClassKey =
  | 'root'
  | 'contained'
  | 'disabled'
  | 'disableElevation'
  | 'fullWidth'
  | 'vertical'
  | 'grouped'
  | 'groupedHorizontal'
  | 'groupedVertical'
  | 'groupedText'
  | 'groupedTextHorizontal'
  | 'groupedTextVertical'
  | 'groupedTextPrimary'
  | 'groupedTextSecondary'
  | 'groupedOutlined'
  | 'groupedOutlinedHorizontal'
  | 'groupedOutlinedVertical'
  | 'groupedOutlinedPrimary'
  | 'groupedOutlinedSecondary'
  | 'groupedContained'
  | 'groupedContainedHorizontal'
  | 'groupedContainedVertical'
  | 'groupedContainedPrimary'
  | 'groupedContainedSecondary';

export type ButtonGroupProps<
  D extends React.ElementType = ButtonGroupTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonGroupTypeMap<P, D>, D>;

export default ButtonGroup;
