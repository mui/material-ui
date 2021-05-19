import { AutocompleteClassKey } from './Autocomplete';

declare const autocompleteClasses: Record<AutocompleteClassKey, string>;

export function getAutocompleteUtilityClass(slot: string): string;

export default autocompleteClasses;
