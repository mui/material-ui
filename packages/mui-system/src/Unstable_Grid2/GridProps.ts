import * as React from 'react';
import { OverrideProps, IfEquals } from '@mui/types';
import { SxProps } from '../styleFunctionSx';
import { Theme, Breakpoint, BreakpointOverrides } from '../createTheme';
import { SystemProps } from '../Box';

type ResponsiveStyleValue<T> = T | Array<T | null> | { [key in Breakpoint]?: T | null };

export type Grid2Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type Grid2Spacing = number | string;

export type Grid2Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type Grid2Size = 'auto' | number;

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
  lg?: boolean | Grid2Size;
  /**
   * If a number, it sets the margin-left equals to the number of columns the grid item uses.
   * If 'auto', the grid item push itself to the right-end of the container.
   * The value is applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lgOffset?: Grid2Size;
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `md` breakpoint and wider screens if not overridden.
   * @default false
   */
  md?: boolean | Grid2Size;
  /**
   * If a number, it sets the margin-left equals to the number of columns the grid item uses.
   * If 'auto', the grid item push itself to the right-end of the container.
   * The value is applied for the `md` breakpoint and wider screens if not overridden.
   */
  mdOffset?: Grid2Size;
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `sm` breakpoint and wider screens if not overridden.
   * @default false
   */
  sm?: boolean | Grid2Size;
  /**
   * If a number, it sets the margin-left equals to the number of columns the grid item uses.
   * If 'auto', the grid item push itself to the right-end of the container.
   * The value is applied for the `sm` breakpoint and wider screens if not overridden.
   */
  smOffset?: Grid2Size;
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `xl` breakpoint and wider screens if not overridden.
   * @default false
   */
  xl?: boolean | Grid2Size;
  /**
   * If a number, it sets the margin-left equals to the number of columns the grid item uses.
   * If 'auto', the grid item push itself to the right-end of the container.
   * The value is applied for the `xl` breakpoint and wider screens if not overridden.
   */
  xlOffset?: Grid2Size;
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for all the screen sizes with the lowest priority.
   * @default false
   */
  xs?: boolean | Grid2Size;
  /**
   * If a number, it sets the margin-left equals to the number of columns the grid item uses.
   * If 'auto', the grid item push itself to the right-end of the container.
   * The value is applied for the `xs` breakpoint and wider screens if not overridden.
   */
  xsOffset?: Grid2Size;
}

type CustomBreakpoints = Partial<
  Record<Breakpoint, boolean | Grid2Size> & Record<`${Breakpoint}Offset`, Grid2Size>
>;

interface BreakpointOverridesEmpty {}

type Breakpoints = IfEquals<
  BreakpointOverrides,
  BreakpointOverridesEmpty,
  GridDefaultBreakpoints,
  CustomBreakpoints
>;

export interface Grid2BaseProps extends Breakpoints {
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
  columnSpacing?: ResponsiveStyleValue<Grid2Spacing>;
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
  direction?: ResponsiveStyleValue<Grid2Direction>;
  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing?: ResponsiveStyleValue<Grid2Spacing>;
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing?: ResponsiveStyleValue<Grid2Spacing> | undefined;
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap?: Grid2Wrap;
}

export interface Grid2OwnerState extends Grid2BaseProps {
  nested: boolean;
  gridSize: Partial<Record<Breakpoint, Grid2Size | boolean>>;
  gridOffset: Partial<Record<Breakpoint, Grid2Size>>;
}

export interface Grid2TypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & Grid2BaseProps & { sx?: SxProps<Theme> } & SystemProps<Theme>;
  defaultComponent: D;
}

export type GridProps<
  D extends React.ElementType = Grid2TypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<Grid2TypeMap<P, D>, D>;
