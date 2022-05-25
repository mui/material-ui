import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface CardContentClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type CardContentClassKey = keyof CardContentClasses;

export function getCardContentUtilityClass(slot: string): string {
  return generateUtilityClass('JoyCardContent', slot);
}

const cardClasses: CardContentClasses = generateUtilityClasses('JoyCardContent', ['root']);

export default cardClasses;
