import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getSelectUtilityClasses(slot) {
  return generateUtilityClass('MuiSelect', slot);
}

const selectClasses = generateUtilityClasses('MuiSelect', [
  'root',
  'select',
  'filled',
  'outlined',
  'selectMenu',
  'disabled',
  'focused',
  'icon',
  'iconOpen',
  'iconFilled',
  'iconOutlined',
  'nativeInput',
]);

export default selectClasses;
