import { PropTypes } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type ButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    color?: PropTypes.Color;
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
