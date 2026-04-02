import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface ChipButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
}

export type ChipButtonClassKey = keyof ChipButtonClasses;

export function getChipButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiChipButton', slot);
}

const chipButtonClasses: ChipButtonClasses = generateUtilityClasses('MuiChipButton', [
  'root',
  'disabled',
]);

export default chipButtonClasses;
