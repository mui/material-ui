import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AutocompleteClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the wrapper element. */
  wrapper: string;
  /** Class name applied to the input element. */
  input: string;
  /** Class name applied to the startDecorator element. */
  startDecorator: string;
  /** Class name applied to the endDecorator element. */
  endDecorator: string;
  /** Class name applied to the root element if the component is a descendant of `FormControl`. */
  formControl: string;
  /** Class name applied to the root element if the component is focused. */
  focused: string;
  /** Class name applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** Class name applied to the wrapper element if `multiple={true}`. */
  multiple: string;
  /** Class name applied to the limitTag element. */
  limitTag: string;
  /** Class name applied when the popup icon is rendered. */
  hasPopupIcon: string;
  /** Class name applied when the clear icon is rendered. */
  hasClearIcon: string;
  /** Class name applied to the clear indicator. */
  clearIndicator: string;
  /** Class name applied to the popup indicator. */
  popupIndicator: string;
  /** Class name applied to the popup indicator if the popup is open. */
  popupIndicatorOpen: string;
  /** Class name applied to the listbox component. */
  listbox: string;
  /** Class name applied to the option component. */
  option: string;
  /** Class name applied to the loading wrapper. */
  loading: string;
  /** Class name applied to the no option wrapper. */
  noOptions: string;
  /** Class name applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Class name applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Class name applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Class name applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type AutocompleteClassKey = keyof AutocompleteClasses;

export function getAutocompleteUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAutocomplete', slot);
}

const autocompleteClasses: AutocompleteClasses = generateUtilityClasses('MuiAutocomplete', [
  'root',
  'wrapper',
  'input',
  'startDecorator',
  'endDecorator',
  'formControl',
  'focused',
  'disabled',
  'error',
  'multiple',
  'limitTag',
  'hasPopupIcon',
  'hasClearIcon',
  'clearIndicator',
  'popupIndicator',
  'popupIndicatorOpen',
  'listbox',
  'option',
  'loading',
  'noOptions',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default autocompleteClasses;
