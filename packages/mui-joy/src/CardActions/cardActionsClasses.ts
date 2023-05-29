import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface CardActionsClasses {
  /** Class name applied to the root element. */
  root: string;
}

export type CardActionsClassKey = keyof CardActionsClasses;

export function getCardActionsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCardActions', slot);
}

const cardActionsClasses: CardActionsClasses = generateUtilityClasses('MuiCardActions', ['root']);

export default cardActionsClasses;
