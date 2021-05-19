import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getCardActionAreaUtilityClass(slot) {
  return generateUtilityClass('MuiCardActionArea', slot);
}

const cardActionAreaClasses = generateUtilityClasses('MuiCardActionArea', [
  'root',
  'focusVisible',
  'focusHighlight',
]);

export default cardActionAreaClasses;
