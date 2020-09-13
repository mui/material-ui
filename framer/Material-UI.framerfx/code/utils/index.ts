import camelCase from 'lodash/camelCase';

/**
 * Checks if the color string is a Framer Shared Color token and extracts
 * the underlying color or returns the original string.
 * @param {string} color - A Framer Shared Color Token/regular CSS color
 * @returns {string} A valid HTML color string
 *
 * @example
 *  console.log(parseColor('var(--token-73eaaa94-88d1-416e-9e22-e09837612534, rgb(0, 0, 0))')); // rgb(0, 0, 0)
 *
 */
export function parseColor(color: string): string {
  const colorTokenRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;

  const colorToken = color.match(colorTokenRegex);

  return colorToken ? colorToken[2] : color;
}

export function pascalCase(s: string): string {
  return s.charAt(0).toUpperCase() + camelCase(s).slice(1);
}
