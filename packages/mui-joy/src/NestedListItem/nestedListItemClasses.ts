import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface NestedListItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the component element if `children` includes `NestedListItemSecondaryAction`. */
  secondaryAction: string;
  /** Styles applied to the root element, if sticky={true}. */
  sticky: string;
}

export type NestedListItemClassKey = keyof NestedListItemClasses;

export function getNestedListItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiNestedListItem', slot);
}

const listItemClasses: NestedListItemClasses = generateUtilityClasses('MuiNestedListItem', [
  'root',
  'secondaryAction',
  'sticky',
]);

export default listItemClasses;
