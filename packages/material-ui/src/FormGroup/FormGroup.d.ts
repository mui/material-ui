import * as React from 'react';
import { StandardProps } from '..';

export interface FormGroupProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, FormGroupClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Display group of elements in a compact row.
   */
  row?: boolean;
}

export type FormGroupClassKey = 'root' | 'row';

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 * Demos:
 *
 * - [Checkboxes](https://mui.com/components/checkboxes/)
 * - [Switches](https://mui.com/components/switches/)
 *
 * API:
 *
 * - [FormGroup API](https://mui.com/api/form-group/)
 */
export default function FormGroup(props: FormGroupProps): JSX.Element;
