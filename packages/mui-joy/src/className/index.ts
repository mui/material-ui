import { unstable_generateUtilityClass, unstable_generateUtilityClasses } from '@mui/utils';

export { unstable_ClassNameGenerator } from '@mui/utils';

export const generateUtilityClass = (componentName: string, slot: string) =>
  unstable_generateUtilityClass(componentName, slot, 'Mui');

export const generateUtilityClasses = <T extends string>(componentName: string, slots: Array<T>) =>
  unstable_generateUtilityClasses(componentName, slots, 'Mui');
