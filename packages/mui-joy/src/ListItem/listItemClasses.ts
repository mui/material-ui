import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the component element if `startAction` element is provided. */
  startAction: string;
  /** Styles applied to the component element if `endAction` element is provided. */
  endAction: string;
  /** Styles applied to the root element, if nested={true}. */
  nested: string;
  /** Styles applied to the root element, if sticky={true}. */
  sticky: string;
}

export type ListItemClassKey = keyof ListItemClasses;

export function getListItemUtilityClass(slot: string): string {
  return generateUtilityClass('JoyListItem', slot);
}

const listItemClasses: ListItemClasses = generateUtilityClasses('JoyListItem', [
  'root',
  'startAction',
  'endAction',
  'nested',
  'sticky',
]);

export default listItemClasses;
