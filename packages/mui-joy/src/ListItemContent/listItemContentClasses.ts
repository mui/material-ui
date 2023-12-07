import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ListItemContentClasses {
  /** Class name applied to the root element. */
  root: string;
}

export type ListItemContentClassKey = keyof ListItemContentClasses;

export function getListItemContentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemContent', slot);
}

const listItemContentClasses: ListItemContentClasses = generateUtilityClasses(
  'MuiListItemContent',
  ['root'],
);

export default listItemContentClasses;
