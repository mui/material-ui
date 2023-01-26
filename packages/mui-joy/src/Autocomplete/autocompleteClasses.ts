import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AutocompleteClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the wrapper element. */
  wrapper: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the startDecorator element. */
  startDecorator: string;
  /** Styles applied to the endDecorator element. */
  endDecorator: string;
  /** Styles applied to the root element if the component is a descendant of `FormControl`. */
  formControl: string;
  /** Styles applied to the root element if the component is focused. */
  focused: string;
  /** Styles applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** Styles applied to the wrapper element if `multiple={true}`. */
  multiple: string;
  /** Styles applied to the limitTag element. */
  limitTag: string;
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
  /** Styles applied to the option component. */
  option: string;
  /** Styles applied to the loading wrapper. */
  loading: string;
  /** Styles applied to the no option wrapper. */
  noOptions: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Styles applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Styles applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type AutocompleteClassKey = keyof AutocompleteClasses;

export function getAutocompleteUtilityClass(slot: string): string {
  return generateUtilityClass('JoyAutocomplete', slot);
}

const autocompleteClasses: AutocompleteClasses = generateUtilityClasses('JoyAutocomplete', [
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
  'colorInfo',
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
