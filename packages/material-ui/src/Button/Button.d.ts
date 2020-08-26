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
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the span element that wraps the children. */
      label?: string;
      /** Styles applied to the root element if `variant="text"`. */
      text?: string;
      /** Styles applied to the root element if `variant="text"` and `color="primary"`. */
      textPrimary?: string;
      /** Styles applied to the root element if `variant="text"` and `color="secondary"`. */
      textSecondary?: string;
      /** Styles applied to the root element if `variant="outlined"`. */
      outlined?: string;
      /** Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
      outlinedPrimary?: string;
      /** Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
      outlinedSecondary?: string;
      /** Styles applied to the root element if `variant="contained"`. */
      contained?: string;
      /** Styles applied to the root element if `variant="contained"` and `color="primary"`. */
      containedPrimary?: string;
      /** Styles applied to the root element if `variant="contained"` and `color="secondary"`. */
      containedSecondary?: string;
      /** Styles applied to the root element if `disableElevation={true}`. */
      disableElevation?: string;
      /** Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
      focusVisible?: string;
      /** Pseudo-class applied to the root element if `disabled={true}`. */
      disabled?: string;
      /** Styles applied to the root element if `color="inherit"`. */
      colorInherit?: string;
      /** Styles applied to the root element if `size="small"` and `variant="text"`. */
      textSizeSmall?: string;
      /** Styles applied to the root element if `size="large"` and `variant="text"`. */
      textSizeLarge?: string;
      /** Styles applied to the root element if `size="small"` and `variant="outlined"`. */
      outlinedSizeSmall?: string;
      /** Styles applied to the root element if `size="large"` and `variant="outlined"`. */
      outlinedSizeLarge?: string;
      /** Styles applied to the root element if `size="small"` and `variant="contained"`. */
      containedSizeSmall?: string;
      /** Styles applied to the root element if `size="large"` and `variant="contained"`. */
      containedSizeLarge?: string;
      /** Styles applied to the root element if `size="small"`. */
      sizeSmall?: string;
      /** Styles applied to the root element if `size="large"`. */
      sizeLarge?: string;
      /** Styles applied to the root element if `fullWidth={true}`. */
      fullWidth?: string;
      /** Styles applied to the startIcon element if supplied. */
      startIcon?: string;
      /** Styles applied to the endIcon element if supplied. */
      endIcon?: string;
      /** Styles applied to the icon element if supplied and `size="small"`. */
      iconSizeSmall?: string;
      /** Styles applied to the icon element if supplied and `size="medium"`. */
      iconSizeMedium?: string;
      /** Styles applied to the icon element if supplied and `size="large"`. */
      iconSizeLarge?: string;
    };
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: 'inherit' | 'primary' | 'secondary';
    /**
     * If `true`, the button will be disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, no elevation is used.
     */
    disableElevation?: boolean;
    /**
     * If `true`, the  keyboard focus ripple will be disabled.
     */
    disableFocusRipple?: boolean;
    /**
     * Element placed after the children.
     */
    endIcon?: React.ReactNode;
    /**
     * If `true`, the button will take up the full width of its container.
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
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Element placed before the children.
     */
    startIcon?: React.ReactNode;
    /**
     * The variant to use.
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
