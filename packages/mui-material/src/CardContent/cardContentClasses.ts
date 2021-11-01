import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface CardContentClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type CardContentClassKey = keyof CardContentClasses;

export function getCardContentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCardContent', slot);
}

export const getCardContentClasses = (): CardContentClasses =>
  generateUtilityClasses('MuiCardContent', ['root']);

const cardContentClasses = getCardContentClasses();

export default cardContentClasses;
