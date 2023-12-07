import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AspectRatioClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the content element. */
  content: string;
  /** Class name applied to the content element if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the content element if `color="neutral"`. */
  colorNeutral: string;
  /** Class name applied to the content element if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the content element if `color="success"`. */
  colorSuccess: string;
  /** Class name applied to the content element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Class name applied to the content element if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the content element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the content element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the content element if `variant="solid"`. */
  variantSolid: string;
}

export type AspectRatioClassKey = keyof AspectRatioClasses;

export function getAspectRatioUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAspectRatio', slot);
}

const aspectRatioClasses: AspectRatioClasses = generateUtilityClasses('MuiAspectRatio', [
  'root',
  'content',
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
]);

export default aspectRatioClasses;
