import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import requirePropFactory from '../utils/requirePropFactory';

const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function getOffset(val, div = 1) {
  const float = parseFloat(val);
  return `${float / div}${String(val).replace(String(float), '') || 'px'}`;
}

function generateGutter(theme) {
  const styles = {};

  SPACINGS.forEach(spacing => {
    const themeSpacing = theme.spacing(spacing);

    if (themeSpacing === 0) {
      return;
    }

    styles[`spacing-${spacing}`] = {
      width: '100%',
      '& > *': {
        margin: getOffset(themeSpacing, 2),
      },
    };
  });

  return styles;
}

export const styles = theme => ({
  /* Styles applied to the root element */
  root: {},
  /* Styles applied to the root element if `container={true}`. */
  container: {
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    '& > *': {
      boxSizing: 'border-box',
      margin: '0', // For instance, it's useful when used with a `figure` element.
    },
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
  'direction-column': {
    flexDirection: 'column',
  },
  /* Styles applied to the root element if `direction="column-reverse"`. */
  'direction-column-reverse': {
    flexDirection: 'column-reverse',
  },
  /* Styles applied to the root element if `direction="rwo-reverse"`. */
  'direction-row-reverse': {
    flexDirection: 'row-reverse',
  },
  /* Styles applied to the root element if `wrap="nowrap"`. */
  'wrap-nowrap': {
    flexWrap: 'nowrap',
  },
  /* Styles applied to the root element if `wrap="reverse"`. */
  'wrap-wrap-reverse': {
    flexWrap: 'wrap-reverse',
  },
  /* Styles applied to the root element if `alignItems="center"`. */
  'align-items-center': {
    alignItems: 'center',
  },
  /* Styles applied to the root element if `alignItems="flex-start"`. */
  'align-items-flex-start': {
    alignItems: 'flex-start',
  },
  /* Styles applied to the root element if `alignItems="flex-end"`. */
  'align-items-flex-end': {
    alignItems: 'flex-end',
  },
  /* Styles applied to the root element if `alignItems="baseline"`. */
  'align-items-baseline': {
    alignItems: 'baseline',
  },
  /* Styles applied to the root element if `alignContent="center"`. */
  'align-content-center': {
    alignContent: 'center',
  },
  /* Styles applied to the root element if `alignContent="flex-start"`. */
  'align-content-flex-start': {
    alignContent: 'flex-start',
  },
  /* Styles applied to the root element if `alignContent="flex-end"`. */
  'align-content-flex-end': {
    alignContent: 'flex-end',
  },
  /* Styles applied to the root element if `alignContent="space-between"`. */
  'align-content-space-between': {
    alignContent: 'space-between',
  },
  /* Styles applied to the root element if `alignContent="space-around"`. */
  'align-content-space-around': {
    alignContent: 'space-around',
  },
  /* Styles applied to the root element if `justify="center"`. */
  'justify-center': {
    justifyContent: 'center',
  },
  /* Styles applied to the root element if `justify="flex-end"`. */
  'justify-flex-end': {
    justifyContent: 'flex-end',
  },
  /* Styles applied to the root element if `justify="space-between"`. */
  'justify-space-between': {
    justifyContent: 'space-between',
  },
  /* Styles applied to the root element if `justify="space-around"`. */
  'justify-space-around': {
    justifyContent: 'space-around',
  },
  /* Styles applied to the root element if `justify="space-evenly"`. */
  'justify-space-evenly': {
    justifyContent: 'space-evenly',
  },
  ...generateGutter(theme),
});

const Stack = React.forwardRef((props, ref) => {
  const {
    alignContent = 'stretch',
    alignItems = 'stretch',
    classes,
    className: classNameProp,
    component: Component = 'div',
    container = false,
    direction = 'row',
    item = false,
    justify = 'flex-start',
    spacing = 0,
    wrap = 'wrap',
    zeroMinWidth = false,
    ...other
  } = props;

  const className = clsx(
    classes.root,
    {
      [classes.container]: container,
      [classes.item]: item,
      [classes.zeroMinWidth]: zeroMinWidth,
      [classes[`spacing-${String(spacing)}`]]: container && spacing !== 0,
      [classes[`direction-${String(direction)}`]]: direction !== 'row',
      [classes[`wrap-${String(wrap)}`]]: wrap !== 'wrap',
      [classes[`align-items-${String(alignItems)}`]]: alignItems !== 'stretch',
      [classes[`align-content-${String(alignContent)}`]]: alignContent !== 'stretch',
      [classes[`justify-${String(justify)}`]]: justify !== 'flex-start',
    },
    classNameProp,
  );

  return <Component className={className} ref={ref} {...other} />;
});

if (process.env.NODE_ENV !== 'production') {
  // can't use named function expression since the function body references `Stack`
  // which would point to the render function instead of the actual component
  Stack.displayName = 'ForwardRef(Stack)';
}

Stack.propTypes = {
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
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
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
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   */
  item: PropTypes.bool,
  /**
   * Defines the `justify-content` style property.
   * It is applied for all screen sizes.
   */
  justify: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   */
  spacing: PropTypes.oneOf(SPACINGS),
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   */
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   */
  zeroMinWidth: PropTypes.bool,
};

const StyledStack = withStyles(styles, { name: 'MuiStack' })(Stack);

if (process.env.NODE_ENV !== 'production') {
  const requireProp = requirePropFactory('Stack');
  StyledStack.propTypes = {
    ...StyledStack.propTypes,
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
    zeroMinWidth: requireProp('item'),
  };
}

export default StyledStack;
