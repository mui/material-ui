import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { OverridableComponent, OverrideProps } from '@mui/types';
import { SxProps } from '@mui/system';
// @ts-ignore
import Grid from '@mui/material-pigment-css/Grid';
import composeClasses from '@mui/utils/composeClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import {
  unstable_generateDirectionClasses as generateDirectionClasses,
  unstable_generateSizeClassNames as generateSizeClassNames,
  unstable_generateSpacingClassNames as generateSpacingClassNames,
} from '@mui/system/Grid';
import { Breakpoint, Theme } from '../styles';

type ResponsiveStyleValue<T> = T | Array<T | null> | { [key in Breakpoint]?: T | null };

export type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type GridSpacing = number | string;

export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type GridSize = 'auto' | 'grow' | number;

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
   * Defines the offset of the grid.
   */
  offset?: ResponsiveStyleValue<number> | undefined;
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
   * Defines the column size of the grid.
   */
  size?: ResponsiveStyleValue<GridSize> | undefined;
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap?: GridWrap;
}

export interface GridTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & GridBaseProps & { sx?: SxProps<Theme> };
  defaultComponent: DefaultComponent;
}

export type GridProps<
  RootComponent extends React.ElementType = GridTypeMap['defaultComponent'],
  AdditionalProps = {
    component?: React.ElementType;
  },
> = OverrideProps<GridTypeMap<AdditionalProps, RootComponent>, RootComponent>;

const useUtilityClasses = (ownerState: GridBaseProps) => {
  const { container, direction, size, spacing } = ownerState;
  let gridSize = {};
  if (size) {
    if (Array.isArray(size)) {
      size.forEach((value, index) => {
        gridSize = { ...gridSize, [index]: value };
      });
    }
    if (typeof size === 'object') {
      gridSize = size;
    }
  }
  const slots = {
    root: [
      'root',
      container && 'container',
      ...generateDirectionClasses(direction),
      ...generateSizeClassNames(gridSize),
      ...(container ? generateSpacingClassNames(spacing) : []),
    ],
  };

  return composeClasses(slots, (slot: string) => generateUtilityClass('MuiGrid', slot), {});
};
/**
 *
 * Demos:
 *
 * - [Grid](https://mui.com/material-ui/react-grid/)
 *
 * API:
 *
 * - [PigmentGrid API](https://mui.com/material-ui/api/pigment-grid/)
 */
const PigmentGrid = React.forwardRef(function PigmentGrid(props, ref) {
  const { className, ...other } = props;

  const classes = useUtilityClasses(props);

  return <Grid ref={ref} className={clsx(classes.root, className)} {...(other as any)} />;
}) as OverridableComponent<GridTypeMap>;

PigmentGrid.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The number of columns.
   * @default 12
   */
  columns: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.object,
  ]),
  /**
   * Defines the horizontal space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  columnSpacing: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  container: PropTypes.bool,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'row'
   */
  direction: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['column', 'column-reverse', 'row', 'row-reverse']),
    PropTypes.arrayOf(PropTypes.oneOf(['column', 'column-reverse', 'row', 'row-reverse'])),
    PropTypes.object,
  ]),
  /**
   * Defines the offset of the grid.
   */
  offset: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.object,
  ]),
  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * Defines the column size of the grid.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.object,
  ]),
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
} as any;

// @ts-ignore internal logic for nested grid
PigmentGrid.muiName = 'Grid';

export default PigmentGrid;
