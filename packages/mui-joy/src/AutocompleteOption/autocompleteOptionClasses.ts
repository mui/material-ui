import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AutocompleteOptionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the `component`'s `focusVisibleClassName` prop. */
  focusVisible: string;
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
  /** State class applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** State class applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** State class applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** State class applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type AutocompleteOptionClassKey = keyof AutocompleteOptionClasses;

export function getAutocompleteOptionUtilityClass(slot: string): string {
  return generateUtilityClass('JoyAutocompleteOption', slot);
}

const autocompleteOptionClasses: AutocompleteOptionClasses = generateUtilityClasses(
  'JoyAutocompleteOption',
  [
    'root',
    'focusVisible',
    'colorPrimary',
    'colorNeutral',
    'colorDanger',
    'colorInfo',
    'colorSuccess',
    'colorWarning',
    'variantPlain',
    'variantSoft',
    'variantOutlined',
    'variantSolid',
  ],
);

export default autocompleteOptionClasses;
