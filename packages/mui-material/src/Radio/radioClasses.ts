import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface RadioClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `checked={true}`. */
  checked: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
}

export type RadioClassKey = keyof RadioClasses;

export function getRadioUtilityClass(slot: string): string {
  return generateUtilityClass('MuiRadio', slot);
}

export const getRadioClasses = (): RadioClasses =>
  generateUtilityClasses('MuiRadio', [
    'root',
    'checked',
    'disabled',
    'colorPrimary',
    'colorSecondary',
  ]);

const radioClasses = getRadioClasses();

export default radioClasses;
