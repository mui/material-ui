import { ScopedCssBaselineClassKey } from './ScopedCssBaseline';

declare const ScopedCssBaselineClasses: Record<ScopedCssBaselineClassKey, string>;

export function getScopedCssBaselineUtilityClass(slot: string): string;

export default ScopedCssBaselineClasses;
