import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface TooltipClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `arrow={true}`. */
  tooltipArrow: string;
  /** Styles applied to the arrow element. */
  arrow: string;
  /** Styles applied to the root element if the tooltip is opened by touch. */
  touch: string;
  /** Styles applied to the root element if `placement` contains "left". */
  placementLeft: string;
  /** Styles applied to the root element if `placement` contains "right". */
  placementRight: string;
  /** Styles applied to the root element if `placement` contains "top". */
  placementTop: string;
  /** Styles applied to the root element if `placement` contains "bottom". */
  placementBottom: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Styles applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `variant="solid"`. */
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
  'colorInfo',
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
