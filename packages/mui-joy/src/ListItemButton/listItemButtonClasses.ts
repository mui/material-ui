import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ListItemButtonClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element, if `orientation="vertical"`. */
  vertical: string;
  /** Class name applied to the root element, if `orientation="horizontal"`. */
  horizontal: string;
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
  /** Class name applied to the root element if `color="context"`. */
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
  return generateUtilityClass('MuiListItemButton', slot);
}

const listItemButtonClasses: ListItemButtonClasses = generateUtilityClasses('MuiListItemButton', [
  'root',
  'horizontal',
  'vertical',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
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
