import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface TooltipClasses {
  /** Styles applied to the Popper component. */
  popper: string;
  /** Styles applied to the Popper component unless `disableInteractive={true}`. */
  popperInteractive: string;
  /** Styles applied to the Popper component if `arrow={true}`. */
  popperArrow: string;
  /** Styles applied to the Popper component unless the tooltip is open. */
  popperClose: string;
  /** Styles applied to the tooltip (label wrapper) element. */
  tooltip: string;
  /** Styles applied to the tooltip (label wrapper) element if `arrow={true}`. */
  tooltipArrow: string;
  /** Styles applied to the arrow element. */
  arrow: string;
  /** Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. */
  touch: string;
  /** Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
  tooltipPlacementLeft: string;
  /** Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
  tooltipPlacementRight: string;
  /** Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
  tooltipPlacementTop: string;
  /** Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
  tooltipPlacementBottom: string;
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
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type TooltipClassKey = keyof TooltipClasses;

export function getTooltipUtilityClass(slot: string): string {
  return generateUtilityClass('JoyTooltip', slot);
}

const tooltipClasses: TooltipClasses = generateUtilityClasses('JoyTooltip', [
  'popper',
  'popperInteractive',
  'popperArrow',
  'popperClose',
  'tooltip',
  'tooltipArrow',
  'touch',
  'tooltipPlacementLeft',
  'tooltipPlacementRight',
  'tooltipPlacementTop',
  'tooltipPlacementBottom',
  'arrow',
  'colorPrimary',
  'colorDanger',
  'colorInfo',
  'colorNeutral',
  'colorSuccess',
  'colorWarning',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default tooltipClasses;
