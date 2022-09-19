import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface DividerClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Styles applied to the root element if `inset="context"`. */
  insetContext: string;
}

export type DividerClassKey = keyof DividerClasses;

export function getDividerUtilityClass(slot: string): string {
  return generateUtilityClass('JoyDivider', slot);
}

const dividerClasses: DividerClasses = generateUtilityClasses('JoyDivider', [
  'root',
  'vertical',
  'insetContext',
]);

export default dividerClasses;
