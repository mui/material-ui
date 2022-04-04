import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface CardCoverClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type CardCoverClassKey = keyof CardCoverClasses;

export function getCardCoverUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCardCover', slot);
}

const cardCoverClasses: CardCoverClasses = generateUtilityClasses('MuiCardCover', ['root']);

export default cardCoverClasses;
