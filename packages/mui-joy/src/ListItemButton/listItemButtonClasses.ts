import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

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
  /** State class applied to the root element if `selectedVariant="light"`. */
  selectedVariantLight: string;
  /** State class applied to the root element if `selectedVariant="outlined"`. */
  selectedVariantOutlined: string;
  /** State class applied to the root element if `selectedVariant="contained"`. */
  selectedVariantContained: string;
}

export type ListItemButtonClassKey = keyof ListItemButtonClasses;

export function getListItemButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemButton', slot);
}

const listItemButtonClasses: ListItemButtonClasses = generateUtilityClasses('MuiListItemButton', [
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
  'selectedVariantLight',
  'selectedVariantOutlined',
  'selectedVariantContained',
]);

export default listItemButtonClasses;
