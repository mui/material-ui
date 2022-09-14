import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AutocompleteClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** State class applied to the root element if focused. */
  focused: string;
  /** Styles applied to the tag elements, e.g. the chips. */
  tag: string;
  /** Styles applied when the popup icon is rendered. */
  hasPopupIcon: string;
  /** Styles applied when the clear icon is rendered. */
  hasClearIcon: string;
  /** Styles applied to the clear indicator. */
  clearIndicator: string;
  /** Styles applied to the popup indicator. */
  popupIndicator: string;
  /** Styles applied to the popup indicator if the popup is open. */
  popupIndicatorOpen: string;
  /** Styles applied to the listbox component. */
  listbox: string;
  /** Styles applied to the loading wrapper. */
  loading: string;
  /** Styles applied to the no option wrapper. */
  noOptions: string;
}

export type AutocompleteClassKey = keyof AutocompleteClasses;

export function getAutocompleteUtilityClass(slot: string): string {
  return generateUtilityClass('JoyAutocomplete', slot);
}

const autocompleteClasses: AutocompleteClasses = generateUtilityClasses('JoyAutocomplete', [
  'root',
  'fullWidth',
  'focused',
  'tag',
  'hasPopupIcon',
  'hasClearIcon',
  'clearIndicator',
  'popupIndicator',
  'popupIndicatorOpen',
  'listbox',
  'loading',
  'noOptions',
]);

export default autocompleteClasses;
