import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface TooltipClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `arrow={true}`. */
  tooltipArrow: string;
  /** Class name applied to the arrow element. */
  arrow: string;
  /** Class name applied to the root element if the tooltip is opened by touch. */
  touch: string;
  /** Class name applied to the root element if `placement` contains "left". */
  placementLeft: string;
  /** Class name applied to the root element if `placement` contains "right". */
  placementRight: string;
  /** Class name applied to the root element if `placement` contains "top". */
  placementTop: string;
  /** Class name applied to the root element if `placement` contains "bottom". */
  placementBottom: string;
  /** Class name applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the root element if `color="neutral"`. */
  colorNeutral: string;
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

export type TooltipClassKey = keyof TooltipClasses;

export function getTooltipUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTooltip', slot);
}

const tooltipClasses: TooltipClasses = generateUtilityClasses('MuiTooltip', [
  'root',
  'tooltipArrow',
  'arrow',
  'touch',
  'placementLeft',
  'placementRight',
  'placementTop',
  'placementBottom',
  'colorPrimary',
  'colorDanger',
  'colorNeutral',
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

export default tooltipClasses;
