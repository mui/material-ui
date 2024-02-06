import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion, OverrideProps, PartiallyRequired } from '@mui/types';
// eslint-disable-next-line no-restricted-imports
import { InternalStandardProps as StandardProps } from '@mui/material';
import type { SwitchBaseProps } from '@mui/material/internal/SwitchBase';
import { Theme } from '../styles';
import { SwitchClasses } from './switchClasses';

export interface SwitchPropsSizeOverrides {}

export interface SwitchPropsColorOverrides {}

export interface SwitchOwnProps
  extends StandardProps<SwitchBaseProps, 'checkedIcon' | 'color' | 'icon' | 'sx'> {
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SwitchClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default',
    SwitchPropsColorOverrides
  >;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * The icon to display when the component is unchecked.
   */
  icon?: React.ReactNode;
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', SwitchPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: unknown;
}

export interface SwitchTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'span',
> {
  props: SwitchOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type SwitchProps<
  RootComponentType extends React.ElementType = SwitchTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<SwitchTypeMap<AdditionalProps, RootComponentType>, RootComponentType>;

export interface SwitchOwnerState extends PartiallyRequired<SwitchProps, 'color' | 'size'> {}
