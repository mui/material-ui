import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ListItemClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the component element if `startAction` element is provided. */
  startAction: string;
  /** Class name applied to the component element if `endAction` element is provided. */
  endAction: string;
  /** Class name applied to the root element, if nested={true}. */
  nested: string;
  /** Class name applied to the root element, if it is under a nested list item. */
  nesting: string;
  /** Class name applied to the root element, if sticky={true}. */
  sticky: string;
  /** Class name applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Class name applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Class name applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** State class applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** State class applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** State class applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** State class applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type ListItemClassKey = keyof ListItemClasses;

export function getListItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItem', slot);
}

const listItemClasses: ListItemClasses = generateUtilityClasses('MuiListItem', [
  'root',
  'startAction',
  'endAction',
  'nested',
  'nesting',
  'sticky',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'variantPlain',
  'variantSoft',
  'variantOutlined',
  'variantSolid',
]);

export default listItemClasses;
