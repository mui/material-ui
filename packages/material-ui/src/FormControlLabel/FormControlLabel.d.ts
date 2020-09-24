import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface FormControlLabelProps
  extends StandardProps<React.LabelHTMLAttributes<HTMLLabelElement>, 'children' | 'onChange'> {
  /**
   * If `true`, the component appears selected.
   */
  checked?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `labelPlacement="start"`. */
    labelPlacementStart?: string;
    /** Styles applied to the root element if `labelPlacement="top"`. */
    labelPlacementTop?: string;
    /** Styles applied to the root element if `labelPlacement="bottom"`. */
    labelPlacementBottom?: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled?: string;
    /** Styles applied to the label's Typography component. */
    label?: string;
  };
  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: React.ReactElement<any, any>;
  /**
   * If `true`, the control will be disabled.
   */
  disabled?: boolean;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<any>;
  /**
   * The text to be used in an enclosing label element.
   */
  label: React.ReactNode;
  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  name?: string;
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: (event: React.SyntheticEvent, checked: boolean) => void;
  /**
   * The value of the component.
   */
  value?: unknown;
}

export type FormControlLabelClassKey = keyof NonNullable<FormControlLabelProps['classes']>;

/**
 * Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 * Demos:
 *
 * - [Checkboxes](https://material-ui.com/components/checkboxes/)
 * - [Radio Buttons](https://material-ui.com/components/radio-buttons/)
 * - [Switches](https://material-ui.com/components/switches/)
 *
 * API:
 *
 * - [FormControlLabel API](https://material-ui.com/api/form-control-label/)
 */
export default function FormControlLabel(props: FormControlLabelProps): JSX.Element;
