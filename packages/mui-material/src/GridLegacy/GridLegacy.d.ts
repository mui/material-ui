import * as React from 'react';
import {
  ResponsiveStyleValue,
  SxProps,
  SystemProps,
  Breakpoint,
  BreakpointOverrides,
} from '@mui/system';
import { IfEquals } from '@mui/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { GridLegacyClasses } from './gridLegacyClasses';

export type GridLegacyDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type GridLegacySpacing = number | string;

export type GridLegacyWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type GridLegacySize = 'auto' | number;

export interface RegularBreakpoints {
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `lg` breakpoint and wider screens if not overridden.
   * @default false
   */
  lg?: boolean | GridLegacySize;
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `md` breakpoint and wider screens if not overridden.
   * @default false
   */
  md?: boolean | GridLegacySize;
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `sm` breakpoint and wider screens if not overridden.
   * @default false
   */
  sm?: boolean | GridLegacySize;
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `xl` breakpoint and wider screens if not overridden.
   * @default false
   */
  xl?: boolean | GridLegacySize;
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for all the screen sizes with the lowest priority.
   * @default false
   */
  xs?: boolean | GridLegacySize;
}

type CustomBreakpoints = Partial<Record<Breakpoint, boolean | GridLegacySize>>;

interface BreakpointOverridesEmpty {}

type Breakpoints = IfEquals<
  BreakpointOverrides,
  BreakpointOverridesEmpty,
  RegularBreakpoints,
  CustomBreakpoints
>;

export interface GridLegacyOwnProps extends SystemProps<Theme>, Breakpoints {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<GridLegacyClasses>;
  /**
   * The number of columns.
   * @default 12
   */
  columns?: ResponsiveStyleValue<number>;
  /**
   * Defines the horizontal space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  columnSpacing?: ResponsiveStyleValue<GridLegacySpacing>;
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
  direction?: ResponsiveStyleValue<GridLegacyDirection>;
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  item?: boolean;
  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing?: ResponsiveStyleValue<GridLegacySpacing>;
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing?: ResponsiveStyleValue<GridLegacySpacing>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap?: GridLegacyWrap;
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   * @default false
   */
  zeroMinWidth?: boolean;
}

/**
 * @deprecated Use the [`Grid2`](https://mui.com/material-ui/react-grid2/) component instead.
 */
export interface GridLegacyTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & GridLegacyOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [GridLegacy](https://next.mui.com/material-ui/react-grid-legacy/)
 *
 * API:
 *
 * - [GridLegacy API](https://next.mui.com/material-ui/api/grid-legacy/)
 *
 * @deprecated Use the [`Grid2`](https://mui.com/material-ui/react-grid2/) component instead.
 */
declare const GridLegacy: OverridableComponent<GridLegacyTypeMap>;

/**
 * @deprecated Use the [`Grid2`](https://mui.com/material-ui/react-grid2/) component instead.
 */
export type GridLegacyProps<
  RootComponent extends React.ElementType = GridLegacyTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<GridLegacyTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default GridLegacy;
