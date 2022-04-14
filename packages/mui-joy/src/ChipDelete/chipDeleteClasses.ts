import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ChipDeleteClasses {
  /** Styles applied to the root element. */
  root: string;
}

export function getChipDeleteUtilityClass(slot: string): string {
  return generateUtilityClass('MuiChipDelete', slot);
}

const chipDeleteClasses: ChipDeleteClasses = generateUtilityClasses('MuiChipDelete', ['root']);

export default chipDeleteClasses;
