import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface SelectClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the select component `select` class. */
  select: string;
  /** Styles applied to the select component if `variant="filled"`. */
  filled: string;
  /** Styles applied to the select component if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the select component if `variant="standard"`. */
  standard: string;
  /** Pseudo-class applied to the select component `disabled` class. */
  disabled: string;
  /** Styles applied to the icon component. */
  icon: string;
  /** Styles applied to the icon component if the popup is open. */
  iconOpen: string;
  /** Styles applied to the icon component if `variant="filled"`. */
  iconFilled: string;
  /** Styles applied to the icon component if `variant="outlined"`. */
  iconOutlined: string;
  /** Styles applied to the icon component if `variant="standard"`. */
  iconStandard: string;
  /** Styles applied to the underlying native input component. */
  nativeInput: string;
}

export type SelectClassKey = keyof SelectClasses;

export function getSelectUtilityClasses(slot: string): string {
  return generateUtilityClass('MuiSelect', slot);
}

const selectClasses: SelectClasses = generateUtilityClasses('MuiSelect', [
  'root',
  'select',
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
]);

export default selectClasses;
