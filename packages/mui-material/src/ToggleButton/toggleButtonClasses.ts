import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface ToggleButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `selected={true}`. */
  selected: string;
  /** State class applied to the root element if `color="standard"`. */
  standard: string;
  /** State class applied to the root element if `color="primary"`. */
  primary: string;
  /** State class applied to the root element if `color="secondary"`. */
  secondary: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="medium"`. */
  sizeMedium: string;
  /** Styles applied to the root element if `size="large"`. */
  sizeLarge: string;
}

export type ToggleButtonClassKey = keyof ToggleButtonClasses;

export function getToggleButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiToggleButton', slot);
}

const toggleButtonClasses: ToggleButtonClasses = generateUtilityClasses('MuiToggleButton', [
  'root',
  'disabled',
  'selected',
  'standard',
  'primary',
  'secondary',
  'sizeSmall',
  'sizeMedium',
  'sizeLarge',
]);

export default toggleButtonClasses;
