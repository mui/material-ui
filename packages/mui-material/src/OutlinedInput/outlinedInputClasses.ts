import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { inputBaseClasses } from '../InputBase';

export interface OutlinedInputClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if the color is secondary. */
  colorSecondary: string;
  /** Styles applied to the root element if the component is focused. */
  focused: string;
  /** Styles applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `startAdornment` is provided. */
  adornedStart: string;
  /** Styles applied to the root element if `endAdornment` is provided. */
  adornedEnd: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** Styles applied to the input element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `multiline={true}`. */
  multiline: string;
  /** Styles applied to the NotchedOutline element. */
  notchedOutline: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the input element if `size="small"`.
   * @deprecated Combine the [.MuiInputBase-input](/material-ui/api/input-base/#input-base-classes-MuiInputBase-input) and [.MuiInputBase-sizeSmall](/material-ui/api/input-base/#input-base-classes-MuiInputBase-sizeSmall) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputSizeSmall: string;
  /** Styles applied to the input element if `multiline={true}`.
   * @deprecated Combine the [.MuiInputBase-input](/material-ui/api/input-base/#input-base-classes-MuiInputBase-input) and [.MuiInputBase-multiline](/material-ui/api/input-base/#input-base-classes-MuiInputBase-multiline) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputMultiline: string;
  /** Styles applied to the input element if `startAdornment` is provided.
   * @deprecated Combine the [.MuiInputBase-input](/material-ui/api/input-base/#input-base-classes-MuiInputBase-input) and [.MuiInputBase-adornedStart](/material-ui/api/input-base/#input-base-classes-MuiInputBase-adornedStart) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputAdornedStart: string;
  /** Styles applied to the input element if `endAdornment` is provided.
   * @deprecated Combine the [.MuiInputBase-input](/material-ui/api/input-base/#input-base-classes-MuiInputBase-input) and [.MuiInputBase-adornedEnd](/material-ui/api/input-base/#input-base-classes-MuiInputBase-adornedEnd) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputAdornedEnd: string;
  /** Styles applied to the input element if `type="search"`. */
  inputTypeSearch: string;
}

export type OutlinedInputClassKey = keyof OutlinedInputClasses;

export function getOutlinedInputUtilityClass(slot: string): string {
  return generateUtilityClass('MuiOutlinedInput', slot);
}

const outlinedInputClasses: OutlinedInputClasses = {
  ...inputBaseClasses,
  ...generateUtilityClasses('MuiOutlinedInput', ['root', 'notchedOutline', 'input']),
};

export default outlinedInputClasses;
