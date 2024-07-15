import * as React from 'react';
import { OverrideProps, PartiallyRequired } from '@mui/types';
import { SxProps } from '../styleFunctionSx';
import { Theme, Breakpoint } from '../createTheme';
import { SystemProps } from '../Box';

type ResponsiveStyleValue<T> = T | Array<T | null> | { [key in Breakpoint]?: T | null };

export type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type GridSpacing = number | string;

export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type GridSize = 'auto' | 'grow' | number | false;

export type GridOffset = 'auto' | number;

export interface GridBaseProps {
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
   * Defines the offset value for the type `item` components.
   */
  offset?: ResponsiveStyleValue<GridOffset>;
  /**
   * @internal
   * The level of the grid starts from `0`
   * and increases when the grid nests inside another grid regardless of container or item.
   *
   * ```js
   * <Grid> // level 0
   *   <Grid> // level 1
   *     <Grid> // level 2
   *   <Grid> // level 1
   * ```
   *
   * Only consecutive grid is considered nesting.
   * A grid container will start at `0` if there are non-Grid element above it.
   *
   * ```js
   * <Grid> // level 0
   *   <div>
   *     <Grid> // level 0
   *       <Grid> // level 1
   * ```
   */
  unstable_level?: number;
  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing?: ResponsiveStyleValue<GridSpacing>;
  /**
   * Defines the size of the the type `item` components.
   */
  size?: ResponsiveStyleValue<GridSize>;
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

export type GridOwnerState = PartiallyRequired<GridBaseProps, 'size' | 'offset' | 'unstable_level'>;

export interface GridTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & GridBaseProps & { sx?: SxProps<Theme> } & SystemProps<Theme>;
  defaultComponent: DefaultComponent;
}

export type GridProps<
  RootComponent extends React.ElementType = GridTypeMap['defaultComponent'],
  AdditionalProps = {
    component?: React.ElementType;
  },
> = OverrideProps<GridTypeMap<AdditionalProps, RootComponent>, RootComponent>;
