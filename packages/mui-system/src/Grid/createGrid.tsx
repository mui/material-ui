import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import {
  unstable_composeClasses as composeClasses,
  unstable_generateUtilityClass as generateUtilityClass,
} from '@mui/utils';
import systemStyled from '../styled';
import useThemePropsSystem from '../useThemeProps';
import useTheme from '../useTheme';
import { extendSxProp } from '../styleFunctionSx';
import createTheme from '../createTheme';
import {
  generateGridStyles,
  generateGridSizeStyles,
  generateGridColumnsStyles,
  generateGridColumnSpacingStyles,
  generateGridRowSpacingStyles,
  generateGridDirectionStyles,
  generateSizeClassNames,
  generateSpacingClassNames,
} from './gridGenerator';
import { CreateMUIStyled } from '../createStyled';
import { GridTypeMap, GridOwnerState } from './GridProps';
import type { Breakpoint } from '../createTheme';

const defaultTheme = createTheme();

// widening Theme to any so that the consumer can own the theme structure.
const defaultCreateStyledComponent = (systemStyled as CreateMUIStyled<any>)('div', {
  name: 'MuiGrid',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
});

function useThemePropsDefault<T>(props: T) {
  return useThemePropsSystem({
    props,
    name: 'MuiGrid',
    defaultTheme,
  });
}

export default function createGrid(
  options: {
    createStyledComponent?: typeof defaultCreateStyledComponent;
    useThemeProps?: typeof useThemePropsDefault;
    componentName?: string;
  } = {},
) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps = useThemePropsDefault,
    componentName = 'MuiGrid',
  } = options;

  const NestedContext = React.createContext(false);

  const getGridUtilityClass = (slot: string) => {
    return generateUtilityClass(componentName, slot);
  };

  const useUtilityClasses = (ownerState: GridOwnerState, theme: typeof defaultTheme) => {
    const { container, direction, spacing, wrap, gridSize } = ownerState;

    const slots = {
      root: [
        'root',
        container && 'container',
        direction !== 'row' && `direction-xs-${String(direction)}`,
        wrap !== 'wrap' && `wrap-xs-${String(wrap)}`,
        ...generateSizeClassNames(gridSize),
        ...(container ? generateSpacingClassNames(spacing, theme.breakpoints.keys[0]) : []),
      ],
    };

    return composeClasses(slots, getGridUtilityClass, {});
  };

  const GridRoot = createStyledComponent<{
    ownerState: GridOwnerState;
  }>(
    generateGridColumnsStyles,
    generateGridColumnSpacingStyles,
    generateGridRowSpacingStyles,
    generateGridSizeStyles,
    generateGridDirectionStyles,
    generateGridStyles,
  );

  const Grid = React.forwardRef(function Grid(inProps, ref) {
    const theme = useTheme();
    const themeProps = useThemeProps<typeof inProps & { component?: React.ElementType }>(inProps);
    const props = extendSxProp(themeProps) as Omit<typeof themeProps, 'color'>; // `color` type conflicts with html color attribute.
    const nested = React.useContext(NestedContext);
    const {
      className,
      columns: columnsProp = 12,
      container = false,
      component = 'div',
      direction = 'row',
      wrap = 'wrap',
      spacing: spacingProp = 0,
      rowSpacing: rowSpacingProp = spacingProp,
      columnSpacing: columnSpacingProp = spacingProp,
      ...rest
    } = props;
    // collect breakpoints related props because they can be custom from the theme.
    const gridSize = {} as GridOwnerState['gridSize'];
    const other: Record<string, any> = {};

    Object.entries(rest).forEach(([key, val]) => {
      if (theme.breakpoints.values[key as Breakpoint] !== undefined) {
        gridSize[key as Breakpoint] = val;
      } else {
        other[key] = val;
      }
    });

    const columns = inProps.columns ?? (nested ? undefined : columnsProp);
    const spacing = inProps.spacing ?? (nested ? undefined : spacingProp);
    const rowSpacing =
      inProps.rowSpacing ?? inProps.spacing ?? (nested ? undefined : rowSpacingProp);
    const columnSpacing =
      inProps.columnSpacing ?? inProps.spacing ?? (nested ? undefined : columnSpacingProp);
    const ownerState = {
      ...props,
      nested,
      columns,
      container,
      direction,
      wrap,
      spacing,
      rowSpacing,
      columnSpacing,
      gridSize,
    };

    const classes = useUtilityClasses(ownerState, theme);

    let result = (
      <GridRoot
        ref={ref}
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        {...other}
      />
    );

    if (!nested) {
      result = <NestedContext.Provider value>{result}</NestedContext.Provider>;
    }

    return result;
  }) as OverridableComponent<GridTypeMap>;

  Grid.propTypes /* remove-proptypes */ = {
    children: PropTypes.node,
    className: PropTypes.string,
    columns: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.number,
      PropTypes.object,
    ]),
    columnSpacing: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
    component: PropTypes.elementType,
    container: PropTypes.bool,
    direction: PropTypes.oneOfType([
      PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
      PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])),
      PropTypes.object,
    ]),
    lg: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
    md: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
    rowSpacing: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
    sm: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
    spacing: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
      PropTypes.func,
      PropTypes.object,
    ]),
    wrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
    xl: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
    xs: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
  };

  return Grid;
}
