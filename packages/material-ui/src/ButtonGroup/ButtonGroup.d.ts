import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ButtonGroupPropsVariantOverrides {}
export type ButtonGroupVariantDefaults = Record<'text' | 'outlined' | 'contained', true>;

export interface ButtonGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the button group.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      root?: string;
      contained?: string;
      outlined?: string;
      text?: string;
      disableElevation?: string;
      disabled?: string;
      fullWidth?: string;
      vertical?: string;
      grouped?: string;
      groupedHorizontal?: string;
      groupedVertical?: string;
      groupedText?: string;
      groupedTextHorizontal?: string;
      groupedTextVertical?: string;
      groupedTextPrimary?: string;
      groupedTextSecondary?: string;
      groupedOutlined?: string;
      groupedOutlinedHorizontal?: string;
      groupedOutlinedVertical?: string;
      groupedOutlinedPrimary?: string;
      groupedOutlinedSecondary?: string;
      groupedContained?: string;
      groupedContainedHorizontal?: string;
      groupedContainedVertical?: string;
      groupedContainedPrimary?: string;
      groupedContainedSecondary?: string;
    };
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: 'inherit' | 'primary' | 'secondary';
    /**
     * If `true`, the buttons will be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, no elevation is used.
     * @default false
     */
    disableElevation?: boolean;
    /**
     * If `true`, the button keyboard focus ripple will be disabled.
     * @default false
     */
    disableFocusRipple?: boolean;
    /**
     * If `true`, the button ripple effect will be disabled.
     * @default false
     */
    disableRipple?: boolean;
    /**
     * If `true`, the buttons will take up the full width of its container.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * The group orientation (layout flow direction).
     * @default 'horizontal'
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * The size of the button.
     * `small` is equivalent to the dense button styling.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: OverridableStringUnion<ButtonGroupVariantDefaults, ButtonGroupPropsVariantOverrides>;
  };
  defaultComponent: D;
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

export type ButtonGroupClassKey = keyof NonNullable<ButtonGroupTypeMap['props']['classes']>;

export type ButtonGroupProps<
  D extends React.ElementType = ButtonGroupTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonGroupTypeMap<P, D>, D>;

export default ButtonGroup;
