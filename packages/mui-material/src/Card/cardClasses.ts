import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface CardClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type CardClassKey = keyof CardClasses;

export function getCardUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCard', slot);
}

export const getCardClasses = (): CardClasses => generateUtilityClasses('MuiCard', ['root']);

const cardClasses = getCardClasses();

export default cardClasses;
