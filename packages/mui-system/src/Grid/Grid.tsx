import * as React from 'react';
import styled from '../styled';
import { extendSxProp } from '../styleFunctionSx';
import {
  generateGridSizeStyles,
  generateGridColumnsStyles,
  generateGridColumnSpacingStyles,
  generateGridRowSpacingStyles,
} from './gridGenerator';
import type { GridProps } from './GridProps';

const NestedContext = React.createContext(false);

const GridRoot = styled('div', {
  name: 'MuiGrid',
  slot: 'Root',
})<{ ownerState: GridProps & { nested: boolean } }>(
  generateGridColumnsStyles,
  generateGridColumnSpacingStyles,
  generateGridRowSpacingStyles,
  generateGridSizeStyles,
  ({ ownerState }) => [
    {
      minWidth: 0,
      boxSizing: 'border-box',
      ...(ownerState.container
        ? {
            display: 'flex',
            flexWrap: 'wrap',
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
    },
  ],
);

const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(inProps, ref) {
  const props = extendSxProp(inProps);
  const nested = React.useContext(NestedContext);
  const {
    item = false,
    zeroMinWidth = false,
    columns: columnsProp = 12,
    container = false,
    wrap = 'wrap',
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
  const columns = inProps.columns ?? (nested ? undefined : columnsProp);
  const spacing = inProps.spacing ?? (nested ? undefined : spacingProp);
  const rowSpacing = inProps.rowSpacing ?? inProps.spacing ?? (nested ? undefined : rowSpacingProp);
  const columnSpacing =
    inProps.columnSpacing ?? inProps.spacing ?? (nested ? undefined : columnSpacingProp);
  const ownerState = {
    ...props,
    item, // item is not used anymore, declare here to prevent spreading to DOM.
    zeroMinWidth, // item is not used anymore, declare here to prevent spreading to DOM.
    nested,
    columns,
    container,
    wrap,
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
