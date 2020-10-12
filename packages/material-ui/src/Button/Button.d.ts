import { OverridableStringUnion } from '@material-ui/types';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps, OverridableComponent, OverridableTypeMap } from '../OverridableComponent';

export interface ButtonPropsVariantOverrides {}
export type ButtonVariantDefaults = Record<'text' | 'outlined' | 'contained', true>;

export type ButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The content of the button.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      root?: string;
      label?: string;
      text?: string;
      textPrimary?: string;
      textSecondary?: string;
      outlined?: string;
      outlinedPrimary?: string;
      outlinedSecondary?: string;
      contained?: string;
      containedPrimary?: string;
      containedSecondary?: string;
      disableElevation?: string;
      focusVisible?: string;
      disabled?: string;
      colorInherit?: string;
      textSizeSmall?: string;
      textSizeLarge?: string;
      outlinedSizeSmall?: string;
      outlinedSizeLarge?: string;
      containedSizeSmall?: string;
      containedSizeLarge?: string;
      sizeSmall?: string;
      sizeLarge?: string;
      fullWidth?: string;
      startIcon?: string;
      endIcon?: string;
      iconSizeSmall?: string;
      iconSizeMedium?: string;
      iconSizeLarge?: string;
    };
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: 'inherit' | 'primary' | 'secondary';
    /**
     * If `true`, the button will be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, no elevation is used.
     * @default false
     */
    disableElevation?: boolean;
    /**
     * If `true`, the  keyboard focus ripple will be disabled.
     * @default false
     */
    disableFocusRipple?: boolean;
    /**
     * Element placed after the children.
     */
    endIcon?: React.ReactNode;
    /**
     * If `true`, the button will take up the full width of its container.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * The URL to link to when the button is clicked.
     * If defined, an `a` element will be used as the root node.
     */
    href?: string;
    /**
     * The size of the button.
     * `small` is equivalent to the dense button styling.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Element placed before the children.
     */
    startIcon?: React.ReactNode;
    /**
     * The variant to use.
     * @default 'text'
     */
    variant?: OverridableStringUnion<ButtonVariantDefaults, ButtonPropsVariantOverrides>;
  };
  defaultComponent: D;
}>;

/**
 * utility to create component types that inherit props from ButtonBase.
 * This component has an additional overload if the `href` prop is set which
 * can make extension quite tricky
 */
export interface ExtendButtonTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & ButtonTypeMap['props'];
  defaultComponent: M['defaultComponent'];
}

export type ExtendButton<M extends OverridableTypeMap> = ((
  props: { href: string } & OverrideProps<ExtendButtonBaseTypeMap<M>, 'a'>
) => JSX.Element) &
  OverridableComponent<ExtendButtonBaseTypeMap<M>>;

/**
 *
 * Demos:
 *
 * - [Button Group](https://material-ui.com/components/button-group/)
 * - [Buttons](https://material-ui.com/components/buttons/)
 *
 * API:
 *
 * - [Button API](https://material-ui.com/api/button/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const Button: ExtendButtonBase<ButtonTypeMap>;

export type ButtonProps<
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonTypeMap<P, D>, D>;

export type ButtonClassKey = keyof NonNullable<ButtonTypeMap['props']['classes']>;

export default Button;
