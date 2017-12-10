import * as React from 'react';
import { StandardProps, Omit } from '..';
import { HiddenProps } from '../Hidden/Hidden';
import { Breakpoint } from '../styles/createBreakpoints';

export type GridItemsAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

export type GridContentAlignment = 'stretch' | 'center' | 'flex-start' | 'flex-end' |'space-between' | 'space-around';

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

export interface GridProps extends StandardProps<
  React.HTMLAttributes<HTMLElement> & Partial<Record<Breakpoint, boolean | GridSize>>,
  GridClassKey,
  'hidden'
> {
  alignContent?: GridContentAlignment;
  alignItems?: GridItemsAlignment;
  component?: string | React.ComponentType<Omit<GridProps, StrippedProps>>;
  container?: boolean;
  direction?: GridDirection;
  hidden?: HiddenProps;
  item?: boolean;
  justify?: GridJustification;
  spacing?: GridSpacing;
  wrap?: GridWrap;
}

export type GridClassKey =
  | 'typeContainer'
  | 'typeItem'
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

declare const Grid: React.ComponentType<GridProps>;

export default Grid;

type StrippedProps =
  | 'classes'
  | 'className'
  | 'component'
  | 'container'
  | 'item'
  | 'alignContent'
  | 'alignItems'
  | 'direction'
  | 'spacing'
  | 'hidden'
  | 'justify'
  | 'wrap'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  ;
