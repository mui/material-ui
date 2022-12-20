import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ListItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the component element if `startAction` element is provided. */
  startAction: string;
  /** Styles applied to the component element if `endAction` element is provided. */
  endAction: string;
  /** Styles applied to the root element, if nested={true}. */
  nested: string;
  /** Styles applied to the root element, if it is under a nested list item. */
  nesting: string;
  /** Styles applied to the root element, if sticky={true}. */
  sticky: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Styles applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
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
  return generateUtilityClass('JoyListItem', slot);
}

const listItemClasses: ListItemClasses = generateUtilityClasses('JoyListItem', [
  'root',
  'startAction',
  'endAction',
  'nested',
  'nesting',
  'sticky',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'variantPlain',
  'variantSoft',
  'variantOutlined',
  'variantSolid',
]);

export default listItemClasses;
