import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface CardCoverClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type CardCoverClassKey = keyof CardCoverClasses;

export function getCardCoverUtilityClass(slot: string): string {
  return generateUtilityClass('JoyCardCover', slot);
}

const cardCoverClasses: CardCoverClasses = generateUtilityClasses('JoyCardCover', ['root']);

export default cardCoverClasses;
