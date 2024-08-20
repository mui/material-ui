'use client';
// A grid component using the following libs as inspiration.
//
// For the implementation:
// - https://getbootstrap.com/docs/4.3/layout/grid/
// - https://github.com/kristoferjoseph/flexboxgrid/blob/master/src/css/flexboxgrid.css
// - https://github.com/roylee0704/react-flexbox-grid
// - https://material.angularjs.org/latest/layout/introduction
//
// Follow this flexbox Guide to better understand the underlying model:
// - https://css-tricks.com/snippets/css/a-guide-to-flexbox/
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  handleBreakpoints,
  unstable_resolveBreakpointValues as resolveBreakpointValues,
} from '@mui/system';
import { extendSxProp } from '@mui/system/styleFunctionSx';
import composeClasses from '@mui/utils/composeClasses';
import requirePropFactory from '../utils/requirePropFactory';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import useTheme from '../styles/useTheme';
import GridContext from './GridContext';
import gridClasses, { getGridUtilityClass } from './gridClasses';

export function generateGrid({ theme, ownerState }) {
  let size;

  return theme.breakpoints.keys.reduce((globalStyles, breakpoint) => {
    // Use side effect over immutability for better performance.
    let styles = {};
    if (ownerState[breakpoint]) {
      size = ownerState[breakpoint];
    }
    if (!size) {
      return globalStyles;
    }

    if (size === true) {
      // For the auto layouting
      styles = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: '100%',
      };
    } else if (size === 'auto') {
      styles = {
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        maxWidth: 'none',
        width: 'auto',
      };
    } else {
      const columnsBreakpointValues = resolveBreakpointValues({
        values: ownerState.columns,
        breakpoints: theme.breakpoints.values,
      });

      const columnValue =
        typeof columnsBreakpointValues === 'object'
          ? columnsBreakpointValues[breakpoint]
          : columnsBreakpointValues;
      if (columnValue === undefined || columnValue === null) {
        return globalStyles;
      }
      // Keep 7 significant numbers.
      const width = `${Math.round((size / columnValue) * 10e7) / 10e5}%`;
      let more = {};

      if (ownerState.container && ownerState.item && ownerState.columnSpacing !== 0) {
        const themeSpacing = theme.spacing(ownerState.columnSpacing);
        if (themeSpacing !== '0px') {
          const fullWidth = `calc(${width} + ${themeSpacing})`;
          more = {
            flexBasis: fullWidth,
            maxWidth: fullWidth,
          };
        }
      }

      // Close to the bootstrap implementation:
      // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41
      styles = {
        flexBasis: width,
        flexGrow: 0,
        maxWidth: width,
        ...more,
      };
    }

    // No need for a media query for the first size.
    if (theme.breakpoints.values[breakpoint] === 0) {
      Object.assign(globalStyles, styles);
    } else {
      globalStyles[theme.breakpoints.up(breakpoint)] = styles;
    }
    return globalStyles;
  }, {});
}

export function generateDirection({ theme, ownerState }) {
  const directionValues = resolveBreakpointValues({
    values: ownerState.direction,
    breakpoints: theme.breakpoints.values,
  });

  return handleBreakpoints({ theme }, directionValues, (propValue) => {
    const output = {
      flexDirection: propValue,
    };

    if (propValue.startsWith('column')) {
      output[`& > .${gridClasses.item}`] = {
        maxWidth: 'none',
      };
    }

    return output;
  });
}

/**
 * Extracts zero value breakpoint keys before a non-zero value breakpoint key.
 * @example { xs: 0, sm: 0, md: 2, lg: 0, xl: 0 } or [0, 0, 2, 0, 0]
 * @returns [xs, sm]
 */
function extractZeroValueBreakpointKeys({ breakpoints, values }) {
  let nonZeroKey = '';

  Object.keys(values).forEach((key) => {
    if (nonZeroKey !== '') {
      return;
    }

    if (values[key] !== 0) {
      nonZeroKey = key;
    }
  });

  const sortedBreakpointKeysByValue = Object.keys(breakpoints).sort((a, b) => {
    return breakpoints[a] - breakpoints[b];
  });

  return sortedBreakpointKeysByValue.slice(0, sortedBreakpointKeysByValue.indexOf(nonZeroKey));
}

export function generateRowGap({ theme, ownerState }) {
  const { container, rowSpacing } = ownerState;
  let styles = {};

  if (container && rowSpacing !== 0) {
    const rowSpacingValues = resolveBreakpointValues({
      values: rowSpacing,
      breakpoints: theme.breakpoints.values,
    });

    let zeroValueBreakpointKeys;
    if (typeof rowSpacingValues === 'object') {
      zeroValueBreakpointKeys = extractZeroValueBreakpointKeys({
        breakpoints: theme.breakpoints.values,
        values: rowSpacingValues,
      });
    }

    styles = handleBreakpoints({ theme }, rowSpacingValues, (propValue, breakpoint) => {
      const themeSpacing = theme.spacing(propValue);

      if (themeSpacing !== '0px') {
        return {
          marginTop: theme.spacing(-propValue),
          [`& > .${gridClasses.item}`]: {
            paddingTop: themeSpacing,
          },
        };
      }

      if (zeroValueBreakpointKeys?.includes(breakpoint)) {
        return {};
      }

      return {
        marginTop: 0,
        [`& > .${gridClasses.item}`]: {
          paddingTop: 0,
        },
      };
    });
  }

  return styles;
}

export function generateColumnGap({ theme, ownerState }) {
  const { container, columnSpacing } = ownerState;
  let styles = {};

  if (container && columnSpacing !== 0) {
    const columnSpacingValues = resolveBreakpointValues({
      values: columnSpacing,
      breakpoints: theme.breakpoints.values,
    });

    let zeroValueBreakpointKeys;
    if (typeof columnSpacingValues === 'object') {
      zeroValueBreakpointKeys = extractZeroValueBreakpointKeys({
        breakpoints: theme.breakpoints.values,
        values: columnSpacingValues,
      });
    }

    styles = handleBreakpoints({ theme }, columnSpacingValues, (propValue, breakpoint) => {
      const themeSpacing = theme.spacing(propValue);
      if (themeSpacing !== '0px') {
        const negativeValue = theme.spacing(-propValue);
        return {
          width: `calc(100% + ${themeSpacing})`,
          marginLeft: negativeValue,
          [`& > .${gridClasses.item}`]: {
            paddingLeft: themeSpacing,
          },
        };
      }

      if (zeroValueBreakpointKeys?.includes(breakpoint)) {
        return {};
      }

      return {
        width: '100%',
        marginLeft: 0,
        [`& > .${gridClasses.item}`]: {
          paddingLeft: 0,
        },
      };
    });
  }

  return styles;
}

export function resolveSpacingStyles(spacing, breakpoints, styles = {}) {
  // undefined/null or `spacing` <= 0
  if (!spacing || spacing <= 0) {
    return [];
  }
  // in case of string/number `spacing`
  if (
    (typeof spacing === 'string' && !Number.isNaN(Number(spacing))) ||
    typeof spacing === 'number'
  ) {
    return [styles[`spacing-xs-${String(spacing)}`]];
  }
  // in case of object `spacing`
  const spacingStyles = [];

  breakpoints.forEach((breakpoint) => {
    const value = spacing[breakpoint];

    if (Number(value) > 0) {
      spacingStyles.push(styles[`spacing-${breakpoint}-${String(value)}`]);
    }
  });

  return spacingStyles;
}

// Default CSS values
// flex: '0 1 auto',
// flexDirection: 'row',
// alignItems: 'flex-start',
// flexWrap: 'nowrap',
// justifyContent: 'flex-start',
const GridRoot = styled('div', {
  name: 'MuiGrid',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    const { container, direction, item, spacing, wrap, zeroMinWidth, breakpoints } = ownerState;

    let spacingStyles = [];

    // in case of grid item
    if (container) {
      spacingStyles = resolveSpacingStyles(spacing, breakpoints, styles);
    }

    const breakpointsStyles = [];

    breakpoints.forEach((breakpoint) => {
      const value = ownerState[breakpoint];

      if (value) {
        breakpointsStyles.push(styles[`grid-${breakpoint}-${String(value)}`]);
      }
    });

    return [
      styles.root,
      container && styles.container,
      item && styles.item,
      zeroMinWidth && styles.zeroMinWidth,
      ...spacingStyles,
      direction !== 'row' && styles[`direction-xs-${String(direction)}`],
      wrap !== 'wrap' && styles[`wrap-xs-${String(wrap)}`],
      ...breakpointsStyles,
    ];
  },
})(
  // FIXME(romgrk): Can't use memoTheme here
  ({ ownerState }) => ({
    boxSizing: 'border-box',
    ...(ownerState.container && {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
    }),
    ...(ownerState.item && {
      margin: 0, // For instance, it's useful when used with a `figure` element.
    }),
    ...(ownerState.zeroMinWidth && {
      minWidth: 0,
    }),
    ...(ownerState.wrap !== 'wrap' && {
      flexWrap: ownerState.wrap,
    }),
  }),
  generateDirection,
  generateRowGap,
  generateColumnGap,
  generateGrid,
);

export function resolveSpacingClasses(spacing, breakpoints) {
  // undefined/null or `spacing` <= 0
  if (!spacing || spacing <= 0) {
    return [];
  }
  // in case of string/number `spacing`
  if (
    (typeof spacing === 'string' && !Number.isNaN(Number(spacing))) ||
    typeof spacing === 'number'
  ) {
    return [`spacing-xs-${String(spacing)}`];
  }
  // in case of object `spacing`
  const classes = [];

  breakpoints.forEach((breakpoint) => {
    const value = spacing[breakpoint];

    if (Number(value) > 0) {
      const className = `spacing-${breakpoint}-${String(value)}`;

      classes.push(className);
    }
  });

  return classes;
}

const useUtilityClasses = (ownerState) => {
  const { classes, container, direction, item, spacing, wrap, zeroMinWidth, breakpoints } =
    ownerState;

  let spacingClasses = [];

  // in case of grid item
  if (container) {
    spacingClasses = resolveSpacingClasses(spacing, breakpoints);
  }

  const breakpointsClasses = [];

  breakpoints.forEach((breakpoint) => {
    const value = ownerState[breakpoint];

    if (value) {
      breakpointsClasses.push(`grid-${breakpoint}-${String(value)}`);
    }
  });

  const slots = {
    root: [
      'root',
      container && 'container',
      item && 'item',
      zeroMinWidth && 'zeroMinWidth',
      ...spacingClasses,
      direction !== 'row' && `direction-xs-${String(direction)}`,
      wrap !== 'wrap' && `wrap-xs-${String(wrap)}`,
      ...breakpointsClasses,
    ],
  };

  return composeClasses(slots, getGridUtilityClass, classes);
};

/**
 * @deprecated Use the [`Grid2`](https://next.mui.com/material-ui/react-grid2/) component instead.
 */
const Grid = React.forwardRef(function Grid(inProps, ref) {
  const themeProps = useThemeProps({ props: inProps, name: 'MuiGrid' });
  const { breakpoints } = useTheme();

  const props = extendSxProp(themeProps);
  const {
    className,
    columns: columnsProp,
    columnSpacing: columnSpacingProp,
    component = 'div',
    container = false,
    direction = 'row',
    item = false,
    rowSpacing: rowSpacingProp,
    spacing = 0,
    wrap = 'wrap',
    zeroMinWidth = false,
    ...other
  } = props;

  const rowSpacing = rowSpacingProp || spacing;
  const columnSpacing = columnSpacingProp || spacing;

  const columnsContext = React.useContext(GridContext);

  // columns set with default breakpoint unit of 12
  const columns = container ? columnsProp || 12 : columnsContext;

  const breakpointsValues = {};
  const otherFiltered = { ...other };

  breakpoints.keys.forEach((breakpoint) => {
    if (other[breakpoint] != null) {
      breakpointsValues[breakpoint] = other[breakpoint];
      delete otherFiltered[breakpoint];
    }
  });

  const ownerState = {
    ...props,
    columns,
    container,
    direction,
    item,
    rowSpacing,
    columnSpacing,
    wrap,
    zeroMinWidth,
    spacing,
    ...breakpointsValues,
    breakpoints: breakpoints.keys,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <GridContext.Provider value={columns}>
      <GridRoot
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        as={component}
        ref={ref}
        {...otherFiltered}
      />
    </GridContext.Provider>
  );
});

Grid.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The number of columns.
   * @default 12
   */
  columns: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.object,
  ]),
  /**
   * Defines the horizontal space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  columnSpacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
    PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])),
    PropTypes.object,
  ]),
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  item: PropTypes.bool,
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `lg` breakpoint and wider screens if not overridden.
   * @default false
   */
  lg: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `md` breakpoint and wider screens if not overridden.
   * @default false
   */
  md: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `sm` breakpoint and wider screens if not overridden.
   * @default false
   */
  sm: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
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
   * @deprecated Use `flexWrap` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  wrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `xl` breakpoint and wider screens if not overridden.
   * @default false
   */
  xl: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for all the screen sizes with the lowest priority.
   * @default false
   */
  xs: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   * @default false
   */
  zeroMinWidth: PropTypes.bool,
};

if (process.env.NODE_ENV !== 'production') {
  const requireProp = requirePropFactory('Grid', Grid);
  // eslint-disable-next-line no-useless-concat
  Grid['propTypes' + ''] = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...Grid.propTypes,
    direction: requireProp('container'),
    lg: requireProp('item'),
    md: requireProp('item'),
    sm: requireProp('item'),
    spacing: requireProp('container'),
    wrap: requireProp('container'),
    xs: requireProp('item'),
    zeroMinWidth: requireProp('item'),
  };
}

export default Grid;
