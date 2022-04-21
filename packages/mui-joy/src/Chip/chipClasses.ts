import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ChipClasses {
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
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the endDecorator element if supplied. */
  endDecorator: string;
  /** State class applied to the root element if keyboard focused. */
  focusVisible: string;
  /** Styles applied to the label `span` element. */
  label: string;
  /** Styles applied to the label `span` element if `size="sm"`. */
  labelSm: string;
  /** Styles applied to the label `span` element if `size="md"`. */
  labelMd: string;
  /** Styles applied to the label `span` element if `size="lg"`. */
  labelLg: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Styles applied to the startDecorator element if supplied. */
  startDecorator: string;
  /** Styles applied to the root element if `variant="contained"`. */
  variantContained: string;
  /** Styles applied to the root element if `variant="light"`. */
  variantLight: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
}

export type ChipClassKey = keyof ChipClasses;

export function getChipUtilityClass(slot: string): string {
  return generateUtilityClass('MuiChip', slot);
}

const chipClasses: ChipClasses = generateUtilityClasses('MuiChip', [
  'root',
  'clickable',
  'palettePrimary',
  'paletteNeutral',
  'paletteDanger',
  'paletteInfo',
  'paletteSuccess',
  'paletteWarning',
  'disabled',
  'endDecorator',
  'focusVisible',
  'label',
  'labelSm',
  'labelMd',
  'labelLg',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'startDecorator',
  'variantContained',
  'variantLight',
  'variantOutlined',
]);

export default chipClasses;
