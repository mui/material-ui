import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getSelectUtilitiyClasses(slot) {
  return generateUtilityClass('MuiSelect', slot);
}

const selectClasses = generateUtilityClasses('MuiSelect', [
  'root',
  'select',
  'filled',
  'outlined',
  'selectMenu',
  'disabled',
  'icon',
  'iconOpen',
  'iconFilled',
  'iconOutlined',
  'nativeInput',
]);

export default selectClasses;
