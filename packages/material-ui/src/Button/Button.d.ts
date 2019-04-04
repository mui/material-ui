import { PropTypes } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverridableComponent, OverrideProps, SimplifiedPropsOf } from '../OverridableComponent';

export type ButtonTypeMape<P, D extends React.ElementType> = ExtendButtonBaseTypeMap<{
  props: P & {
    color?: PropTypes.Color;
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    fullWidth?: boolean;
    href?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'text' | 'outlined' | 'contained';
  };
  defaultComponent: D;
  classKey: ButtonClassKey;
}>;

declare const Button: ExtendButtonBase<ButtonTypeMape<{}, 'button'>>;

export type ButtonProps<D extends React.ElementType = 'button', P = {}> = OverrideProps<
  ButtonTypeMape<P, D>,
  D
>;

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
  | 'sizeSmall'
  | 'sizeLarge'
  | 'fullWidth';

export default Button;
