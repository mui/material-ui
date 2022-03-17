import generateUtilityClasses from '../generateUtilityClasses';
import generateUtilityClass from '../generateUtilityClass';

export interface BackdropUnstyledClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type BackdropUnstyledClassKey = keyof BackdropUnstyledClasses;

export function getBackdropUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBackdropUnstyled', slot);
}

const backdropUnstyledClasses: BackdropUnstyledClasses = generateUtilityClasses(
  'MuiBackdropUnstyled',
  ['root'],
);

export default backdropUnstyledClasses;
