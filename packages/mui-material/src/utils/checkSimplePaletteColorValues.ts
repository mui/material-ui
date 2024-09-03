import { PaletteColorOptions, SimplePaletteColorOptions } from '../styles/createPalette';

function isSimplePaletteColor(obj: PaletteColorOptions): obj is SimplePaletteColorOptions {
  return typeof (obj as SimplePaletteColorOptions).main === 'string';
}

/**
 * Checks if the object conforms to the SimplePaletteColorOptions type.
 * The minimum requirement is that the object has a "main" property of type string, this is always checked.
 * Optionally, you can pass additional properties to check.
 *
 * @param obj - The object to check
 * @param optionalValuesToCheck - Array with "light", "dark", and/or "contrastText"
 * @returns boolean
 */
export default function checkSimplePaletteColorValues(
  obj: PaletteColorOptions,
  optionalValuesToCheck: (keyof SimplePaletteColorOptions)[] = [],
): boolean {
  if (!isSimplePaletteColor(obj)) {
    return false;
  }

  for (const value of optionalValuesToCheck) {
    if (!obj.hasOwnProperty(value) || typeof obj[value] !== 'string') {
      return false;
    }
  }

  return true;
}
