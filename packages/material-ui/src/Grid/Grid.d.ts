import * as React from 'react';
import { Breakpoint } from '../styles/createBreakpoints';
import { OverridableComponent, SimplifiedPropsOf, OverrideProps } from '../OverridableComponent';

export type GridItemsAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

export type GridContentAlignment =
  | 'stretch'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around';

export type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type GridSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type GridJustification =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type GridSize = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type GridClassKey =
  | 'root'
  | 'container'
  | 'item'
  | 'direction-xs-column'
  | 'direction-xs-column-reverse'
  | 'direction-xs-row-reverse'
  | 'wrap-xs-nowrap'
  | 'wrap-xs-wrap-reverse'
  | 'align-items-xs-center'
  | 'align-items-xs-flex-start'
  | 'align-items-xs-flex-end'
  | 'align-items-xs-baseline'
  | 'align-content-xs-center'
  | 'align-content-xs-flex-start'
  | 'align-content-xs-flex-end'
  | 'align-content-xs-space-between'
  | 'align-content-xs-space-around'
  | 'justify-xs-center'
  | 'justify-xs-flex-end'
  | 'justify-xs-space-between'
  | 'justify-xs-space-around'
  | 'spacing-xs-1'
  | 'spacing-xs-2'
  | 'spacing-xs-3'
  | 'spacing-xs-4'
  | 'spacing-xs-5'
  | 'spacing-xs-6'
  | 'spacing-xs-7'
  | 'spacing-xs-8'
  | 'spacing-xs-9'
  | 'spacing-xs-10'
  | 'grid-xs-auto'
  | 'grid-xs-true'
  | 'grid-xs-1'
  | 'grid-xs-2'
  | 'grid-xs-3'
  | 'grid-xs-4'
  | 'grid-xs-5'
  | 'grid-xs-6'
  | 'grid-xs-7'
  | 'grid-xs-8'
  | 'grid-xs-9'
  | 'grid-xs-10'
  | 'grid-xs-11'
  | 'grid-xs-12';

export interface GridTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Partial<Record<Breakpoint, boolean | GridSize>> & {
      alignContent?: GridContentAlignment;
      alignItems?: GridItemsAlignment;
      container?: boolean;
      direction?: GridDirection;
      item?: boolean;
      justify?: GridJustification;
      spacing?: GridSpacing;
      wrap?: GridWrap;
      zeroMinWidth?: boolean;
    };
  defaultComponent: D;
  classKey: GridClassKey;
}

declare const Grid: OverridableComponent<GridTypeMap>;

export type GridProps<
  D extends React.ElementType = GridTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<GridTypeMap<P, D>, D>;

export default Grid;
