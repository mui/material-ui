import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { InputBaseProps } from '../InputBase';
import { FilledInputClasses } from './filledInputClasses';

export interface FilledInputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FilledInputClasses>;
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel?: boolean;
  /**
   * If `true`, the input will not have an underline.
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
 * - [Text Fields](https://mui.com/components/text-fields/)
 *
 * API:
 *
 * - [FilledInput API](https://mui.com/api/filled-input/)
 * - inherits [InputBase API](https://mui.com/api/input-base/)
 */
declare const FilledInput: ((props: FilledInputProps) => JSX.Element) & { muiName: string };

export default FilledInput;
