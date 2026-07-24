import { type SxProps } from '@mui/system';
import { type Theme } from '../styles';
import { type InternalStandardProps as StandardProps } from '../internal';
import { type InputBaseProps } from '../InputBase';
import { type InputClasses } from './inputClasses';

export interface InputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<InputClasses> | undefined;
  /**
   * If `true`, the `input` will not have an underline.
   * @default false
   */
  disableUnderline?: boolean | undefined;
  /**
   * @internal
   */
  notched?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 *
 * Demos:
 *
 * - [Text Field](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [Input API](https://mui.com/material-ui/api/input/)
 * - inherits [InputBase API](https://mui.com/material-ui/api/input-base/)
 */
declare const Input: ((props: InputProps) => React.JSX.Element) & { muiName: string };

export default Input;
