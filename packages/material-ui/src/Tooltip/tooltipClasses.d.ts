import { TooltipClassKey } from './Tooltip';

declare const tooltipClasses: Record<TooltipClassKey, string>;

export function getTooltipUtilityClass(slot: string): string;

export default tooltipClasses;
