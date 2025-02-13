/* eslint-disable import/prefer-default-export */
export function createGetColorSchemeSelector<T extends string>(
  selector: 'media' | 'class' | 'data' | string,
) {
  return function getColorSchemeSelector(colorScheme: T) {
    if (selector === 'media') {
      if (process.env.NODE_ENV !== 'production') {
        if (colorScheme !== 'light' && colorScheme !== 'dark') {
          console.error(
            `MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${colorScheme}'.`,
          );
        }
      }
      return `@media (prefers-color-scheme: ${colorScheme})`;
    }
    if (selector) {
      if (selector.startsWith('data-') && !selector.includes('%s')) {
        return `[${selector}="${colorScheme}"] &`;
      }
      if (selector === 'class') {
        return `.${colorScheme} &`;
      }
      if (selector === 'data') {
        return `[data-${colorScheme}] &`;
      }
      return `${selector.replace('%s', colorScheme)} &`;
    }
    return '&';
  };
}
