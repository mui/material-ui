import type * as React from 'react';
import type { SxProps } from '@mui/system';
import type { InternalStandardProps as StandardProps, Theme } from '..';
import type { InputBaseProps } from '../InputBase';
import type { OutlinedInputClasses } from './outlinedInputClasses';

export interface OutlinedInputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<OutlinedInputClasses>;
  /**
   * The label of the `input`. It is only used for layout. The actual labelling
   * is handled by `InputLabel`.
   */
  label?: React.ReactNode;
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Text Field](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [OutlinedInput API](https://mui.com/material-ui/api/outlined-input/)
 * - inherits [InputBase API](https://mui.com/material-ui/api/input-base/)
 */
declare const OutlinedInput: ((props: OutlinedInputProps) => React.JSX.Element) & {
  muiName: string;
};

export default OutlinedInput;
