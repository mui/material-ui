const colorTokenRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;

export function parseColor(color: string): string {
  const colorToken = color.match(colorTokenRegex);

  return colorToken ? colorToken[2] : color;
}
