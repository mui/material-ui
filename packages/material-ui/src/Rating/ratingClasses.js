import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getRatingUtilityClass(slot) {
  return generateUtilityClass('MuiRating', slot);
}

const ratingClasses = generateUtilityClasses('MuiRating', [
  'root',
  'sizeSmall',
  'sizeMedium',
  'sizeLarge',
  'readOnly',
  'disabled',
  'focusVisible',
  'visuallyHidden',
  'pristine',
  'label',
  'icon',
  'iconEmpty',
  'iconFilled',
  'iconHover',
  'iconFocus',
  'iconActive',
  'decimal',
]);

export default ratingClasses;
