import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface NestedListClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type NestedListClassKey = keyof NestedListClasses;

export function getNestedListUtilityClass(slot: string): string {
  return generateUtilityClass('MuiNestedList', slot);
}

const nestedListClasses: NestedListClasses = generateUtilityClasses('MuiNestedList', ['root']);

export default nestedListClasses;
