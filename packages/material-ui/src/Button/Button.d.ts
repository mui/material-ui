import { PropTypes } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type ButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    color?: PropTypes.Color;
    disableElevation?: boolean;
    disableFocusRipple?: boolean;
    endIcon?: React.ReactNode;
    fullWidth?: boolean;
    href?: string;
    size?: 'small' | 'medium' | 'large';
    startIcon?: React.ReactNode;
    variant?: 'text' | 'outlined' | 'contained';
  };
  defaultComponent: D;
  classKey: ButtonClassKey;
}>;

/**
 * 
 *
 * Demos:
 * - {@link https://material-ui.com/components/button-group Button Group}
 * - {@link https://material-ui.com/components/buttons Buttons}
 *
 * API:
 * - {@link https://material-ui.com/api/Button Button API}
 * - inherits {@link https://material-ui.com/api//api/button-base ButtonBase API}
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
