import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface SelectClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the select component `select` class. */
  select: string;
  /** Styles applied to the select component if `multiple={true}`. */
  multiple: string;
  /** Styles applied to the select component if `variant="filled"`. */
  filled: string;
  /** Styles applied to the select component if it is focused. */
  focused: string;
  /** Styles applied to the select component if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the select component if `variant="standard"`. */
  standard: string;
  /** State class applied to the select component `disabled` class. */
  disabled: string;
  /** Styles applied to the icon component. */
  icon: string;
  /** Styles applied to the icon component if the popup is open. */
  iconOpen: string;
  /** Styles applied to the icon component if `variant="filled"`.
   * @deprecated Combine the [.MuiSelect-icon](/material-ui/api/select/#select-classes-icon) and [.MuiSelect-filled](/material-ui/api/select/#select-classes-filled) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  iconFilled: string;
  /** Styles applied to the icon component if `variant="outlined"`.
   * @deprecated Combine the [.MuiSelect-icon](/material-ui/api/select/#select-classes-icon) and [.MuiSelect-outlined](/material-ui/api/select/#select-classes-outlined) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  iconOutlined: string;
  /** Styles applied to the icon component if `variant="standard"`.
   * @deprecated Combine the [.MuiSelect-icon](/material-ui/api/select/#select-classes-icon) and [.MuiSelect-standard](/material-ui/api/select/#select-classes-standard) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  iconStandard: string;
  /** Styles applied to the underlying native input component. */
  nativeInput: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
}

export type SelectClassKey = keyof SelectClasses;

export function getSelectUtilityClasses(slot: string): string {
  return generateUtilityClass('MuiSelect', slot);
}

const selectClasses: SelectClasses = generateUtilityClasses('MuiSelect', [
  'root',
  'select',
  'multiple',
  'filled',
  'outlined',
  'standard',
  'disabled',
  'focused',
  'icon',
  'iconOpen',
  'iconFilled',
  'iconOutlined',
  'iconStandard',
  'nativeInput',
  'error',
]);

export default selectClasses;
