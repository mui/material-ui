import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps, OverridableComponent, OverridableTypeMap } from '../OverridableComponent';

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
    variant?: 'text' | 'outlined' | 'contained';
  };
  defaultComponent: D;
  classKey: ButtonClassKey;
}>;

/**
 * utility to create component types that inherit props from ButtonBase.
 * This component has an additional overload if the `href` prop is set which
 * can make extension quite tricky
 */
export interface ExtendButtonTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & ButtonTypeMap['props'];
  defaultComponent: M['defaultComponent'];
  classKey: M['classKey'];
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

export type ButtonClassKey =
  | 'root'
  | 'label'
  | 'text'
  | 'textPrimary'
  | 'textSecondary'
  | 'outlined'
  | 'outlinedPrimary'
  | 'outlinedSecondary'
  | 'contained'
  | 'containedPrimary'
  | 'containedSecondary'
  | 'disableElevation'
  | 'focusVisible'
  | 'disabled'
  | 'colorInherit'
  | 'textSizeSmall'
  | 'textSizeLarge'
  | 'outlinedSizeSmall'
  | 'outlinedSizeLarge'
  | 'containedSizeSmall'
  | 'containedSizeLarge'
  | 'sizeSmall'
  | 'sizeLarge'
  | 'fullWidth'
  | 'startIcon'
  | 'endIcon'
  | 'iconSizeSmall'
  | 'iconSizeMedium'
  | 'iconSizeLarge';

export default Button;
