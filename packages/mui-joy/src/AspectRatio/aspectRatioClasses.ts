import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AspectRatioClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the content element. */
  content: string;
  /** Styles applied to the content element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the content element if `color="neutral"`. */
  colorNeutral: string;
  /** Styles applied to the content element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the content element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the content element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the content element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Styles applied to the content element if `variant="plain"`. */
  variantPlain: string;
  /** Styles applied to the content element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the content element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the content element if `variant="solid"`. */
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
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default aspectRatioClasses;
