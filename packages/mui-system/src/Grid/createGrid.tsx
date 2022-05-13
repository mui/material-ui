import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
} from '@mui/private-classnames';
import systemStyled from '../styled';
import useThemePropsSystem from '../useThemeProps';
import { extendSxProp } from '../styleFunctionSx';
import createTheme, { Theme as DefaultTheme } from '../createTheme';
import {
  generateGridStyles,
  generateGridSizeStyles,
  generateGridColumnsStyles,
  generateGridColumnSpacingStyles,
  generateGridRowSpacingStyles,
} from './gridGenerator';
import { CreateMUIStyled } from '../createStyled';
import { GridBaseProps, GridTypeMap } from './GridProps';

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
    defaultTheme: { ...defaultTheme, components: {} },
  });
}

function resolveSpacingClasses(
  spacing: GridBaseProps['spacing'],
  container?: boolean,
  styles: Record<string, string> = {},
) {
  // in case of grid item or undefined/null or `spacing` <= 0
  if (!container || !spacing || spacing <= 0) {
    return [];
  }
  // in case of string/number `spacing`
  if (
    (typeof spacing === 'string' && !Number.isNaN(Number(spacing))) ||
    typeof spacing === 'number'
  ) {
    return [styles[`spacing-xs-${String(spacing)}`] || `spacing-xs-${String(spacing)}`];
  }
  // in case of object `spacing`
  // @ts-ignore internal logic
  const { xs, sm, md, lg, xl } = spacing;

  return [
    Number(xs) > 0 && (styles[`spacing-xs-${String(xs)}`] || `spacing-xs-${String(xs)}`),
    Number(sm) > 0 && (styles[`spacing-sm-${String(sm)}`] || `spacing-sm-${String(sm)}`),
    Number(md) > 0 && (styles[`spacing-md-${String(md)}`] || `spacing-md-${String(md)}`),
    Number(lg) > 0 && (styles[`spacing-lg-${String(lg)}`] || `spacing-lg-${String(lg)}`),
    Number(xl) > 0 && (styles[`spacing-xl-${String(xl)}`] || `spacing-xl-${String(xl)}`),
  ];
}

type RequiredThemeStructure = Pick<DefaultTheme, 'breakpoints' | 'spacing'>;

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

  const useUtilityClasses = (ownerState: GridBaseProps & { classes?: Record<string, string> }) => {
    const { classes, container, direction, lg, md, sm, spacing, wrap, xl, xs } = ownerState;

    const slots = {
      root: [
        'root',
        container && 'container',
        ...resolveSpacingClasses(spacing, container),
        direction !== 'row' && `direction-xs-${String(direction)}`,
        wrap !== 'wrap' && `wrap-xs-${String(wrap)}`,
        xs !== false && `grid-xs-${String(xs)}`,
        sm !== false && `grid-sm-${String(sm)}`,
        md !== false && `grid-md-${String(md)}`,
        lg !== false && `grid-lg-${String(lg)}`,
        xl !== false && `grid-xl-${String(xl)}`,
      ],
    };

    return composeClasses(slots, getGridUtilityClass, classes);
  };

  const GridRoot = createStyledComponent<{ ownerState: GridBaseProps & { nested: boolean } }>(
    generateGridColumnsStyles,
    generateGridColumnSpacingStyles,
    generateGridRowSpacingStyles,
    generateGridSizeStyles,
    generateGridStyles,
  );

  const Grid = React.forwardRef(function Grid(inProps, ref) {
    const themeProps = useThemeProps<typeof inProps & { component?: React.ElementType }>(inProps);
    const props = extendSxProp(themeProps) as Omit<typeof themeProps, 'color'>; // `color` type conflicts with html color attribute.
    const nested = React.useContext(NestedContext);
    const {
      className,
      columns: columnsProp = 12,
      container = false,
      direction = 'row',
      wrap = 'wrap',
      spacing: spacingProp = 0,
      rowSpacing: rowSpacingProp = spacingProp,
      columnSpacing: columnSpacingProp = spacingProp,
      xs = false,
      sm = false,
      md = false,
      lg = false,
      xl = false,
      ...other
    } = props;
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
      xs,
      sm,
      md,
      lg,
      xl,
    };

    const classes = useUtilityClasses(ownerState);

    if (nested) {
      // to reduce the number of contexts in React devtool
      return (
        <GridRoot
          ref={ref}
          ownerState={ownerState}
          className={clsx(classes.root, className)}
          {...other}
        />
      );
    }
    return (
      <NestedContext.Provider value>
        <GridRoot
          ref={ref}
          ownerState={ownerState}
          className={clsx(classes.root, className)}
          {...other}
        />
      </NestedContext.Provider>
    );
  }) as OverridableComponent<GridTypeMap>;

  Grid.propTypes /* remove-proptypes */ = {
    children: PropTypes.node,
    classes: PropTypes.object,
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
