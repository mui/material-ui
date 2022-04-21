import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListItemButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `palette="primary"`. */
  palettePrimary: string;
  /** Styles applied to the root element if `palette="neutral"`. */
  paletteNeutral: string;
  /** Styles applied to the root element if `palette="danger"`. */
  paletteDanger: string;
  /** Styles applied to the root element if `palette="info"`. */
  paletteInfo: string;
  /** Styles applied to the root element if `palette="success"`. */
  paletteSuccess: string;
  /** Styles applied to the root element if `palette="warning"`. */
  paletteWarning: string;
  /** Styles applied to the root element if `palette="context"`. */
  paletteContext: string;
  /** State class applied to the `component`'s `focusVisibleClassName` prop. */
  focusVisible: string;
  /** State class applied to the inner `component` element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `selected={true}`. */
  selected: string;
  /** State class applied to the root element if `variant="text"`. */
  variantText: string;
  /** State class applied to the root element if `variant="light"`. */
  variantLight: string;
  /** State class applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** State class applied to the root element if `variant="contained"`. */
  variantContained: string;
}

export type ListItemButtonClassKey = keyof ListItemButtonClasses;

export function getListItemButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemButton', slot);
}

const listItemButtonClasses: ListItemButtonClasses = generateUtilityClasses('MuiListItemButton', [
  'root',
  'palettePrimary',
  'paletteNeutral',
  'paletteDanger',
  'paletteInfo',
  'paletteSuccess',
  'paletteWarning',
  'paletteContext',
  'focusVisible',
  'disabled',
  'selected',
  'variantText',
  'variantLight',
  'variantOutlined',
  'variantContained',
]);

export default listItemButtonClasses;
