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
  | 'zeroMinWidth'
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
  | 'justify-content-xs-center'
  | 'justify-content-xs-flex-end'
  | 'justify-content-xs-space-between'
  | 'justify-content-xs-space-around'
  | 'justify-content-xs-space-evenly'
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
  props: P & {
    /**
     * Defines the `align-content` style property.
     * It's applied for all screen sizes.
     */
    alignContent?: GridContentAlignment;
    /**
     * Defines the `align-items` style property.
     * It's applied for all screen sizes.
     */
    alignItems?: GridItemsAlignment;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * If `true`, the component will have the flex *container* behavior.
     * You should be wrapping *items* with a *container*.
     */
    container?: boolean;
    /**
     * Defines the `flex-direction` style property.
     * It is applied for all screen sizes.
     */
    direction?: GridDirection;
    /**
     * If `true`, the component will have the flex *item* behavior.
     * You should be wrapping *items* with a *container*.
     */
    item?: boolean;
    /**
     * Defines the `justify-content` style property.
     * It is applied for all screen sizes.
     * @deprecated Use `justifyContent` instead, the prop was renamed
     */
    justify?: GridJustification;
    /**
     * Defines the `justify-content` style property.
     * It is applied for all screen sizes.
     */
    justifyContent?: GridJustification;
    /**
     * Defines the number of grids the component is going to use.
     * It's applied for the `lg` breakpoint and wider screens if not overridden.
     */
    lg?: boolean | GridSize;
    /**
     * Defines the number of grids the component is going to use.
     * It's applied for the `md` breakpoint and wider screens if not overridden.
     */
    md?: boolean | GridSize;
    /**
     * Defines the number of grids the component is going to use.
     * It's applied for the `sm` breakpoint and wider screens if not overridden.
     */
    sm?: boolean | GridSize;
    /**
     * Defines the space between the type `item` component.
     * It can only be used on a type `container` component.
     */
    spacing?: GridSpacing;
    /**
     * Defines the `flex-wrap` style property.
     * It's applied for all screen sizes.
     */
    wrap?: GridWrap;
    /**
     * Defines the number of grids the component is going to use.
     * It's applied for the `xl` breakpoint and wider screens.
     */
    xl?: boolean | GridSize;
    /**
     * Defines the number of grids the component is going to use.
     * It's applied for all the screen sizes with the lowest priority.
     */
    xs?: boolean | GridSize;
    /**
     * If `true`, it sets `min-width: 0` on the item.
     * Refer to the limitations section of the documentation to better understand the use case.
     */
    zeroMinWidth?: boolean;
  };
  defaultComponent: D;
  classKey: GridClassKey;
}

/**
 *
 * Demos:
 *
 * - [Grid](https://material-ui.com/components/grid/)
 *
 * API:
 *
 * - [Grid API](https://material-ui.com/api/grid/)
 */
declare const Grid: OverridableComponent<GridTypeMap>;

export type GridProps<
  D extends React.ElementType = GridTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<GridTypeMap<P, D>, D>;

export default Grid;
