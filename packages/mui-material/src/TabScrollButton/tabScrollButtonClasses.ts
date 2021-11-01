import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface TabScrollButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
}

export type TabScrollButtonClassKey = keyof TabScrollButtonClasses;

export function getTabScrollButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTabScrollButton', slot);
}

export const getTabScrollButtonClasses = (): TabScrollButtonClasses =>
  generateUtilityClasses('MuiTabScrollButton', ['root', 'vertical', 'horizontal', 'disabled']);

const tabScrollButtonClasses = getTabScrollButtonClasses();

export default tabScrollButtonClasses;
