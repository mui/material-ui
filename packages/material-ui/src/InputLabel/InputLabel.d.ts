import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { FormLabelProps } from '../FormLabel';

export interface InputLabelProps extends StandardProps<FormLabelProps> {
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
    /** Pseudo-class applied to the root element if `focused={true}`. */
    focused?: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled?: string;
    /** Pseudo-class applied to the root element if `error={true}`. */
    error?: string;
    /** Pseudo-class applied to the root element if `required={true}`. */
    required?: string;
    /** Pseudo-class applied to the asterisk element. */
    asterisk?: string;
    /** Styles applied to the root element if the component is a descendant of `FormControl`. */
    formControl?: string;
    /** Styles applied to the root element if `size="small"`. */
    sizeSmall?: string;
    /** Styles applied to the input element if `shrink={true}`. */
    shrink?: string;
    /** Styles applied to the input element unless `disableAnimation={true}`. */
    animated?: string;
    /** Styles applied to the root element if `variant="filled"`. */
    filled?: string;
    /** Styles applied to the root element if `variant="outlined"`. */
    outlined?: string;
  };
  color?: FormLabelProps['color'];
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused?: boolean;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense';
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required?: boolean;
  /**
   * If `true`, the label is shrunk.
   */
  shrink?: boolean;
  /**
   * The variant to use.
   */
  variant?: 'standard' | 'outlined' | 'filled';
}

export type InputLabelClassKey = keyof NonNullable<InputLabelProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [InputLabel API](https://material-ui.com/api/input-label/)
 * - inherits [FormLabel API](https://material-ui.com/api/form-label/)
 */
export default function InputLabel(props: InputLabelProps): JSX.Element;
