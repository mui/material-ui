import { ButtonBaseClassKey, ExtendButtonBase } from '@material-ui/core/ButtonBase';
import { SimplifiedPropsOf } from '@material-ui/core/OverridableComponent';

declare const ToggleButton: ExtendButtonBase<{
  props: {
    disableFocusRipple?: boolean;
    selected?: boolean;
    value?: any;
  };
  defaultComponent: 'button';
  classKey: ToggleButtonClassKey;
}>;

export type ToggleButtonProps = SimplifiedPropsOf<typeof ToggleButton>;

export type ToggleButtonClassKey =
  | 'root'
  | 'disabled'
  | 'selected'
  | 'label'
  | 'sizeSmall'
  | 'sizeLarge';

export default ToggleButton;
