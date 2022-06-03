import { unstable_generateUtilityClass, unstable_generateUtilityClasses } from '@mui/utils';

/**
 * Caution! this module must not include unstyled components import from `@mui/base`, otherwise, it will break the ClassNameGenerator.
 * ❌ import { ... } from '@mui/base';
 * ✅ import { ... } from '@mui/base/utils'; // must be specific base module
 *
 * Issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401
 */

// eslint-disable-next-line import/prefer-default-export
export { unstable_ClassNameGenerator } from '@mui/base/className';

export const generateUtilityClass = (componentName: string, slot: string) =>
  unstable_generateUtilityClass(componentName, slot, 'Joy');

export const generateUtilityClasses = <T extends string>(componentName: string, slots: Array<T>) =>
  unstable_generateUtilityClasses(componentName, slots, 'Joy');
