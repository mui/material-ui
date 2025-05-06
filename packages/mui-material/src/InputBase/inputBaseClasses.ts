import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface InputBaseClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if the component is a descendant of `FormControl`. */
  formControl: string;
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
  /** Styles applied to the root element if the color is secondary. */
  colorSecondary: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** Styles applied to the root element if `hiddenLabel={true}`. */
  hiddenLabel: string;
  /** State class applied to the root element if `readOnly={true}`. */
  readOnly: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the input element if `size="small"`.
   * @deprecated Combine the [.MuiInputBase-input](/material-ui/api/input-base/#inputbase-classes-input) and [.MuiInputBase-sizeSmall](/material-ui/api/input-base/#inputbase-classes-sizeSmall) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputSizeSmall: string;
  /** Styles applied to the input element if `multiline={true}`.
   * @deprecated Combine the [.MuiInputBase-input](/material-ui/api/input-base/#inputbase-classes-input) and [.MuiInputBase-multiline](/material-ui/api/input-base/#inputbase-classes-multiline) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputMultiline: string;
  inputTypeSearch: string;
  /** Styles applied to the input element if `startAdornment` is provided.
   * @deprecated Combine the [.MuiInputBase-input](/material-ui/api/input-base/#inputbase-classes-input) and [.MuiInputBase-adornedStart](/material-ui/api/input-base/#inputbase-classes-adornedStart) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputAdornedStart: string;
  /** Styles applied to the input element if `endAdornment` is provided.
   * @deprecated Combine the [.MuiInputBase-input](/material-ui/api/input-base/#inputbase-classes-input) and [.MuiInputBase-adornedEnd](/material-ui/api/input-base/#inputbase-classes-adornedEnd) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputAdornedEnd: string;
  /** Styles applied to the input element if `hiddenLabel={true}`.
   * @deprecated Combine the [.MuiInputBase-input](/material-ui/api/input-base/#inputbase-classes-input) and [.MuiInputBase-hiddenLabel](/material-ui/api/input-base/#inputbase-classes-hiddenLabel) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputHiddenLabel: string;
}

export type InputBaseClassKey = keyof InputBaseClasses;

export function getInputBaseUtilityClass(slot: string): string {
  return generateUtilityClass('MuiInputBase', slot);
}

const inputBaseClasses: InputBaseClasses = generateUtilityClasses('MuiInputBase', [
  'root',
  'formControl',
  'focused',
  'disabled',
  'adornedStart',
  'adornedEnd',
  'error',
  'sizeSmall',
  'multiline',
  'colorSecondary',
  'fullWidth',
  'hiddenLabel',
  'readOnly',
  'input',
  'inputSizeSmall',
  'inputMultiline',
  'inputTypeSearch',
  'inputAdornedStart',
  'inputAdornedEnd',
  'inputHiddenLabel',
]);

export default inputBaseClasses;
