import * as React from 'react';
import { Omit, StyledComponent, StyledComponentProps } from '..';
import { HiddenProps } from '../Hidden/Hidden';
import { Breakpoint } from '../styles/createBreakpoints';

export type GridAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch';

export type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type GridSpacing = 0 | 8 | 16 | 24 | 40;

export type GridJustification =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around';

export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type GridProps = {
  component?: React.ReactType;
  container?: boolean;
  item?: boolean;
  align?: GridAlignment;
  direction?: GridDirection;
  spacing?: GridSpacing;
  hidden?: HiddenProps & StyledComponentProps<any>;
  justify?: GridJustification;
  wrap?: GridWrap;
} & Partial<{ [key in Breakpoint]: boolean | GridSize }>
  & Partial<Omit<React.HTMLAttributes<HTMLElement>, 'hidden'>>;

export type GridClassKey =
  | 'typeContainer'
  | 'typeItem'
  | 'direction-xs-column'
  | 'direction-xs-column-reverse'
  | 'direction-xs-row-reverse'
  | 'wrap-xs-nowrap'
  | 'align-xs-center'
  | 'align-xs-flex-start'
  | 'align-xs-flex-end'
  | 'align-xs-baseline'
  | 'justify-xs-center'
  | 'justify-xs-flex-end'
  | 'justify-xs-space-between'
  | 'justify-xs-space-around'
  | 'spacing-xs-8'
  | 'spacing-xs-16'
  | 'spacing-xs-24'
  | 'spacing-xs-40'
  | 'grid-xs'
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
  | 'grid-xs-12'
  ;

declare const Grid: StyledComponent<GridProps, GridClassKey>;

export default Grid;
