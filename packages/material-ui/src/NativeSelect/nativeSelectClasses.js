import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getNativeSelectUtilitiyClasses(slot) {
  return generateUtilityClass('MuiSelect', slot);
}

const nativeSelectClasses = generateUtilityClasses('MuiSelect', [
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

export default nativeSelectClasses;
