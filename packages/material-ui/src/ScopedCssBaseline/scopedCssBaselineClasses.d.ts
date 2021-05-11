import { ScopedCssBaselineClassKey } from './ScopedCssBaseline';

declare const scopedCssBaselineClasses: Record<ScopedCssBaselineClassKey, string>;

export function getScopedCssBaselineUtilityClass(slot: string): string;

export default scopedCssBaselineClasses;
