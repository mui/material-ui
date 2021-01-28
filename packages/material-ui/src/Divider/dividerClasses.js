import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getDividerUtilityClass(slot) {
  return generateUtilityClass('MuiDivider', slot);
}

const dividerClasses = generateUtilityClasses('MuiDivider', [
  'root',
  'absolute',
  'fullWidth',
  'inset',
  'middle',
  'flexItem',
  'light',
  'vertical',
  'withChildren',
  'withChildrenVertical',
  'textAlignRight',
  'textAlignLeft',
  'wrapper',
  'wrapperVertical',
]);

export default dividerClasses;
