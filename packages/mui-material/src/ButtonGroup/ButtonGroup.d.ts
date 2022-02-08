import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '..';
import { ButtonGroupClasses } from './buttonGroupClasses';

export interface ButtonGroupPropsColorOverrides {}
export interface ButtonGroupPropsVariantOverrides {}
export interface ButtonGroupPropsSizeOverrides {}

export interface ButtonGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ButtonGroupClasses>;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<
      'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
      ButtonGroupPropsColorOverrides
    >;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, no elevation is used.
     * @default false
     */
    disableElevation?: boolean;
    /**
     * If `true`, the button keyboard focus ripple is disabled.
     * @default false
     */
    disableFocusRipple?: boolean;
    /**
     * If `true`, the button ripple effect is disabled.
     * @default false
     */
    disableRipple?: boolean;
    /**
     * If `true`, the buttons will take up the full width of its container.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * The component orientation (layout flow direction).
     * @default 'horizontal'
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * The size of the component.
     * `small` is equivalent to the dense button styling.
     * @default 'medium'
     */
    size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonGroupPropsSizeOverrides>;
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: OverridableStringUnion<
      'text' | 'outlined' | 'contained',
      ButtonGroupPropsVariantOverrides
    >;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
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

export type ButtonGroupProps<
  D extends React.ElementType = ButtonGroupTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ButtonGroupTypeMap<P, D>, D>;

export default ButtonGroup;
