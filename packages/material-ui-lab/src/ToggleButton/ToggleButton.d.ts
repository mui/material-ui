import {
  ButtonBaseClassKey,
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from '@material-ui/core/ButtonBase';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

export type ToggleButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    disableFocusRipple?: boolean;
    selected?: boolean;
    value?: any;
    size?: 'small' | 'medium' | 'large';
  };
  defaultComponent: D;
  classKey: ToggleButtonClassKey;
}>;

declare const ToggleButton: ExtendButtonBase<ToggleButtonTypeMap>;

export type ToggleButtonProps<
  D extends React.ElementType = ToggleButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ToggleButtonTypeMap<P, D>, D>;

export type ToggleButtonClassKey =
  | 'root'
  | 'disabled'
  | 'selected'
  | 'label'
  | 'sizeSmall'
  | 'sizeLarge';

export default ToggleButton;
