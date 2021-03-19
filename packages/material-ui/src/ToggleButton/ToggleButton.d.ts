import { SxProps } from '@material-ui/system';
import { Theme } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type ToggleButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Pseudo-class applied to the root element if `disabled={true}`. */
      disabled?: string;
      /** Pseudo-class applied to the root element if `selected={true}`. */
      selected?: string;
      /** Pseudo-class applied to the root element if `color="standard"`. */
      standard?: string;
      /** Pseudo-class applied to the root element if `color="primary"`. */
      primary?: string;
      /** Pseudo-class applied to the root element if `color="secondary"`. */
      secondary?: string;
      /** Styles applied to the `label` wrapper element. */
      label?: string;
      /** Styles applied to the root element if `size="small"`. */
      sizeSmall?: string;
      /** Styles applied to the root element if `size="medium"`. */
      sizeMedium?: string;
      /** Styles applied to the root element if `size="large"`. */
      sizeLarge?: string;
    };
    /**
     * The color of the button when it is in an active state.
     * @default 'standard'
     */
    color?: 'standard' | 'primary' | 'secondary';
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, the  keyboard focus ripple is disabled.
     * @default false
     */
    disableFocusRipple?: boolean;
    /**
     * If `true`, the button is rendered in an active state.
     */
    selected?: boolean;
    /**
     * The size of the component.
     * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The value to associate with the button when selected in a
     * ToggleButtonGroup.
     */
    value: NonNullable<unknown>;
  };
  defaultComponent: D;
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

export type ToggleButtonClassKey = keyof NonNullable<ToggleButtonTypeMap['props']['classes']>;

export default ToggleButton;
