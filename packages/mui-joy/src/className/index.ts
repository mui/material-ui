import unstable_generateUtilityClass from '@mui/utils/generateUtilityClass';
import unstable_generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export { default as unstable_ClassNameGenerator } from '@mui/utils/ClassNameGenerator';

export const generateUtilityClass = (componentName: string, slot: string) =>
  unstable_generateUtilityClass(componentName, slot, 'Mui');

export const generateUtilityClasses = <T extends string>(componentName: string, slots: Array<T>) =>
  unstable_generateUtilityClasses(componentName, slots, 'Mui');
