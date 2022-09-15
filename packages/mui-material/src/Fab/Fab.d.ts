import { OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { PropTypes, Theme } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { FabClasses } from './fabClasses';

export interface FabPropsVariantOverrides {}

export interface FabPropsSizeOverrides {}

export interface FabPropsColorOverrides {}

export type FabTypeMap<P = {}, D extends React.ElementType = 'button'> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<FabClasses>;
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'default'
     */
    color?: OverridableStringUnion<
      PropTypes.Color | 'success' | 'error' | 'info' | 'warning',
      FabPropsColorOverrides
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
     * If `true`, the ripple effect is disabled.
     */
    disableRipple?: boolean;
    /**
     * The URL to link to when the button is clicked.
     * If defined, an `a` element will be used as the root node.
     */
    href?: string;
    /**
     * The size of the component.
     * `small` is equivalent to the dense button styling.
     * @default 'large'
     */
    size?: OverridableStringUnion<'small' | 'medium' | 'large', FabPropsSizeOverrides>;
    /**
     * The variant to use.
     * @default 'circular'
     */
    variant?: OverridableStringUnion<'circular' | 'extended', FabPropsVariantOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}>;

/**
 *
 * Demos:
 *
 * - [Floating Action Button](https://mui.com/material-ui/react-floating-action-button/)
 *
 * API:
 *
 * - [Fab API](https://mui.com/material-ui/api/fab/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
declare const Fab: ExtendButtonBase<FabTypeMap>;

export type FabProps<
  D extends React.ElementType = FabTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<FabTypeMap<P, D>, D>;

export default Fab;
