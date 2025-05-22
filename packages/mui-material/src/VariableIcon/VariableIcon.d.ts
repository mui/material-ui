import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { VariableIconClasses } from './variableIconClasses';

export interface VariableIconPropsSizeOverrides {}

export interface VariableIconPropsColorOverrides {}

export interface VariableIconOwnProps {
  /**
   * Node passed into the icon element.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<VariableIconClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'inherit'
   */
  color?: OverridableStringUnion<
    | 'inherit'
    | 'action'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
    VariableIconPropsColorOverrides
  >;
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize?: OverridableStringUnion<
    'inherit' | 'x-large' | 'large' | 'medium' | 'small',
    VariableIconPropsSizeOverrides
  >;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * Provides a human-readable title for the element that contains it.
   */
  titleAccess?: string;
  /**
   * Indicates if the icon should be filled.
   */
  filled?: boolean;
  /**
   * Allows increasing or decreasing emphasis.
   */
  emphasis?: 'light' | 'regular' | 'heavy';
}

export interface VariableIconTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'span',
> {
  props: AdditionalProps & VariableIconOwnProps;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Material Symbols](https://mui.com/material-ui/material-symbols/)
 *
 * API:
 *
 * - [VariableIcon API](https://mui.com/material-ui/api/variable-icon/)
 */
declare const VariableIcon: OverridableComponent<VariableIconTypeMap> & { muiName: string };

export type VariableIconProps<
  RootComponent extends React.ElementType = VariableIconTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<VariableIconTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default VariableIcon;
