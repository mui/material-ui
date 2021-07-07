import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface MasonryItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to an `img` element to ensure it covers the item. */
  img: string;
  /** Styles applied to a `div` element to ensure it covers the item. */
  div: string;
}

export type MasonryItemClassKey = keyof MasonryItemClasses;

export function getMasonryItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMasonryItem', slot);
}

const masonryItemClasses: MasonryItemClasses = generateUtilityClasses('MuiMasonryItem', [
  'root',
  'img',
  'div',
]);

export default masonryItemClasses;
