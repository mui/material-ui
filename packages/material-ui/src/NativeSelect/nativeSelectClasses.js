import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getNativeSelectUtilityClasses(slot) {
  return generateUtilityClass('MuiNativeSelect', slot);
}

const nativeSelectClasses = generateUtilityClasses('MuiNativeSelect', [
  'root',
  'select',
  'filled',
  'outlined',
  'standard',
  'disabled',
  'icon',
  'iconOpen',
  'iconFilled',
  'iconOutlined',
  'iconStandard',
  'nativeInput',
]);

export default nativeSelectClasses;
