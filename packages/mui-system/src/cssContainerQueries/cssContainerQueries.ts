import MuiError from '@mui/internal-babel-macros/MuiError.macro';
import { Breakpoints, Breakpoint } from '../createBreakpoints/createBreakpoints';

interface ContainerQueries {
  up: Breakpoints['up'];
  down: Breakpoints['down'];
  between: Breakpoints['between'];
  only: Breakpoints['only'];
  not: Breakpoints['not'];
}

export interface CssContainerQueries {
  containerQueries: ((name: string) => ContainerQueries) & ContainerQueries;
}

/**
 * For using in `sx` prop to sort the breakpoint from low to high.
 * Note: this function does not work and will not support multiple units.
 *       e.g. input: { '@container (min-width:300px)': '1rem', '@container (min-width:40rem)': '2rem' }
 *            output: { '@container (min-width:40rem)': '2rem', '@container (min-width:300px)': '1rem' } // since 40 < 300 eventhough 40rem > 300px
 */
export function sortContainerQueries(
  theme: Partial<CssContainerQueries>,
  css: Record<string, any>,
) {
  if (!theme.containerQueries) {
    return css;
  }
  const sorted = Object.keys(css)
    .filter((key) => key.startsWith('@container'))
    .sort((a, b) => {
      const regex = /min-width:\s*([0-9.]+)/;
      return +(a.match(regex)?.[1] || 0) - +(b.match(regex)?.[1] || 0);
    });
  if (!sorted.length) {
    return css;
  }
  return sorted.reduce(
    (acc, key) => {
      const value = css[key];
      delete acc[key];
      acc[key] = value;
      return acc;
    },
    { ...css },
  );
}

export function isCqShorthand(breakpointKeys: string[], value: string) {
  return (
    value === '@' ||
    (value.startsWith('@') &&
      (breakpointKeys.some((key) => value.startsWith(`@${key}`)) || !!value.match(/^@\d/)))
  );
}

export function getContainerQuery(theme: CssContainerQueries, shorthand: string) {
  const matches = shorthand.match(/^@([^/]+)?\/?(.+)?$/);
  if (!matches) {
    if (process.env.NODE_ENV !== 'production') {
      throw new MuiError(
        'MUI: The provided shorthand %s is invalid. The format should be `@<breakpoint | number>` or `@<breakpoint | number>/<container>`.\n' +
          'For example, `@sm` or `@600` or `@40rem/sidebar`.',
        `(${shorthand})`,
      );
    }
    return null;
  }
  const [, containerQuery, containerName] = matches;
  const value = (Number.isNaN(+containerQuery) ? containerQuery || 0 : +containerQuery) as
    | Breakpoint
    | number;
  return theme.containerQueries(containerName).up(value);
}

export default function cssContainerQueries<T extends { breakpoints: Breakpoints }>(
  themeInput: T,
): T & CssContainerQueries {
  const toContainerQuery = (mediaQuery: string, name?: string) =>
    mediaQuery.replace('@media', name ? `@container ${name}` : '@container');

  function attachCq(node: any, name?: string) {
    node.up = (...args: Parameters<Breakpoints['up']>) =>
      toContainerQuery(themeInput.breakpoints.up(...args), name);

    node.down = (...args: Parameters<Breakpoints['down']>) =>
      toContainerQuery(themeInput.breakpoints.down(...args), name);

    node.between = (...args: Parameters<Breakpoints['between']>) =>
      toContainerQuery(themeInput.breakpoints.between(...args), name);

    node.only = (...args: Parameters<Breakpoints['only']>) =>
      toContainerQuery(themeInput.breakpoints.only(...args), name);

    node.not = (...args: Parameters<Breakpoints['not']>) => {
      const result = toContainerQuery(themeInput.breakpoints.not(...args), name);
      if (result.includes('not all and')) {
        // `@container` does not work with `not all and`, so need to invert the logic
        return result
          .replace('not all and ', '')
          .replace('min-width:', 'width<')
          .replace('max-width:', 'width>')
          .replace('and', 'or');
      }
      return result;
    };
  }
  const node = {};
  const containerQueries = ((name: string) => {
    attachCq(node, name);
    return node;
  }) as CssContainerQueries['containerQueries'];

  attachCq(containerQueries);

  return {
    ...themeInput,
    containerQueries,
  };
}
