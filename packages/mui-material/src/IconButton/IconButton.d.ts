import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { IconButtonClasses } from './iconButtonClasses';

export interface IconButtonPropsColorOverrides {}

export interface IconButtonPropsSizeOverrides {}

export type IconButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button',
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The icon to display.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<IconButtonClasses>;
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'default'
     */
    color?: OverridableStringUnion<
      'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
      IconButtonPropsColorOverrides
    >;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, the  keyboard focus ripple is disabled.
     * @default false
     */
    disableFocusRipple?: boolean;
    /**
     * If given, uses a negative margin to counteract the padding on one
     * side (this is often helpful for aligning the left or right
     * side of the icon with content above or below, without ruining the border
     * size and shape).
     * @default false
     */
    edge?: 'start' | 'end' | false;
    /**
     * The size of the component.
     * `small` is equivalent to the dense button styling.
     * @default 'medium'
     */
    size?: OverridableStringUnion<'small' | 'medium' | 'large', IconButtonPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}>;

/**
 * Refer to the [Icons](https://mui.com/material-ui/icons/) section of the documentation
 * regarding the available icon options.
 *
 * Demos:
 *
 * - [Button](https://mui.com/material-ui/react-button/)
 *
 * API:
 *
 * - [IconButton API](https://mui.com/material-ui/api/icon-button/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
declare const IconButton: ExtendButtonBase<IconButtonTypeMap>;

export type IconButtonProps<
  D extends React.ElementType = IconButtonTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<IconButtonTypeMap<P, D>, D>;

export default IconButton;
