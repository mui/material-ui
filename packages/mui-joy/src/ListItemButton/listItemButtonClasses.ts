import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ListItemButtonClasses {
  /** Styles applied to the root element. */
  root: string;
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
  /** Styles applied to the root element if `color="context"`. */
  colorContext: string;
  /** State class applied to the `component`'s `focusVisibleClassName` prop. */
  focusVisible: string;
  /** State class applied to the inner `component` element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `selected={true}`. */
  selected: string;
  /** State class applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** State class applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** State class applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** State class applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type ListItemButtonClassKey = keyof ListItemButtonClasses;

export function getListItemButtonUtilityClass(slot: string): string {
  return generateUtilityClass('JoyListItemButton', slot);
}

const listItemButtonClasses: ListItemButtonClasses = generateUtilityClasses('JoyListItemButton', [
  'root',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'focusVisible',
  'disabled',
  'selected',
  'variantPlain',
  'variantSoft',
  'variantOutlined',
  'variantSolid',
]);

export default listItemButtonClasses;
