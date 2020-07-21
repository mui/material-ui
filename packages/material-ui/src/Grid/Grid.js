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
import withStyles from '../styles/withStyles';
import requirePropFactory from '../utils/requirePropFactory';

const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const GRID_SIZES = ['auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function generateGrid(globalStyles, theme, breakpoint) {
  const styles = {};

  GRID_SIZES.forEach((size) => {
    const key = `grid-${breakpoint}-${size}`;

    if (size === true) {
      // For the auto layouting
      styles[key] = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: '100%',
      };

      return;
    }

    if (size === 'auto') {
      styles[key] = {
        flexBasis: 'auto',
        flexGrow: 0,
        maxWidth: 'none',
      };

      return;
    }

    // Keep 7 significant numbers.
    const width = `${Math.round((size / 12) * 10e7) / 10e5}%`;

    // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41
    styles[key] = {
      flexBasis: width,
      flexGrow: 0,
      maxWidth: width,
    };
  });

  // No need for a media query for the first size.
  if (breakpoint === 'xs') {
    Object.assign(globalStyles, styles);
  } else {
    globalStyles[theme.breakpoints.up(breakpoint)] = styles;
  }
}

function getOffset(val, div = 1) {
  const parse = parseFloat(val);
  return `${parse / div}${String(val).replace(String(parse), '') || 'px'}`;
}

function generateGutter(theme, breakpoint) {
  const styles = {};

  SPACINGS.forEach((spacing) => {
    const themeSpacing = theme.spacing(spacing);

    if (themeSpacing === 0) {
      return;
    }

    styles[`spacing-${breakpoint}-${spacing}`] = {
      margin: `-${getOffset(themeSpacing, 2)}`,
      width: `calc(100% + ${getOffset(themeSpacing)})`,
      '& > $item': {
        padding: getOffset(themeSpacing, 2),
      },
    };
  });

  return styles;
}

// Default CSS values
// flex: '0 1 auto',
// flexDirection: 'row',
// alignItems: 'flex-start',
// flexWrap: 'nowrap',
// justifyContent: 'flex-start',
export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `container={true}`. */
  container: {
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  /* Styles applied to the root element if `item={true}`. */
  item: {
    boxSizing: 'border-box',
    margin: '0', // For instance, it's useful when used with a `figure` element.
  },
  /* Styles applied to the root element if `zeroMinWidth={true}`. */
  zeroMinWidth: {
    minWidth: 0,
  },
  /* Styles applied to the root element if `direction="column"`. */
  'direction-xs-column': {
    flexDirection: 'column',
  },
  /* Styles applied to the root element if `direction="column-reverse"`. */
  'direction-xs-column-reverse': {
    flexDirection: 'column-reverse',
  },
  /* Styles applied to the root element if `direction="row-reverse"`. */
  'direction-xs-row-reverse': {
    flexDirection: 'row-reverse',
  },
  /* Styles applied to the root element if `wrap="nowrap"`. */
  'wrap-xs-nowrap': {
    flexWrap: 'nowrap',
  },
  /* Styles applied to the root element if `wrap="reverse"`. */
  'wrap-xs-wrap-reverse': {
    flexWrap: 'wrap-reverse',
  },
  /* Styles applied to the root element if `alignItems="center"`. */
  'align-items-xs-center': {
    alignItems: 'center',
  },
  /* Styles applied to the root element if `alignItems="flex-start"`. */
  'align-items-xs-flex-start': {
    alignItems: 'flex-start',
  },
  /* Styles applied to the root element if `alignItems="flex-end"`. */
  'align-items-xs-flex-end': {
    alignItems: 'flex-end',
  },
  /* Styles applied to the root element if `alignItems="baseline"`. */
  'align-items-xs-baseline': {
    alignItems: 'baseline',
  },
  /* Styles applied to the root element if `alignContent="center"`. */
  'align-content-xs-center': {
    alignContent: 'center',
  },
  /* Styles applied to the root element if `alignContent="flex-start"`. */
  'align-content-xs-flex-start': {
    alignContent: 'flex-start',
  },
  /* Styles applied to the root element if `alignContent="flex-end"`. */
  'align-content-xs-flex-end': {
    alignContent: 'flex-end',
  },
  /* Styles applied to the root element if `alignContent="space-between"`. */
  'align-content-xs-space-between': {
    alignContent: 'space-between',
  },
  /* Styles applied to the root element if `alignContent="space-around"`. */
  'align-content-xs-space-around': {
    alignContent: 'space-around',
  },
  /* Styles applied to the root element if `justifyContent="center"`. */
  'justify-content-xs-center': {
    justifyContent: 'center',
  },
  /* Styles applied to the root element if `justifyContent="flex-end"`. */
  'justify-content-xs-flex-end': {
    justifyContent: 'flex-end',
  },
  /* Styles applied to the root element if `justifyContent="space-between"`. */
  'justify-content-xs-space-between': {
    justifyContent: 'space-between',
  },
  /* Styles applied to the root element if `justifyContent="space-around"`. */
  'justify-content-xs-space-around': {
    justifyContent: 'space-around',
  },
  /* Styles applied to the root element if `justifyContent="space-evenly"`. */
  'justify-content-xs-space-evenly': {
    justifyContent: 'space-evenly',
  },
  ...generateGutter(theme, 'xs'),
  ...theme.breakpoints.keys.reduce((accumulator, key) => {
    // Use side effect over immutability for better performance.
    generateGrid(accumulator, theme, key);
    return accumulator;
  }, {}),
});

const Grid = React.forwardRef(function Grid(props, ref) {
  const {
    alignContent = 'stretch',
    alignItems = 'stretch',
    classes,
    className: classNameProp,
    component: Component = 'div',
    container = false,
    direction = 'row',
    item = false,
    justifyContent = 'flex-start',
    lg = false,
    md = false,
    sm = false,
    spacing = 0,
    wrap = 'wrap',
    xl = false,
    xs = false,
    zeroMinWidth = false,
    ...other
  } = props;

  const className = clsx(
    classes.root,
    {
      [classes.container]: container,
      [classes.item]: item,
      [classes.zeroMinWidth]: zeroMinWidth,
      [classes[`spacing-xs-${String(spacing)}`]]: container && spacing !== 0,
      [classes[`direction-xs-${String(direction)}`]]: direction !== 'row',
      [classes[`wrap-xs-${String(wrap)}`]]: wrap !== 'wrap',
      [classes[`align-items-xs-${String(alignItems)}`]]: alignItems !== 'stretch',
      [classes[`align-content-xs-${String(alignContent)}`]]: alignContent !== 'stretch',
      [classes[`justify-content-xs-${String(justifyContent)}`]]: justifyContent !== 'flex-start',
      [classes[`grid-xs-${String(xs)}`]]: xs !== false,
      [classes[`grid-sm-${String(sm)}`]]: sm !== false,
      [classes[`grid-md-${String(md)}`]]: md !== false,
      [classes[`grid-lg-${String(lg)}`]]: lg !== false,
      [classes[`grid-xl-${String(xl)}`]]: xl !== false,
    },
    classNameProp,
  );

  return <Component className={className} ref={ref} {...other} />;
});

Grid.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Defines the `align-content` style property.
   * It's applied for all screen sizes.
   */
  alignContent: PropTypes.oneOf([
    'center',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between',
    'stretch',
  ]),
  /**
   * Defines the `align-items` style property.
   * It's applied for all screen sizes.
   */
  alignItems: PropTypes.oneOf(['baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   */
  container: PropTypes.bool,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   */
  direction: PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   */
  item: PropTypes.bool,
  /**
   * Defines the `justify-content` style property.
   * It is applied for all screen sizes.
   */
  justifyContent: PropTypes.oneOf([
    'center',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between',
    'space-evenly',
  ]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lg: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    PropTypes.bool,
  ]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   */
  md: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    PropTypes.bool,
  ]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   */
  sm: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    PropTypes.bool,
  ]),
  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   */
  spacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   */
  wrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   */
  xl: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    PropTypes.bool,
  ]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   */
  xs: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    PropTypes.bool,
  ]),
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   */
  zeroMinWidth: PropTypes.bool,
};

const StyledGrid = withStyles(styles, { name: 'MuiGrid' })(Grid);

if (process.env.NODE_ENV !== 'production') {
  const requireProp = requirePropFactory('Grid');
  StyledGrid.propTypes = {
    ...StyledGrid.propTypes,
    alignContent: requireProp('container'),
    alignItems: requireProp('container'),
    direction: requireProp('container'),
    justifyContent: requireProp('container'),
    lg: requireProp('item'),
    md: requireProp('item'),
    sm: requireProp('item'),
    spacing: requireProp('container'),
    wrap: requireProp('container'),
    xs: requireProp('item'),
    zeroMinWidth: requireProp('item'),
  };
}

export default StyledGrid;
