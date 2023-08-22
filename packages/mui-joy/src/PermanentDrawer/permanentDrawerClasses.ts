import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface PermanentDrawerClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the content element. */
  content: string;
}

export type PermanentDrawerClassKey = keyof PermanentDrawerClasses;

export function getPermanentDrawerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPermanentDrawer', slot);
}

const permanentDrawerClasses: PermanentDrawerClasses = generateUtilityClasses(
  'MuiPermanentDrawer',
  ['root', 'content'],
);

export default permanentDrawerClasses;
