import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getNativeSelectUtilitiyClasses(slot) {
  return generateUtilityClass('MuiNativeSelect', slot);
}

const nativeSelectClasses = generateUtilityClasses('MuiNativeSelect', [
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
