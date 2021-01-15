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
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import requirePropFactory from '../utils/requirePropFactory';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import gridClasses, { getGridUtilityClass } from './gridClasses';

function generateGrid(globalStyles, theme, breakpoint, styleProps) {
  const size = styleProps[breakpoint];

  if (!size) return;

  let styles = {};

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
      maxWidth: 'none',
    };
  } else {
    // Keep 7 significant numbers.
    const width = `${Math.round((size / 12) * 10e7) / 10e5}%`;

    // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41
    styles = {
      flexBasis: width,
      flexGrow: 0,
      maxWidth: width,
    };
  }

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

function generateGutter({ theme, styleProps }) {
  const { container, spacing } = styleProps;
  let styles = {};

  if (container && spacing !== 0) {
    const themeSpacing = theme.spacing(spacing);

    if (themeSpacing !== '0px') {
      styles = {
        margin: `-${getOffset(themeSpacing, 2)}`,
        width: `calc(100% + ${getOffset(themeSpacing)})`,
        [`& > .${gridClasses.item}`]: {
          padding: getOffset(themeSpacing, 2),
        },
      };
    }
  }

  return styles;
}

const overridesResolver = (props, styles) => {
  const {
    alignContent,
    alignItems,
    container,
    direction,
    item,
    justifyContent,
    lg,
    md,
    sm,
    spacing,
    wrap,
    xl,
    xs,
    zeroMinWidth,
  } = props.styleProps;

  return deepmerge(styles.root || {}, {
    ...(container && styles.container),
    ...(item && styles.item),
    ...(zeroMinWidth && styles.zeroMinWidth),
    ...(container && spacing !== 0 && styles[`spacing-xs-${String(spacing)}`]),
    ...(direction !== 'row' && styles[`direction-xs-${String(direction)}`]),
    ...(wrap !== 'wrap' && styles[`wrap-xs-${String(wrap)}`]),
    ...(alignItems !== 'stretch' && styles[`align-items-xs-${String(alignItems)}`]),
    ...(alignContent !== 'stretch' && styles[`align-content-xs-${String(alignContent)}`]),
    ...(justifyContent !== 'flex-start' && styles[`justify-content-xs-${String(justifyContent)}`]),
    ...(xs !== false && styles[`grid-xs-${String(xs)}`]),
    ...(sm !== false && styles[`grid-sm-${String(sm)}`]),
    ...(md !== false && styles[`grid-md-${String(md)}`]),
    ...(lg !== false && styles[`grid-lg-${String(lg)}`]),
    ...(xl !== false && styles[`grid-xl-${String(xl)}`]),
  });
};

// Default CSS values
// flex: '0 1 auto',
// flexDirection: 'row',
// alignItems: 'flex-start',
// flexWrap: 'nowrap',
// justifyContent: 'flex-start',
const GridRoot = experimentalStyled(
  'div',
  {},
  { name: 'MuiGrid', slot: 'Root', overridesResolver },
)(
  ({ styleProps }) => ({
    boxSizing: 'border-box',
    ...(styleProps.container && {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
    }),
    ...(styleProps.item && {
      margin: 0, // For instance, it's useful when used with a `figure` element.
    }),
    ...(styleProps.zeroMinWidth && {
      minWidth: 0,
    }),
    ...(styleProps.direction === 'column' && {
      flexDirection: 'column',
      [`& > .${gridClasses.item}`]: {
        maxWidth: 'none',
      },
    }),
    ...(styleProps.direction === 'column-reverse' && {
      flexDirection: 'column-reverse',
      [`& > .${gridClasses.item}`]: {
        maxWidth: 'none',
      },
    }),
    ...(styleProps.direction === 'row-reverse' && {
      flexDirection: 'row-reverse',
    }),
    ...(styleProps.wrap === 'nowrap' && {
      flexWrap: 'nowrap',
    }),
    ...(styleProps.wrap === 'reverse' && {
      flexWrap: 'wrap-reverse',
    }),
    ...(styleProps.alignItems && {
      alignItems: styleProps.alignItems,
    }),
    ...(styleProps.alignContent && {
      alignContent: styleProps.alignContent,
    }),
    ...(styleProps.justifyContent && {
      justifyContent: styleProps.justifyContent,
    }),
  }),
  generateGutter,
  ({ theme, styleProps }) =>
    theme.breakpoints.keys.reduce((accumulator, key) => {
      // Use side effect over immutability for better performance.
      generateGrid(accumulator, theme, key, styleProps);
      return accumulator;
    }, {}),
);

const useUtilityClasses = (styleProps) => {
  const {
    alignContent,
    alignItems,
    classes,
    container,
    direction,
    item,
    justifyContent,
    lg,
    md,
    sm,
    spacing,
    wrap,
    xl,
    xs,
    zeroMinWidth,
  } = styleProps;

  const slots = {
    root: [
      'root',
      container && 'container',
      item && 'item',
      zeroMinWidth && 'zeroMinWidth',
      container && spacing !== 0 && `spacing-xs-${String(spacing)}`,
      direction !== 'row' && `direction-xs-${String(direction)}`,
      wrap !== 'wrap' && `wrap-xs-${String(wrap)}`,
      alignItems !== 'stretch' && `align-items-xs-${String(alignItems)}`,
      alignContent !== 'stretch' && `align-content-xs-${String(alignContent)}`,
      justifyContent !== 'flex-start' && `justify-content-xs-${String(justifyContent)}`,
      xs !== false && `grid-xs-${String(xs)}`,
      sm !== false && `grid-sm-${String(sm)}`,
      md !== false && `grid-md-${String(md)}`,
      lg !== false && `grid-lg-${String(lg)}`,
      xl !== false && `grid-xl-${String(xl)}`,
    ],
  };

  return composeClasses(slots, getGridUtilityClass, classes);
};

const Grid = React.forwardRef(function Grid(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiGrid' });

  const {
    alignContent = 'stretch',
    alignItems = 'stretch',
    className,
    component = 'div',
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

  const styleProps = {
    ...props,
    alignContent,
    alignItems,
    container,
    direction,
    item,
    justifyContent,
    lg,
    md,
    sm,
    spacing,
    wrap,
    xl,
    xs,
    zeroMinWidth,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <GridRoot
      styleProps={styleProps}
      className={clsx(classes.root, className)}
      as={component}
      ref={ref}
      {...other}
    />
  );
});

Grid.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Defines the `align-content` style property.
   * It's applied for all screen sizes.
   * @default 'stretch'
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
   * @default 'stretch'
   */
  alignItems: PropTypes.oneOf(['baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
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
  direction: PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  item: PropTypes.bool,
  /**
   * Defines the `justify-content` style property.
   * It is applied for all screen sizes.
   * @default 'flex-start'
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
   * @default false
   */
  lg: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    PropTypes.bool,
  ]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   * @default false
   */
  md: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    PropTypes.bool,
  ]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   * @default false
   */
  sm: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    PropTypes.bool,
  ]),
  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   * @default false
   */
  xl: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    PropTypes.bool,
  ]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   * @default false
   */
  xs: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    PropTypes.bool,
  ]),
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   * @default false
   */
  zeroMinWidth: PropTypes.bool,
};

if (process.env.NODE_ENV !== 'production') {
  const requireProp = requirePropFactory('Grid');
  // eslint-disable-next-line no-useless-concat
  Grid['propTypes' + ''] = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...Grid.propTypes,
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

export default Grid;
