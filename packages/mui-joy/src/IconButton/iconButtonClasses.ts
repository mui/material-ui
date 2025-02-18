import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface IconButtonClasses {
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
  /** Class name applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** State class applied to the root element if the button is keyboard focused. */
  focusVisible: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Class name applied to the root element if `loading={true}`. */
  loading: string;
  /** Class name applied to the loading indicator slot element. */
  loadingIndicator: string;
}

export type IconButtonClassKey = keyof IconButtonClasses;

export function getIconButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiIconButton', slot);
}

const iconButtonClasses: IconButtonClasses = generateUtilityClasses('MuiIconButton', [
  'root',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
  'focusVisible',
  'disabled',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'loading',
  'loadingIndicator',
]);

export default iconButtonClasses;
