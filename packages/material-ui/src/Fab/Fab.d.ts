import { PropTypes } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type FabTypeMap<P = {}, D extends React.ElementType = 'button'> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The content of the button.
     */
    children: NonNullable<React.ReactNode>;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: PropTypes.Color;
    /**
     * If `true`, the button will be disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, the  keyboard focus ripple will be disabled.
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
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The variant to use.
     * 'round' is deprecated, use 'circular' instead.
     */
    variant?: 'circular' | 'extended' | 'round';
  };
  defaultComponent: D;
  classKey: FabClassKey;
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

export type FabClassKey =
  | 'root'
  | 'label'
  | 'primary'
  | 'secondary'
  | 'extended'
  | 'focusVisible'
  | 'disabled'
  | 'colorInherit'
  | 'sizeSmall'
  | 'sizeMedium';

export default Fab;
