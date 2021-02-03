import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTabScrollButtonUtilityClass(slot) {
  return generateUtilityClass('MuiTabScrollButton', slot);
}

const tabScrollButtonClasses = generateUtilityClasses('MuiTabScrollButton', [
  'root',
  'vertical',
  'horizontal',
  'disabled',
]);

export default tabScrollButtonClasses;
