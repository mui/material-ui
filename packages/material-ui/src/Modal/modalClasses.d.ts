import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getChipUtilityClass(slot) {
  return generateUtilityClass('MuiChip', slot);
}

const chipClasses = generateUtilityClasses('MuiChip', ['root']);

export default chipClasses;
