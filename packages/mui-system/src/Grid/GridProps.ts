import * as React from 'react';
import { OverrideProps, IfEquals } from '@mui/types';
import { SxProps } from '../styleFunctionSx';
import { Theme, Breakpoint, BreakpointOverrides } from '../createTheme';
import { SystemProps } from '../Box';

type ResponsiveStyleValue<T> = T | Array<T | null> | { [key in Breakpoint]?: T | null };

export type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type GridSpacing = number | string;

export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type GridSize = 'auto' | number;

export interface GridDefaultBreakpoints {
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `lg` breakpoint and wider screens if not overridden.
   * @default false
   */
  lg?: boolean | GridSize;
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `md` breakpoint and wider screens if not overridden.
   * @default false
   */
  md?: boolean | GridSize;
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `sm` breakpoint and wider screens if not overridden.
   * @default false
   */
  sm?: boolean | GridSize;
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `xl` breakpoint and wider screens if not overridden.
   * @default false
   */
  xl?: boolean | GridSize;
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for all the screen sizes with the lowest priority.
   * @default false
   */
  xs?: boolean | GridSize;
}

type CustomBreakpoints = Partial<
  Record<Breakpoint, boolean | GridSize> & Record<`${Breakpoint}Offset`, GridSize>
>;

interface BreakpointOverridesEmpty {}

type Breakpoints = IfEquals<
  BreakpointOverrides,
  BreakpointOverridesEmpty,
  GridDefaultBreakpoints,
  CustomBreakpoints
>;

export interface GridBaseProps extends Breakpoints {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The number of columns.
   * @default 12
   */
  columns?: ResponsiveStyleValue<number>;
  /**
   * Defines the horizontal space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  columnSpacing?: ResponsiveStyleValue<GridSpacing>;
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  container?: boolean;
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'row'
   */
  direction?: ResponsiveStyleValue<GridDirection>;
  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing?: ResponsiveStyleValue<GridSpacing>;
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing?: ResponsiveStyleValue<GridSpacing> | undefined;
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap?: GridWrap;
}

export interface GridOwnerState extends GridBaseProps {
  nested: boolean;
  gridSize: Partial<Record<Breakpoint, GridSize | boolean>>;
}

export interface GridTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & GridBaseProps & { sx?: SxProps<Theme> } & SystemProps<Theme>;
  defaultComponent: D;
}

export type GridProps<
  D extends React.ElementType = GridTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<GridTypeMap<P, D>, D>;
