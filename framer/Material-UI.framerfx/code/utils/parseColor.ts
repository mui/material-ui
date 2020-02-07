const colorTokenRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;

/**
 * Checks if the color string is a Framer Shared Color token and extracts
 * the underlying color or returns the original string.
 *
 * @param {string} color - A Framer Shared Color Token/regular CSS color
 * @return {string} A valid HTML color string
 *
 * @example
 *  console.log(parseColor('var(--token-73eaaa94-88d1-416e-9e22-e09837612534, rgb(0, 0, 0))')); // rgb(0, 0, 0)
 *
 */
export function parseColor(color: string): string {
  const colorToken = color.match(colorTokenRegex);

  return colorToken ? colorToken[2] : color;
}
