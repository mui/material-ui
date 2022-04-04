import * as React from 'react';
import styled from '../styled';
import type { GridProps } from './GridProps';

const generateGrid = (value: number | boolean | 'auto' | undefined) => {
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
      width: `calc(100% * ${value} / var(--Grid-container-columns))`,
    };
  }
  return {};
};

const GridRoot = styled('div', {
  name: 'MuiGrid',
  slot: 'Root',
})<{ ownerState: GridProps & { nested: boolean } }>(({ ownerState, theme }) => [
  {
    // ...(ownerState.container && {
    //   '--Grid-container-columns': ownerState.columns,
    //   ...(typeof ownerState.rowSpacing === 'number' && {
    //     '--Grid-item-rowSpacing': theme.spacing(ownerState.rowSpacing),
    //   }),
    //   ...(typeof ownerState.columnSpacing === 'number' && {
    //     '--Grid-item-columnSpacing': theme.spacing(ownerState.columnSpacing),
    //   }),
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   // TODO: handle responsive spacing
    //   margin: `calc(var(--Grid-item-rowSpacing) / -2) calc(var(--Grid-item-columnSpacing) / -2)`,
    // }),
    // minWidth: 0,
    // ...((ownerState.nested || !ownerState.container) && {
    //   // use React context
    //   // TODO: handle responsive spacing
    //   padding: `calc(var(--Grid-item-rowSpacing) / 2) calc(var(--Grid-item-columnSpacing) / 2)`,
    // }),
  },
  // ownerState.container &&
  //   typeof ownerState.columnSpacing === 'object' && {
  //     ...('xs' in ownerState.columnSpacing && {
  //       '--Grid-item-columnSpacing': theme.spacing(ownerState.columnSpacing.xs),
  //     }),
  //     ...('sm' in ownerState.columnSpacing && {
  //       [theme.breakpoints.up('sm')]: {
  //         '--Grid-item-columnSpacing': theme.spacing(ownerState.columnSpacing.sm),
  //       },
  //     }),
  //     ...('md' in ownerState.columnSpacing && {
  //       [theme.breakpoints.up('md')]: {
  //         '--Grid-item-columnSpacing': theme.spacing(ownerState.columnSpacing.md),
  //       },
  //     }),
  //     ...('lg' in ownerState.columnSpacing && {
  //       [theme.breakpoints.up('lg')]: {
  //         '--Grid-item-columnSpacing': theme.spacing(ownerState.columnSpacing.lg),
  //       },
  //     }),
  //     ...('xl' in ownerState.columnSpacing && {
  //       [theme.breakpoints.up('xl')]: {
  //         '--Grid-item-columnSpacing': theme.spacing(ownerState.columnSpacing.xl),
  //       },
  //     }),
  //   },
  // ownerState.container &&
  //   typeof ownerState.rowSpacing === 'object' && {
  //     ...('xs' in ownerState.rowSpacing && {
  //       '--Grid-item-rowSpacing': theme.spacing(ownerState.rowSpacing.xs),
  //     }),
  //     ...('sm' in ownerState.rowSpacing && {
  //       [theme.breakpoints.up('sm')]: {
  //         '--Grid-item-rowSpacing': theme.spacing(ownerState.rowSpacing.sm),
  //       },
  //     }),
  //     ...('md' in ownerState.rowSpacing && {
  //       [theme.breakpoints.up('md')]: {
  //         '--Grid-item-rowSpacing': theme.spacing(ownerState.rowSpacing.md),
  //       },
  //     }),
  //     ...('lg' in ownerState.rowSpacing && {
  //       [theme.breakpoints.up('lg')]: {
  //         '--Grid-item-rowSpacing': theme.spacing(ownerState.rowSpacing.lg),
  //       },
  //     }),
  //     ...('xl' in ownerState.rowSpacing && {
  //       [theme.breakpoints.up('xl')]: {
  //         '--Grid-item-rowSpacing': theme.spacing(ownerState.rowSpacing.xl),
  //       },
  //     }),
  //   },
  // {
  //   ...generateGrid(ownerState.xs),
  //   [theme.breakpoints.up('sm')]: generateGrid(ownerState.sm),
  //   [theme.breakpoints.up('md')]: generateGrid(ownerState.md),
  //   [theme.breakpoints.up('lg')]: generateGrid(ownerState.lg),
  //   [theme.breakpoints.up('xl')]: generateGrid(ownerState.xl),
  // },
]);

const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(inProps, ref) {
  const props = inProps;
  const {
    columns = 12,
    container = false,
    item,
    spacing = 0,
    rowSpacing = spacing,
    columnSpacing = spacing,
    xs,
  } = props;
  const ownerState = {
    ...props,
    nested: false,
    columns,
    container,
    item, // item is not used anymore, declare here to prevent spreading to DOM.
    spacing,
    rowSpacing,
    columnSpacing,
    xs,
  };
  return <GridRoot ref={ref} ownerState={ownerState} {...props} />;
});

export default Grid;
