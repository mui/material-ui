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
    size?: 'small' | 'medium' | 'large';
    value?: any;
  };
  defaultComponent: D;
  classKey: ToggleButtonClassKey;
}>;

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/toggle-button Toggle Button}
 *
 * API:
 * - {@link https://material-ui.com/api/ToggleButton ToggleButton API}
 * - inherits {@link https://material-ui.com/api//api/button-base ButtonBase API}
 */
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
