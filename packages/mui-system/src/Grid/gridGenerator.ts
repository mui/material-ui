import { Breakpoints, Breakpoint } from '../createTheme/createBreakpoints';
import { Spacing } from '../createTheme/createSpacing';
import { GridOwnerState } from './GridProps';

interface Props {
  theme: { breakpoints: Breakpoints; spacing?: Spacing };
  ownerState: GridOwnerState & { parentDisableEqualOverflow?: boolean };
}

interface Iterator<T> {
  (appendStyle: (responsizeStyles: Record<string, any>, style: object) => void, value: T): void;
}

export const traverseBreakpoints = <T = unknown>(
  breakpoints: Breakpoints,
  responsize: T | T[] | Record<string, any> | undefined,
  iterator: Iterator<T>,
) => {
  const smallestBreakpoint = breakpoints.keys[0]; // the keys is sorted from smallest to largest by `createBreakpoints`.

  if (Array.isArray(responsize)) {
    responsize.forEach((breakpointValue, index) => {
      iterator((responsizeStyles, style) => {
        if (index <= breakpoints.keys.length - 1) {
          if (index === 0) {
            Object.assign(responsizeStyles, style);
          } else {
            responsizeStyles[breakpoints.up(breakpoints.keys[index])] = style;
          }
        }
      }, breakpointValue as T);
    });
  } else if (responsize && typeof responsize === 'object') {
    // prevent null
    // responsize could be a very big object, pick the smallest responsive values
    const keys =
      Object.keys(responsize).length > breakpoints.keys.length
        ? breakpoints.keys
        : Object.keys(responsize);

    keys.forEach((key) => {
      if (breakpoints.keys.indexOf(key as Breakpoint) !== -1) {
        // @ts-ignore already checked that responsize is an object
        const breakpointValue: T = responsize[key];
        if (breakpointValue !== undefined) {
          iterator((responsizeStyles, style) => {
            if (smallestBreakpoint === key) {
              Object.assign(responsizeStyles, style);
            } else {
              responsizeStyles[breakpoints.up(key as Breakpoint)] = style;
            }
          }, breakpointValue);
        }
      }
    });
  } else if (typeof responsize === 'number' || typeof responsize === 'string') {
    iterator((responsizeStyles, style) => {
      Object.assign(responsizeStyles, style);
    }, responsize);
  }
};

export const generateGridSizeStyles = ({ theme, ownerState }: Props) => {
  const styles = {};
  traverseBreakpoints<'auto' | number | true>(
    theme.breakpoints,
    ownerState.gridSize,
    (appendStyle, value) => {
      let style = {};
      if (value === true) {
        style = {
          flexBasis: 0,
          flexGrow: 1,
          maxWidth: '100%',
        };
      }
      if (value === 'auto') {
        style = {
          flexBasis: 'auto',
          flexGrow: 0,
          flexShrink: 0,
          maxWidth: 'none',
          width: 'auto',
        };
      }
      if (typeof value === 'number') {
        style = {
          flexGrow: 0,
          flexBasis: 'auto',
          width: `calc(100% * ${value} / var(--Grid-columns)${
            ownerState.nested && ownerState.container ? ` + var(--Grid-columnSpacing)` : ''
          })`,
        };
      }
      appendStyle(styles, style);
    },
  );
  return styles;
};

export const generateGridColumnsStyles = ({ theme, ownerState }: Props) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = { '--Grid-columns': 12 };
  traverseBreakpoints<number>(theme.breakpoints, ownerState.columns, (appendStyle, value) => {
    appendStyle(styles, { '--Grid-columns': value });
  });
  return styles;
};

export const generateGridRowSpacingStyles = ({ theme, ownerState }: Props) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = {};
  traverseBreakpoints<number | string>(
    theme.breakpoints,
    ownerState.rowSpacing,
    (appendStyle, value) => {
      appendStyle(styles, {
        '--Grid-rowSpacing': typeof value === 'string' ? value : theme.spacing?.(value),
      });
    },
  );
  return styles;
};

export const generateGridColumnSpacingStyles = ({ theme, ownerState }: Props) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = {};
  traverseBreakpoints<number | string>(
    theme.breakpoints,
    ownerState.columnSpacing,
    (appendStyle, value) => {
      appendStyle(styles, {
        '--Grid-columnSpacing': typeof value === 'string' ? value : theme.spacing?.(value),
      });
    },
  );
  return styles;
};

export const generateGridDirectionStyles = ({ theme, ownerState }: Props) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = {};
  traverseBreakpoints<number | string>(
    theme.breakpoints,
    ownerState.direction,
    (appendStyle, value) => {
      appendStyle(styles, { flexDirection: value });
    },
  );
  return styles;
};

export const generateGridStyles = ({ ownerState }: Props): {} => {
  return {
    minWidth: 0,
    boxSizing: 'border-box',
    ...(ownerState.container
      ? {
          display: 'flex',
          flexWrap: 'wrap',
          ...(ownerState.wrap &&
            ownerState.wrap !== 'wrap' && {
              flexWrap: ownerState.wrap,
            }),
          margin: `calc(var(--Grid-rowSpacing) / -2) calc(var(--Grid-columnSpacing) / -2)`,
          ...(ownerState.nested
            ? {
                padding: `calc(var(--Grid-nested-rowSpacing) / 2) calc(var(--Grid-nested-columnSpacing) / 2)`,
              }
            : {
                '--Grid-nested-rowSpacing': 'var(--Grid-rowSpacing)',
                '--Grid-nested-columnSpacing': 'var(--Grid-columnSpacing)',
              }),
        }
      : {
          padding: `calc(var(--Grid-rowSpacing) / 2) calc(var(--Grid-columnSpacing) / 2)`,
        }),
  };
};

export const generateSizeClassNames = (gridSize: GridOwnerState['gridSize']) => {
  const classNames: string[] = [];
  Object.entries(gridSize).forEach(([key, value]) => {
    if (value !== false && value !== undefined) {
      classNames.push(`grid-${key}-${String(value)}`);
    }
  });
  return classNames;
};

export const generateSpacingClassNames = (
  spacing: GridOwnerState['spacing'],
  smallestBreakpoint: string = 'xs',
) => {
  function isValidSpacing(val: GridOwnerState['spacing'] | null) {
    if (val === undefined) {
      return false;
    }
    return (
      (typeof val === 'string' && !Number.isNaN(Number(val))) ||
      (typeof val === 'number' && val > 0)
    );
  }
  if (isValidSpacing(spacing)) {
    return [`spacing-${smallestBreakpoint}-${String(spacing)}`];
  }
  if (typeof spacing === 'object' && !Array.isArray(spacing)) {
    const classNames: string[] = [];
    Object.entries(spacing).forEach(([key, value]) => {
      if (isValidSpacing(value)) {
        classNames.push(`spacing-${key}-${String(value)}`);
      }
    });
    return classNames;
  }
  return [];
};
