import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface CardClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
}

export type CardClassKey = keyof CardClasses;

export function getCardUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCard', slot);
}

const cardClasses: CardClasses = generateUtilityClasses('MuiCard', [
  'root',
  'sizeSm',
  'sizeMd',
  'sizeLg',
]);

export default cardClasses;
