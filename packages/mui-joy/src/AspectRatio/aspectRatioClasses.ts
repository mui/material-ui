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
  return generateUtilityClass('JoyAspectRatio', slot);
}

const aspectRatioClasses: AspectRatioClasses = generateUtilityClasses('JoyAspectRatio', [
  'root',
  'content',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default aspectRatioClasses;
