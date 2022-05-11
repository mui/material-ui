import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface CardContentUpdatedClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type CardContentUpdatedClassKey = keyof CardContentUpdatedClasses;

export function getCardContentUpdatedUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCardContentUpdated', slot);
}

const cardContentClasses: CardContentUpdatedClasses = generateUtilityClasses(
  'MuiCardContentUpdated',
  ['root'],
);

export default cardContentClasses;
