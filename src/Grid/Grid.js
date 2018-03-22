// A grid component using the following libs as inspiration.
//
// For the implementation:
// - http://v4-alpha.getbootstrap.com/layout/flexbox-grid/
// - https://github.com/kristoferjoseph/flexboxgrid/blob/master/src/css/flexboxgrid.css
// - https://github.com/roylee0704/react-flexbox-grid
// - https://material.angularjs.org/latest/layout/introduction
//
// Follow this flexbox Guide to better understand the underlying model:
// - https://css-tricks.com/snippets/css/a-guide-to-flexbox/

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { keys as breakpointKeys } from '../styles/createBreakpoints';
import requirePropFactory from '../utils/requirePropFactory';
import Hidden from '../Hidden';

const GUTTERS = [0, 8, 16, 24, 40];
const GRID_SIZES = [true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function generateGrid(globalStyles, theme, breakpoint) {
  // For the auto layouting
  const styles = {
    [`grid-${breakpoint}`]: {
      flexBasis: 0,
      flexGrow: 1,
      maxWidth: '100%',
    },
  };

  GRID_SIZES.forEach(size => {
    if (typeof size === 'boolean') {
      // Skip the first one as handle above.
      return;
    }

    // Only keep 6 significant numbers.
    const width = `${Math.round(size / 12 * 10e6) / 10e4}%`;

    /* eslint-disable max-len */
    // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41
    /* eslint-enable max-len */
    styles[`grid-${breakpoint}-${size}`] = {
      flexBasis: width,
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

function generateGutter(theme, breakpoint) {
  const styles = {};

  GUTTERS.forEach((spacing, index) => {
    if (index === 0) {
      // Skip the default style.
      return;
    }

    styles[`spacing-${breakpoint}-${spacing}`] = {
      margin: -spacing / 2,
      width: `calc(100% + ${spacing}px)`,
      '& > $typeItem': {
        padding: spacing / 2,
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
export const styles = theme => ({
  typeContainer: {
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  typeItem: {
    boxSizing: 'border-box',
    flex: '0 0 auto',
    margin: '0', // For instance, it's useful when used with a `figure` element.
  },
  zeroMinWidth: {
    minWidth: 0,
  },
  'direction-xs-column': {
    flexDirection: 'column',
  },
  'direction-xs-column-reverse': {
    flexDirection: 'column-reverse',
  },
  'direction-xs-row-reverse': {
    flexDirection: 'row-reverse',
  },
  'wrap-xs-nowrap': {
    flexWrap: 'nowrap',
  },
  'wrap-xs-wrap-reverse': {
    flexWrap: 'wrap-reverse',
  },
  'align-items-xs-center': {
    alignItems: 'center',
  },
  'align-items-xs-flex-start': {
    alignItems: 'flex-start',
  },
  'align-items-xs-flex-end': {
    alignItems: 'flex-end',
  },
  'align-items-xs-baseline': {
    alignItems: 'baseline',
  },
  'align-content-xs-center': {
    alignContent: 'center',
  },
  'align-content-xs-flex-start': {
    alignContent: 'flex-start',
  },
  'align-content-xs-flex-end': {
    alignContent: 'flex-end',
  },
  'align-content-xs-space-between': {
    alignContent: 'space-between',
  },
  'align-content-xs-space-around': {
    alignContent: 'space-around',
  },
  'justify-xs-center': {
    justifyContent: 'center',
  },
  'justify-xs-flex-end': {
    justifyContent: 'flex-end',
  },
  'justify-xs-space-between': {
    justifyContent: 'space-between',
  },
  'justify-xs-space-around': {
    justifyContent: 'space-around',
  },
  ...generateGutter(theme, 'xs'),
  ...breakpointKeys.reduce((accumulator, key) => {
    // Use side effect over immutability for better performance.
    generateGrid(accumulator, theme, key);
    return accumulator;
  }, {}),
});

function Grid(props) {
  const {
    alignContent,
    alignItems,
    classes,
    className: classNameProp,
    component: Component,
    container,
    direction,
    hidden,
    item,
    justify,
    lg,
    md,
    sm,
    spacing,
    wrap,
    xl,
    xs,
    zeroMinWidth,
    ...other
  } = props;

  const className = classNames(
    {
      [classes.typeContainer]: container,
      [classes.typeItem]: item,
      [classes.zeroMinWidth]: zeroMinWidth,
      [classes[`spacing-xs-${String(spacing)}`]]: container && spacing !== 0,
      [classes[`direction-xs-${String(direction)}`]]: direction !== Grid.defaultProps.direction,
      [classes[`wrap-xs-${String(wrap)}`]]: wrap !== Grid.defaultProps.wrap,
      [classes[`align-items-xs-${String(alignItems)}`]]:
        alignItems !== Grid.defaultProps.alignItems,
      [classes[`align-content-xs-${String(alignContent)}`]]:
        alignContent !== Grid.defaultProps.alignContent,
      [classes[`justify-xs-${String(justify)}`]]: justify !== Grid.defaultProps.justify,
      [classes['grid-xs']]: xs === true,
      [classes[`grid-xs-${String(xs)}`]]: xs && xs !== true,
      [classes['grid-sm']]: sm === true,
      [classes[`grid-sm-${String(sm)}`]]: sm && sm !== true,
      [classes['grid-md']]: md === true,
      [classes[`grid-md-${String(md)}`]]: md && md !== true,
      [classes['grid-lg']]: lg === true,
      [classes[`grid-lg-${String(lg)}`]]: lg && lg !== true,
      [classes['grid-xl']]: xl === true,
      [classes[`grid-xl-${String(xl)}`]]: xl && xl !== true,
    },
    classNameProp,
  );
  const gridProps = { className, ...other };

  if (hidden) {
    return (
      <Hidden {...hidden}>
        <Component {...gridProps} />
      </Hidden>
    );
  }

  return <Component {...gridProps} />;
}

Grid.propTypes = {
  /**
   * Defines the `align-content` style property.
   * It's applied for all screen sizes.
   */
  alignContent: PropTypes.oneOf([
    'stretch',
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around',
  ]),
  /**
   * Defines the `align-items` style property.
   * It's applied for all screen sizes.
   */
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   */
  container: PropTypes.bool,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   */
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  /**
   * If provided, will wrap with [Hidden](/api/hidden) component and given properties.
   */
  hidden: PropTypes.object,
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   */
  item: PropTypes.bool,
  /**
   * Defines the `justify-content` style property.
   * It is applied for all screen sizes.
   */
  justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lg: PropTypes.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   */
  md: PropTypes.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   */
  sm: PropTypes.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   */
  spacing: PropTypes.oneOf(GUTTERS),
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   */
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   */
  xl: PropTypes.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   */
  xs: PropTypes.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   */
  zeroMinWidth: PropTypes.bool,
};

Grid.defaultProps = {
  alignContent: 'stretch',
  alignItems: 'stretch',
  component: 'div',
  container: false,
  direction: 'row',
  item: false,
  justify: 'flex-start',
  spacing: 0,
  wrap: 'wrap',
  zeroMinWidth: false,
};

// Add a wrapper component to generate some helper messages in the development
// environment.
/* eslint-disable react/no-multi-comp */
// eslint-disable-next-line import/no-mutable-exports
let GridWrapper = Grid;

if (process.env.NODE_ENV !== 'production') {
  GridWrapper = props => <Grid {...props} />;

  const requireProp = requirePropFactory('Grid');
  GridWrapper.propTypes = {
    alignContent: requireProp('container'),
    alignItems: requireProp('container'),
    direction: requireProp('container'),
    justify: requireProp('container'),
    lg: requireProp('item'),
    md: requireProp('item'),
    sm: requireProp('item'),
    spacing: requireProp('container'),
    wrap: requireProp('container'),
    xs: requireProp('item'),
    zeroMinWidth: requireProp('zeroMinWidth'),
  };
}

export default withStyles(styles, { name: 'MuiGrid' })(GridWrapper);
