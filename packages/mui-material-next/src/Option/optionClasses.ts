import {
  unstable_generateUtilityClasses as generateUtilityClasses,
  unstable_generateUtilityClass as generateUtilityClass,
} from '@mui/utils';

export interface OptionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if keyboard focused. */
  focusVisible: string;
  /** Styles applied to the root element if dense. */
  dense: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `divider={true}`. */
  divider: string;
  /** Styles applied to the inner `component` element unless `disableGutters={true}`. */
  gutters: string;
  /** State class applied to the root element if `selected={true}`. */
  selected: string;
}

export type OptionClassKey = keyof OptionClasses;

export function getOptionUtilityClass(slot: string): string {
  return generateUtilityClass('MuiOption', slot);
}

const optionClasses: OptionClasses = generateUtilityClasses('MuiOption', [
  'root',
  'focusVisible',
  'dense',
  'disabled',
  'divider',
  'gutters',
  'selected',
]);

export default optionClasses;
