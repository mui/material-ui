import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface LinearProgressClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `determinate` is true. */
  determinate: string;
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
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Class name applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type LinearProgressClassKey = keyof LinearProgressClasses;

export function getLinearProgressUtilityClass(slot: string): string {
  return generateUtilityClass('MuiLinearProgress', slot);
}

const linearProgressClasses: LinearProgressClasses = generateUtilityClasses('MuiLinearProgress', [
  'root',
  'determinate',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default linearProgressClasses;
