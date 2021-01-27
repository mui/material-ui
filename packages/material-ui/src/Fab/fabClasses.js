import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getFabUtilityClass(slot) {
  return generateUtilityClass('MuiFab', slot);
}

const fabClasses = generateUtilityClasses('MuiFab', [
  'root',
  'label',
  'primary',
  'secondary',
  'extended',
  'circular',
  'focusVisible',
  'disabled',
  'colorInherit',
  'sizeSmall',
  'sizeMedium',
  'sizeLarge',
]);

export default fabClasses;
