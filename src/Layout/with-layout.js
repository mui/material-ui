// @flow weak
import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import { mapKeys, flow, camelCase } from 'lodash/fp';
import layoutStyles from './layout-styles';

export const styleSheet = createStyleSheet('Block', layoutStyles);

const BreakPointEnum = PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']);

/*
* Make sure that the `layout` property is included before including properties
*
* - padding
* - margin
* - fill
* - align
* - scroll
*/
const layoutExists = (props, propName, componentName) => {
  if (props[propName] && !props.layout) {
    return new Error(
      `\`layout\` property must be specified for \`${componentName}\` before using \`${propName}\` property`,
    );
  }
  return null;
};
/*
* Make sure that the `flex` property is included before including properties
*
* - order
* - offset
* - wrap
*/
const flexExists = (props, propName, componentName) => {
  if (props[propName] && !props.flex) {
    return Error(
      `\`flex\` property must be specified for \`${componentName}\` before using \`${propName}\` property`,
    );
  }
  return null;
};
const FlexProps = {
  layout: PropTypes.oneOf(['row', 'column']),
  padding: PropTypes.oneOfType([
    layoutExists,
    PropTypes.bool,
  ]),
  margin: PropTypes.oneOfType([
    layoutExists,
    PropTypes.bool,
  ]),
  fill: PropTypes.oneOfType([
    layoutExists,
    PropTypes.bool,
  ]),
  align: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'stretch',
  ]),
  justify: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'space-between',
    'space-around',
  ]),
  scroll: PropTypes.oneOfType([
    layoutExists,
    PropTypes.bool,
    PropTypes.oneOf(['x', 'y']),
  ]),
  flex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.oneOf(['grow', 'initial', 'none', 'noshrink', 'nogrow']),
  ]),
  order: PropTypes.oneOfType([
    flexExists,
    PropTypes.number,
  ]),
  offset: PropTypes.oneOfType([
    flexExists,
    PropTypes.number,
  ]),
  wrap: PropTypes.oneOfType([
    flexExists,
    PropTypes.bool,
    PropTypes.oneOf(['nowrap']),
  ]),
};
const FlexPropsShape = PropTypes.shape(FlexProps);

const breakpointShape = {
  lg: FlexPropsShape,
  md: FlexPropsShape,
  sm: FlexPropsShape,
  xl: FlexPropsShape,
  xs: FlexPropsShape,
};


function propsMapper({
  scroll,
  layout,
  padding = false,
  margin = false,
  fill = false,
  flex,
  order = 0,
  offset = 0,
  align = 'stretch', // Cross Axis
  justify = 'start', // Main Axis
  wrap,
  ...otherProps
}, classes) {
  const getClassName = flow(
    camelCase,
    (k) => classes[k],
  );
  const applyClasses = mapKeys(getClassName);
  let layoutClassNames = {};
  if (layout) {
    layoutClassNames = applyClasses({
      [`layout-${layout}`]: true,
      layoutFill: fill,
      layoutPadding: padding,
      layoutMargin: margin,
      [`justify-${justify}`]: true,
      [`align-${align}`]: true,
      layoutScrollX: ((typeof scroll === 'boolean') && scroll) || scroll === 'x',
      layoutScrollY: ((typeof scroll === 'boolean') && scroll) || scroll === 'y',
    });
  }

  let flexClassNames = {};
  if (flex) {
    const flexClassName = (typeof flex === 'boolean') ? 'flex' : `flex-${flex}`;
    flexClassNames = applyClasses({
      [flexClassName]: true,
      flexWrap: wrap && wrap !== 'nowrap',
      flexNowrap: wrap === 'nowrap',
      [`flexOrder${order}`]: !!order,
      [`flexOffset${order}`]: !!order,
    });
  }
  return { ...otherProps, layoutClassNames, flexClassNames };
}

/*
 * withLayout HOC can be used to wrap any component to make them a layout component.
 */
export default function withLayout(BaseComponent) {
  const factory = React.createFactory(BaseComponent);
  const layoutWrapper = (props, context) => {
    const {
      className: classNameProp,
      show,
      hide,
      xs,
      sm,
      md,
      lg,
      xl,
      ...other
  } = props;
    const { styleManager, theme: { breakpoints: { isMatch, priority } } } = context;
    const matched = priority.find(isMatch);
    if (hide) {
      if (typeof hide === 'string' && hide === matched) return null;
      if (Array.isArray(hide) && hide.includes(matched)) return null;
    }
    if (show) {
      if (typeof show === 'string' && show !== matched) return null;
      if (Array.isArray(show) && !show.includes(matched)) return null;
    }
    const classes = styleManager.render(styleSheet);
    const breakpointProps = { xs, sm, md, lg, xl };

    let layoutProps = { ...other };
    if (matched && breakpointProps[matched]) layoutProps = { ...layoutProps, ...breakpointProps[matched] };

    const { layoutClassNames, flexClassNames, ...otherProps } = propsMapper(layoutProps, classes);

    const className = classNames(layoutClassNames, flexClassNames, classNameProp);
    return factory({ className, ...otherProps });
  };

  layoutWrapper.propTypes = {
    className: PropTypes.string,
    hide: PropTypes.oneOfType([ BreakPointEnum, PropTypes.arrayOf(BreakPointEnum) ]),
    show: PropTypes.oneOfType([BreakPointEnum, PropTypes.arrayOf(BreakPointEnum)]),
    ...breakpointShape,
    ...FlexProps,
  };
  layoutWrapper.contextTypes = {
    styleManager: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  return layoutWrapper;
}
