import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ChipClasses {
  /** Class name applied to the root element. */
  root: string;
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
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Class name applied to the endDecorator element if supplied. */
  endDecorator: string;
  /** State class applied to the root element if keyboard focused. */
  focusVisible: string;
  /** Class name applied to the label `span` element. */
  label: string;
  /** Class name applied to the label `span` element if `size="sm"`. */
  labelSm: string;
  /** Class name applied to the label `span` element if `size="md"`. */
  labelMd: string;
  /** Class name applied to the label `span` element if `size="lg"`. */
  labelLg: string;
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Class name applied to the startDecorator element if supplied. */
  startDecorator: string;
  /** Class name applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
}

export type ChipClassKey = keyof ChipClasses;

export function getChipUtilityClass(slot: string): string {
  return generateUtilityClass('MuiChip', slot);
}

const chipClasses: ChipClasses = generateUtilityClasses('MuiChip', [
  'root',
  'clickable',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
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
  'variantPlain',
  'variantSolid',
  'variantSoft',
  'variantOutlined',
]);

export default chipClasses;
