import * as React from 'react';
import styled from '../styled';
import { extendSxProp } from '../styleFunctionSx';
import type { GridProps } from './GridProps';

const NestedContext = React.createContext(false);
const ImplementationContext = React.createContext(false);

const generateGrid = (
  value: number | boolean | 'auto' | undefined,
  spread: boolean | undefined,
) => {
  if (value === true) {
    return {
      flexBasis: 0,
      flexGrow: 1,
      maxWidth: '100%',
    };
  }
  if (value === 'auto') {
    return {
      flexBasis: 'auto',
      flexGrow: 0,
      flexShrink: 0,
      maxWidth: 'none',
      width: 'auto',
    };
  }
  if (typeof value === 'number') {
    return {
      width: `calc(100% * ${value} / var(--Grid-container-columns)${
        spread ? ` + var(--Grid-item-columnSpacing)` : ''
      })`,
    };
  }
  return {};
};

const GridRoot = styled('div', {
  name: 'MuiGrid',
  slot: 'Root',
})<{ ownerState: GridProps & { nested: boolean } }>(({ ownerState, theme }) => [
  {
    minWidth: 0,
    boxSizing: 'border-box',
    ...(ownerState.container && {
      '--Grid-container-columns': ownerState.columns,
      ...(typeof ownerState.rowSpacing === 'number' && {
        '--Grid-item-rowSpacing': theme.spacing(ownerState.rowSpacing),
      }),
      ...(typeof ownerState.columnSpacing === 'number' && {
        '--Grid-item-columnSpacing': theme.spacing(ownerState.columnSpacing),
      }),
      display: 'flex',
      flexWrap: 'wrap',
      // TODO: handle responsive spacing
      margin: `calc(var(--Grid-item-rowSpacing) / -2) calc(var(--Grid-item-columnSpacing) / -2)`,
    }),
    ...(!ownerState.container && {
      padding: `calc(var(--Grid-item-rowSpacing) / 2) calc(var(--Grid-item-columnSpacing) / 2)`,
    }),
    ...(ownerState.container &&
      !ownerState.nested && {
        '--Grid-nested-rowSpacing': 'var(--Grid-item-rowSpacing)',
        '--Grid-nested-columnSpacing': 'var(--Grid-item-columnSpacing)',
      }),
    ...(ownerState.nested &&
      ownerState.container && {
        padding: `calc(var(--Grid-nested-rowSpacing) / 2) calc(var(--Grid-nested-columnSpacing) / 2)`,
      }),
  },
  ownerState.container &&
    typeof ownerState.columnSpacing === 'object' && {
      ...('xs' in ownerState.columnSpacing && {
        '--Grid-item-columnSpacing': theme.spacing(ownerState.columnSpacing.xs),
      }),
      ...('sm' in ownerState.columnSpacing && {
        [theme.breakpoints.up('sm')]: {
          '--Grid-item-columnSpacing': theme.spacing(ownerState.columnSpacing.sm),
        },
      }),
      ...('md' in ownerState.columnSpacing && {
        [theme.breakpoints.up('md')]: {
          '--Grid-item-columnSpacing': theme.spacing(ownerState.columnSpacing.md),
        },
      }),
      ...('lg' in ownerState.columnSpacing && {
        [theme.breakpoints.up('lg')]: {
          '--Grid-item-columnSpacing': theme.spacing(ownerState.columnSpacing.lg),
        },
      }),
      ...('xl' in ownerState.columnSpacing && {
        [theme.breakpoints.up('xl')]: {
          '--Grid-item-columnSpacing': theme.spacing(ownerState.columnSpacing.xl),
        },
      }),
    },
  ownerState.container &&
    typeof ownerState.rowSpacing === 'object' && {
      ...('xs' in ownerState.rowSpacing && {
        '--Grid-item-rowSpacing': theme.spacing(ownerState.rowSpacing.xs),
      }),
      ...('sm' in ownerState.rowSpacing && {
        [theme.breakpoints.up('sm')]: {
          '--Grid-item-rowSpacing': theme.spacing(ownerState.rowSpacing.sm),
        },
      }),
      ...('md' in ownerState.rowSpacing && {
        [theme.breakpoints.up('md')]: {
          '--Grid-item-rowSpacing': theme.spacing(ownerState.rowSpacing.md),
        },
      }),
      ...('lg' in ownerState.rowSpacing && {
        [theme.breakpoints.up('lg')]: {
          '--Grid-item-rowSpacing': theme.spacing(ownerState.rowSpacing.lg),
        },
      }),
      ...('xl' in ownerState.rowSpacing && {
        [theme.breakpoints.up('xl')]: {
          '--Grid-item-rowSpacing': theme.spacing(ownerState.rowSpacing.xl),
        },
      }),
    },
  {
    ...generateGrid(ownerState.xs, ownerState.nested && ownerState.container),
    [theme.breakpoints.up('sm')]: generateGrid(
      ownerState.sm,
      ownerState.nested && ownerState.container,
    ),
    [theme.breakpoints.up('md')]: generateGrid(
      ownerState.md,
      ownerState.nested && ownerState.container,
    ),
    [theme.breakpoints.up('lg')]: generateGrid(
      ownerState.lg,
      ownerState.nested && ownerState.container,
    ),
    [theme.breakpoints.up('xl')]: generateGrid(
      ownerState.xl,
      ownerState.nested && ownerState.container,
    ),
  },
]);

const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(inProps, ref) {
  const props = extendSxProp(inProps);
  const nested = React.useContext(NestedContext);
  const {
    columns: columnsProp = 12,
    container = false,
    item,
    spacing: spacingProp = 0,
    rowSpacing: rowSpacingProp = spacingProp,
    columnSpacing: columnSpacingProp = spacingProp,
    xs,
    sm,
    md,
    lg,
    xl,
    ...other
  } = props;
  const columns = inProps.columns || (nested ? undefined : columnsProp);
  const spacing = inProps.spacing || (nested ? undefined : spacingProp);
  const rowSpacing = inProps.rowSpacing || inProps.spacing || (nested ? undefined : rowSpacingProp);
  const columnSpacing =
    inProps.columnSpacing || inProps.spacing || (nested ? undefined : columnSpacingProp);
  const ownerState = {
    ...props,
    nested,
    columns,
    container,
    item, // item is not used anymore, declare here to prevent spreading to DOM.
    spacing,
    rowSpacing,
    columnSpacing,
    xs,
    sm,
    md,
    lg,
    xl,
  };
  if (nested) {
    // to reduce the number of contexts in React devtool
    return <GridRoot ref={ref} ownerState={ownerState} {...other} />;
  }
  return (
    <NestedContext.Provider value>
      <GridRoot ref={ref} ownerState={ownerState} {...other} />
    </NestedContext.Provider>
  );
});

export default Grid;
