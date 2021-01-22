import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getLinkUtilityClass(slot) {
  return generateUtilityClass('MuiLink', slot);
}

const linkClasses = generateUtilityClasses('MuiLink', [
  'root',
  'underlineNone',
  'underlineHover',
  'underlineAlways',
  'button',
  'focusVisible',
]);

export default linkClasses;
