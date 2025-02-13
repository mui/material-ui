import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface CardActionAreaClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the ButtonBase root element if the action area is keyboard focused. */
  focusVisible: string;
  /** Styles applied to the overlay that covers the action area when it is keyboard focused. */
  focusHighlight: string;
}

export type CardActionAreaClassKey = keyof CardActionAreaClasses;

export function getCardActionAreaUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCardActionArea', slot);
}

const cardActionAreaClasses: CardActionAreaClasses = generateUtilityClasses('MuiCardActionArea', [
  'root',
  'focusVisible',
  'focusHighlight',
]);

export default cardActionAreaClasses;
