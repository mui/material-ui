import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AutocompleteOptionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the `component`'s `focusVisibleClassName` prop. */
  focusVisible: string;
  /** State class applied to the inner `component` element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `selected={true}`. */
  selected: string;
}

export type AutocompleteOptionClassKey = keyof AutocompleteOptionClasses;

export function getAutocompleteOptionUtilityClass(slot: string): string {
  return generateUtilityClass('JoyAutocompleteOption', slot);
}

const menuItemClasses: AutocompleteOptionClasses = generateUtilityClasses('JoyAutocompleteOption', [
  'root',
  'focusVisible',
  'disabled',
  'selected',
]);

export default menuItemClasses;
