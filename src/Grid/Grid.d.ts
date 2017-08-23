import * as React from 'react';
import { StyledComponent } from '..';
import { HiddenProps } from '../Hidden/Hidden';
import { Breakpoint } from '../styles/breakpoints';

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
  component?: React.ReactNode;
  container?: boolean;
  item?: boolean;
  align?: GridAlignment;
  direction?: GridDirection;
  spacing?: GridSpacing;
  hidden?: HiddenProps;
  justify?: GridJustification;
  wrap?: GridWrap;
} & Partial<{ [key in Breakpoint]: boolean | GridSize }>;

export default class Grid extends StyledComponent<GridProps> {}
