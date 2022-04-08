import * as React from 'react';
import styled from '../styled';
import { extendSxProp } from '../styleFunctionSx';
import type { GridProps } from './GridProps';

const NestedContext = React.createContext(false);

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
    minWidth: 0,
    ...(!ownerState.container && {
      padding: `calc(var(--Grid-item-rowSpacing) / 2) calc(var(--Grid-item-columnSpacing) / 2)`,
    }),
    ...(ownerState.container &&
      !ownerState.nested && {
        '--Grid-internal-rowSpacing': 'var(--Grid-item-rowSpacing)',
        '--Grid-internal-columnSpacing': 'var(--Grid-item-columnSpacing)',
      }),
    ...(ownerState.nested &&
      ownerState.container && {
        padding: `calc(var(--Grid-internal-rowSpacing) / 2) calc(var(--Grid-internal-columnSpacing) / 2)`,
      }),
    // ...((ownerState.nested || !ownerState.container) && {
    //   // use React context
    //   // TODO: handle responsive spacing
    //   padding: `calc(var(--Grid-item-rowSpacing) / 2) calc(var(--Grid-item-columnSpacing) / 2)`,
    // }),
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
  const nested = React.useContext(NestedContext);
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
  return (
    <NestedContext.Provider value>
      <GridRoot ref={ref} ownerState={ownerState} {...other} />
    </NestedContext.Provider>
  );
});

export default Grid;
