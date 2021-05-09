import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getSelectFieldUtilityClasses(slot) {
  return generateUtilityClass('MuiSelectField', slot);
}

const selectClasses = generateUtilityClasses('MuiSelectField', ['root']);

export default selectClasses;
