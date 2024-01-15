import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

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

const cardActionsClasses: CardActionsClasses = generateUtilityClasses('MuiCardActions', [
  'root',
  'spacing',
]);

export default cardActionsClasses;
