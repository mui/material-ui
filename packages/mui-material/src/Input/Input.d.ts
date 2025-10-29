import { SxProps } from '@mui/system';
import { CreateThemeComponent, Theme } from '../stylesOptimized';
import { InternalStandardProps as StandardProps } from '../internal';
import { InputBaseProps } from '../InputBase';
import { InputClasses, InputClassKey } from './inputClasses';

export interface InputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<InputClasses>;
  /**
   * If `true`, the `input` will not have an underline.
   * @default false
   */
  disableUnderline?: boolean;
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
 * - [Input API](https://mui.com/material-ui/api/input/)
 * - inherits [InputBase API](https://mui.com/material-ui/api/input-base/)
 */
declare const Input: ((props: InputProps) => React.JSX.Element) & { muiName: string };

export type InputTheme = {
  MuiInput?: CreateThemeComponent<InputClassKey, InputProps>;
};

export default Input;
