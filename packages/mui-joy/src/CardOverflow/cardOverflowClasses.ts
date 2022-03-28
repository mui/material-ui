import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface CardOverflowClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type CardOverflowClassKey = keyof CardOverflowClasses;

export function getCardOverflowUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCardOverflow', slot);
}

const aspectRatioClasses: CardOverflowClasses = generateUtilityClasses('MuiCardOverflow', ['root']);

export default aspectRatioClasses;
