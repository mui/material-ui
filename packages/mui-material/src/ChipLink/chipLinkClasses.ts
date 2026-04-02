import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface ChipLinkClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ChipLinkClassKey = keyof ChipLinkClasses;

export function getChipLinkUtilityClass(slot: string): string {
  return generateUtilityClass('MuiChipLink', slot);
}

const chipLinkClasses: ChipLinkClasses = generateUtilityClasses('MuiChipLink', ['root']);

export default chipLinkClasses;
