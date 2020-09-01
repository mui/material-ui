import { OverridableStringUnion } from '@material-ui/types';
import { PropTypes } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export interface FabPropsVariantOverrides {}
export type FabVariantDefaults = Record<'circular' | 'extended', true>;

export type FabTypeMap<P = {}, D extends React.ElementType = 'button'> = ExtendButtonBaseTypeMap<{
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
      /** Styles applied to the root element if `color="primary"`. */
      primary?: string;
      /** Styles applied to the root element if `color="secondary"`. */
      secondary?: string;
      /** Styles applied to the root element if `variant="extended"`. */
      extended?: string;
      /** Styles applied to the root element if `variant="circular"`. */
      circular?: string;
      /** Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
      focusVisible?: string;
      /** Pseudo-class applied to the root element if `disabled={true}`. */
      disabled?: string;
      /** Styles applied to the root element if `color="inherit"`. */
      colorInherit?: string;
      /** Styles applied to the root element if `size="small"``. */
      sizeSmall?: string;
      /** Styles applied to the root element if `size="medium"``. */
      sizeMedium?: string;
    };
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'default'
     */
    color?: PropTypes.Color;
    /**
     * If `true`, the button will be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, the  keyboard focus ripple will be disabled.
     * @default false
     */
    disableFocusRipple?: boolean;
    /**
     * If `true`, the ripple effect will be disabled.
     */
    disableRipple?: boolean;
    /**
     * The URL to link to when the button is clicked.
     * If defined, an `a` element will be used as the root node.
     */
    href?: string;
    /**
     * The size of the button.
     * `small` is equivalent to the dense button styling.
     * @default 'large'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The variant to use.
     * @default 'circular'
     */
    variant?: OverridableStringUnion<FabVariantDefaults, FabPropsVariantOverrides>;
  };
  defaultComponent: D;
}>;

/**
 *
 * Demos:
 *
 * - [Floating Action Button](https://material-ui.com/components/floating-action-button/)
 *
 * API:
 *
 * - [Fab API](https://material-ui.com/api/fab/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const Fab: ExtendButtonBase<FabTypeMap>;

export type FabProps<
  D extends React.ElementType = FabTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FabTypeMap<P, D>, D>;

export type FabClassKey = keyof NonNullable<FabTypeMap['props']['classes']>;

export default Fab;
