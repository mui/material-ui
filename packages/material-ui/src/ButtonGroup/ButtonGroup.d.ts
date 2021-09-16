import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ButtonGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the button group.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: PropTypes.Color;
    /**
     * If `true`, the buttons will be disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, no elevation is used.
     */
    disableElevation?: boolean;
    /**
     * If `true`, the button keyboard focus ripple will be disabled.
     */
    disableFocusRipple?: boolean;
    /**
     * If `true`, the button ripple effect will be disabled.
     */
    disableRipple?: boolean;
    /**
     * If `true`, the buttons will take up the full width of its container.
     */
    fullWidth?: boolean;
    /**
     * The group orientation (layout flow direction).
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * The size of the button.
     * `small` is equivalent to the dense button styling.
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The variant to use.
     */
    variant?: 'text' | 'outlined' | 'contained';
  };
  defaultComponent: D;
  classKey: ButtonGroupClassKey;
}

/**
 *
 * Demos:
 *
 * - [Button Group](https://mui.com/components/button-group/)
 *
 * API:
 *
 * - [ButtonGroup API](https://mui.com/api/button-group/)
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
