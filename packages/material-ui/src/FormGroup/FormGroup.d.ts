import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';

export interface FormGroupProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
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
    /** Styles applied to the root element if `row={true}`. */
    row?: string;
  };
  /**
   * Display group of elements in a compact row.
   * @default false
   */
  row?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type FormGroupClassKey = keyof NonNullable<FormGroupProps['classes']>;

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 *
 * Demos:
 *
 * - [Checkboxes](https://material-ui.com/components/checkboxes/)
 * - [Switches](https://material-ui.com/components/switches/)
 *
 * API:
 *
 * - [FormGroup API](https://material-ui.com/api/form-group/)
 */
export default function FormGroup(props: FormGroupProps): JSX.Element;
