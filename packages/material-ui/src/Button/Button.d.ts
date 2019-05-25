import { PropTypes } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverridableComponent, OverrideProps, SimplifiedPropsOf } from '../OverridableComponent';

export type ButtonTypeMap<P, D extends React.ElementType> = ExtendButtonBaseTypeMap<{
  props: P & {
    color?: PropTypes.Color;
    disableFocusRipple?: boolean;
    fullWidth?: boolean;
    href?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'text' | 'outlined' | 'contained';
  };
  defaultComponent: D;
  classKey: ButtonClassKey;
}>;

declare const Button: ExtendButtonBase<ButtonTypeMap<{}, 'button'>>;

export type ButtonProps<D extends React.ElementType = 'button', P = {}> = OverrideProps<
  ButtonTypeMap<P, D>,
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
