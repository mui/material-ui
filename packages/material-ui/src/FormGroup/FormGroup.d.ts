import * as React from 'react';
import { StandardProps } from '..';

export interface FormGroupProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, FormGroupClassKey> {
  row?: boolean;
}

export type FormGroupClassKey = 'root' | 'row';

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 *
 * Demos:
 * - {@link https://material-ui.com/components/checkboxes/ Checkboxes}
 * - {@link https://material-ui.com/components/switches/ Switches}
 *
 * API:
 * - {@link https://material-ui.com/api/form-group/ FormGroup API}
 *
 */
declare const FormGroup: React.ComponentType<FormGroupProps>;

export default FormGroup;
