import { SvgIconClassKey } from './SvgIcon';

export type SvgIconClasses = Record<SvgIconClassKey, string>;

declare const svgIconClasses: SvgIconClasses;

export function getSvgIconUtilityClass(slot: string): string;

export default svgIconClasses;
