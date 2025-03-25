import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { FormGroupClasses } from './formGroupClasses';

export interface FormGroupProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormGroupClasses>;
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

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 *
 * Demos:
 *
 * - [Checkbox](https://v6.mui.com/material-ui/react-checkbox/)
 * - [Switch](https://v6.mui.com/material-ui/react-switch/)
 *
 * API:
 *
 * - [FormGroup API](https://v6.mui.com/material-ui/api/form-group/)
 */
export default function FormGroup(props: FormGroupProps): React.JSX.Element;
