import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export function getHiddenCssUtilityClass(slot: string) {
  return generateUtilityClass('PrivateHiddenCss', slot);
}

const hiddenCssClasses = generateUtilityClasses('PrivateHiddenCss', [
  'root',
  'xlDown',
  'xlUp',
  'onlyXl',
  'lgDown',
  'lgUp',
  'onlyLg',
  'mdDown',
  'mdUp',
  'onlyMd',
  'smDown',
  'smUp',
  'onlySm',
  'xsDown',
  'xsUp',
  'onlyXs',
]);

export default hiddenCssClasses;
