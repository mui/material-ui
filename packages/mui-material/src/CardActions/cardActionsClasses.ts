import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface CardActionsClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element unless `disableSpacing={true}`. */
  spacing: string;
}

export type CardActionsClassKey = keyof CardActionsClasses;

export function getCardActionsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCardActions', slot);
}

export const getCardActionsClasses = (): CardActionsClasses =>
  generateUtilityClasses('MuiCardActions', ['root', 'spacing']);

const cardActionsClasses = getCardActionsClasses();

export default cardActionsClasses;
