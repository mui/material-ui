export interface TooltipClasses {
  popper: string;
  popperInteractive: string;
  popperArrow: string;
  tooltip: string;
  tooltipArrow: string;
  touch: string;
  tooltipPlacementLeft: string;
  tooltipPlacementRight: string;
  tooltipPlacementTop: string;
  tooltipPlacementBottom: string;
  arrow: string;
}

declare const tooltipClasses: TooltipClasses;

export function getTooltipUtilityClass(slot: string): string;

export default tooltipClasses;
