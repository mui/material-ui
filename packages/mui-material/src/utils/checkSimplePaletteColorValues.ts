import { PaletteColorOptions, SimplePaletteColorOptions } from '../styles/createPalette';

function hasCorrectMainProperty(obj: PaletteColorOptions): obj is SimplePaletteColorOptions {
  return typeof (obj as SimplePaletteColorOptions).main === 'string';
}

/**
 * Checks if the object conforms to the SimplePaletteColorOptions type.
 * The minimum requirement is that the object has a "main" property of type string, this is always checked.
 * Optionally, you can pass additional properties to check.
 *
 * @param obj - The object to check
 * @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
 * @returns boolean
 */
export default function checkSimplePaletteColorValues(
  obj: PaletteColorOptions,
  additionalPropertiesToCheck: (keyof Omit<SimplePaletteColorOptions, 'main'>)[] = [],
): boolean {
  if (!hasCorrectMainProperty(obj)) {
    return false;
  }

  for (const value of additionalPropertiesToCheck) {
    if (!obj.hasOwnProperty(value) || typeof obj[value] !== 'string') {
      return false;
    }
  }

  return true;
}
