import { Breakpoints, Breakpoint } from '../createTheme/createBreakpoints';

type Fn = 'up' | 'down' | 'between' | 'only' | 'not';

interface CssContainerQueries {
  cq: ((name: string) => Pick<Breakpoints, Fn>) & Pick<Breakpoints, Fn>;
}

export default function cssContainerQueries<T extends { breakpoints: Breakpoints }>(
  themeInput: T,
): T & CssContainerQueries {
  function toContainerQuery(key: Fn, name?: string) {
    return (...args: Array<Breakpoint | number>) => {
      // @ts-ignore
      const result = themeInput.breakpoints[key](...args).replace(
        '@media',
        name ? `@container ${name}` : '@container',
      );
      if (key === 'not' && result.includes('not all and')) {
        return result
          .replace('not all and ', '')
          .replace('min-width:', 'width<')
          .replace('max-width:', 'width>');
      }
      return result;
    };
  }
  function cq(name: string) {
    return {
      up: toContainerQuery('up', name),
      down: toContainerQuery('down', name),
      between: toContainerQuery('between', name),
      only: toContainerQuery('only', name),
      not: toContainerQuery('not', name),
    };
  }
  cq.up = toContainerQuery('up');
  cq.down = toContainerQuery('down');
  cq.between = toContainerQuery('between');
  cq.only = toContainerQuery('only');
  cq.not = toContainerQuery('not');
  return {
    ...themeInput,
    cq,
  };
}
