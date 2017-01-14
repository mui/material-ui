// @flow weak

/**
 * A layout component using the following libs as inspiration.
 *
 * For the implementation:
 * - http://v4-alpha.getbootstrap.com/layout/flexbox-grid/
 * - https://github.com/kristoferjoseph/flexboxgrid/blob/master/src/css/flexboxgrid.css
 * - https://github.com/roylee0704/react-flexbox-grid
 * - https://material.angularjs.org/latest/layout/introduction
 *
 * Follow this flexbox Guide to better understand the underlying model:
 * - https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

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

  GRID_SIZES.forEach((size, index) => {
    if (index === 0) { // Skip the first one as handle above.
      return;
    }

    // Only keep 6 significant numbers.
    const width = `${Math.round((size / 12) * (10 ** 6)) / (10 ** 4)}%`;

    /* eslint-disable max-len */
    // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/b0508a975d711d6b24c01f57dd5445c22699fac4/scss/mixins/_grid.scss#L69
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

  GUTTERS.forEach((gutter, index) => {
    if (index === 0) { // Skip the default style.
      return;
    }

    styles[`gutter-${breakpoint}-${gutter}`] = {
      margin: -gutter / 2,
      '& > $typeItem': {
        padding: gutter / 2,
      },
    };
  });

  return styles;
}

export const styleSheet = createStyleSheet('Layout', (theme) => {
  // Default CSS values
  // flex: '0 1 auto',
  // flexDirection: 'row',
  // alignItems: 'flex-start',
  // flexWrap: 'nowrap',
  // justifyContent: 'flex-start',

  return {
    typeContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    typeItem: {
      flex: '0 0 auto',
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
    'align-xs-center': {
      alignItems: 'center',
    },
    'align-xs-flex-end': {
      alignItems: 'flex-end',
    },
    'align-xs-stretch': {
      alignItems: 'stretch',
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
    ...theme.breakpoints.keys.reduce((styles, key) => {
      // Use side effect for performance.
      generateGrid(styles, theme, key);

      return styles;
    }, {}),
  };
});

function Layout(props, context) {
  const {
    children,
    className,
    component: ComponentProp,
    container,
    item,
    align,
    direction,
    xs,
    sm,
    md,
    lg,
    xl,
    gutter,
    justify,
    wrap,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);

  return (
    <ComponentProp
      className={classNames({
        [classes.typeContainer]: container,
        [classes.typeItem]: item,
        [classes[`gutter-xs-${gutter}`]]: container && gutter !== 0,
        [classes[`direction-xs-${direction}`]]: direction !== Layout.defaultProps.direction,
        [classes[`wrap-xs-${wrap}`]]: wrap !== Layout.defaultProps.wrap,
        [classes[`align-xs-${align}`]]: align !== Layout.defaultProps.align,
        [classes[`justify-xs-${justify}`]]: justify !== Layout.defaultProps.justify,
        [classes['grid-xs']]: xs === true,
        [classes[`grid-xs-${xs}`]]: xs && xs !== true,
        [classes['grid-sm']]: sm === true,
        [classes[`grid-sm-${sm}`]]: sm && sm !== true,
        [classes['grid-md']]: md === true,
        [classes[`grid-md-${md}`]]: md && md !== true,
        [classes['grid-lg']]: lg === true,
        [classes[`grid-lg-${lg}`]]: lg && lg !== true,
        [classes['grid-xl']]: xl === true,
        [classes[`grid-xl-${xl}`]]: xl && xl !== true,
      }, className)}
      {...other}
    >
      {children}
    </ComponentProp>
  );
}

const gridPropType = PropTypes.oneOf(GRID_SIZES);

Layout.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * The element or component used for the root node.
   */
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /**
   * It true, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   */
  container: PropTypes.bool,
  /**
   * It true, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   */
  item: PropTypes.bool,
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   */
  xs: gridPropType,
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   */
  sm: gridPropType, // eslint-disable-line react/sort-prop-types
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   */
  md: gridPropType, // eslint-disable-line react/sort-prop-types
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lg: gridPropType, // eslint-disable-line react/sort-prop-types
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   */
  xl: gridPropType, // eslint-disable-line react/sort-prop-types
  /**
   * Defines the `align-items` style property.
   * It's applied for all the screen sizes.
   */
  align: PropTypes.oneOf([ // eslint-disable-line react/sort-prop-types
    'flex-start',
    'center',
    'flex-end',
    'stretch',
  ]),
  /**
   * Defines the `flex-direction` style property.
   * It's applied for all the screen sizes.
   */
  direction: PropTypes.oneOf([ // eslint-disable-line react/sort-prop-types
    'row',
    'row-reverse',
    'column',
    'column-reverse',
  ]),
  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   */
  gutter: PropTypes.oneOf(GUTTERS), // eslint-disable-line react/sort-prop-types
  /**
   * Defines the `justify-content` style property.
   * It's applied for all the screen sizes.
   */
  justify: PropTypes.oneOf([ // eslint-disable-line react/sort-prop-types
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
  ]),
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all the screen sizes.
   */
  wrap: PropTypes.oneOf([ // eslint-disable-line react/sort-prop-types
    'nowrap',
    'wrap',
    'wrap-reverse',
  ]),
};

Layout.defaultProps = {
  component: 'div',
  container: false,
  item: false,
  align: 'flex-start',
  direction: 'row',
  gutter: 16,
  justify: 'flex-start',
  wrap: 'wrap',
};

Layout.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

export default Layout;
