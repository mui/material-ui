import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '@material-ui/core/ButtonBase';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

export type ToggleButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The content of the button.
     */
    children?: React.ReactNode;
    /**
     * If `true`, the button will be disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, the  keyboard focus ripple will be disabled.
     */
    disableFocusRipple?: boolean;
    /**
     * If `true`, the button will be rendered in an active state.
     */
    selected?: boolean;
    /**
     * The value to associate with the button when selected in a
     * ToggleButtonGroup.
     */
    value: NonNullable<unknown>;
  };
  defaultComponent: D;
  classKey: ToggleButtonClassKey;
}>;

/**
 *
 * Demos:
 *
 * - [Toggle Button](https://material-ui.com/components/toggle-button/)
 *
 * API:
 *
 * - [ToggleButton API](https://material-ui.com/api/toggle-button/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
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
