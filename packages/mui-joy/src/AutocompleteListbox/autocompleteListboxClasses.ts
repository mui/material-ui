import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AutocompleteListboxClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Classname applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Classname applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Classname applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Classname applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Classname applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Classname applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Classname applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Classname applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Classname applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Classname applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Classname applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Classname applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Classname applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type AutocompleteListboxClassKey = keyof AutocompleteListboxClasses;

export function getAutocompleteListboxUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAutocompleteListbox', slot);
}

const autocompleteListboxClasses: AutocompleteListboxClasses = generateUtilityClasses(
  'MuiAutocompleteListbox',
  [
    'root',
    'sizeSm',
    'sizeMd',
    'sizeLg',
    'colorPrimary',
    'colorNeutral',
    'colorDanger',
    'colorInfo',
    'colorSuccess',
    'colorWarning',
    'colorContext',
    'variantPlain',
    'variantOutlined',
    'variantSoft',
    'variantSolid',
  ],
);

export default autocompleteListboxClasses;
