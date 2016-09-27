// @flow weak
import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import layoutStyles from './layout-styles';

export const styleSheet = createStyleSheet('Block', layoutStyles);

const BreakPointEnum = PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']);

/*
* Make sure that the `layout` property is included before including properties
*
* - padding
* - margin
* - fill
* - scroll
*/
const layoutExists = (props, propName, componentName) => {
  if (props[propName] && !props.layout) {
    return new Error(
      `\`layout\` property must be specified for \`${componentName}\` before using \`${propName}\` property`
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
      `\`flex\` property must be specified for \`${componentName}\` before using \`${propName}\` property`
    );
  }
  return null;
};
const FlexProps = {
  layout: PropTypes.oneOf(['row', 'column']),
  padding: PropTypes.oneOfType([layoutExists, PropTypes.bool]),
  margin: PropTypes.oneOfType([layoutExists, PropTypes.bool]),
  fill: PropTypes.oneOfType([layoutExists, PropTypes.bool]),
  scroll: PropTypes.oneOfType([layoutExists, PropTypes.bool, PropTypes.oneOf(['x', 'y'])]),
  flex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.oneOf(['grow', 'initial', 'none', 'noshrink', 'nogrow']),
  ]),
  order: PropTypes.oneOfType([flexExists, PropTypes.number]),
  offset: PropTypes.oneOfType([flexExists, PropTypes.number]),
  wrap: PropTypes.oneOfType([flexExists, PropTypes.bool, PropTypes.oneOf(['nowrap'])]),
};
const FlexPropsShape = PropTypes.shape(FlexProps);

function flexPropsMapper({
  scroll,
  layout,
  padding,
  margin,
  fill,
  flex,
  order = 0,
  offset,
  align = 'stretch',
  justify = 'start',
  wrap,
  ...otherProps,
}, classes) {
  let layoutClassNames = {};
  if (layout) {
    layoutClassNames = {
      [classes[`layout-${layout}`]]: true,
      [classes['layout-fill']]: fill,
      [classes['layout-padding']]: padding,
      [classes['layout-margin']]: margin,
      [classes[`justify-${justify}`]]: true,
      [classes[`align-${align}`]]: true,
      [classes['layout-scrollx']]: ((typeof scroll === 'boolean') && scroll) || scroll === 'x',
      [classes['layout-scrolly']]: ((typeof scroll === 'boolean') && scroll) || scroll === 'y',
    };
  }
  let flexClassNames = {};

  if (flex) {
    const flexVal = (typeof flex === 'boolean') ? '' : `-${flex}`;
    flexClassNames = {
      [classes['flex-wrap']]: wrap && wrap !== 'nowrap',
      [classes['flex-nowrap']]: wrap === 'nowrap',
      [classes[`flex-order${order}`]]: order,
      [classes[`flex-offset${offset}`]]: offset,
      [classes[`flex${flexVal}`]]: true,
    };
  }
  return {
    ...otherProps,
    layoutClassNames,
    flexClassNames,
  };
}

/*
* withLayout HOC can be used to wrap any component to make them a layout component.
*/
export default function withLayout(BaseComponent) {
  const factory = React.createFactory(BaseComponent);
  const wrapperComponent = (props, context) => {
    const {
      className: classNameProp,
      show,
      hide,
      xs,
      sm,
      md,
      lg,
      xl,
      ...others,
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
    let layoutProps = { ...others };
    if (matched && breakpointProps[matched]) layoutProps = { ...layoutProps, ...breakpointProps[matched] };
    const {
  layoutClassNames,
  flexClassNames,
      ...otherProps,
    } = flexPropsMapper(layoutProps, classes);
    const className = classNames(layoutClassNames, flexClassNames, classNameProp);
    return factory({ className, ...otherProps });
  };

  wrapperComponent.propTypes = {
    className: PropTypes.string,
    show: PropTypes.oneOfType([
      BreakPointEnum,
      PropTypes.arrayOf(BreakPointEnum),
    ]),
    hide: PropTypes.oneOfType([
      BreakPointEnum,
      PropTypes.arrayOf(BreakPointEnum),
    ]),
    xs: FlexPropsShape,
    sm: FlexPropsShape,
    md: FlexPropsShape,
    lg: FlexPropsShape,
    xl: FlexPropsShape,
    ...FlexProps,
  };
  wrapperComponent.contextTypes = {
    styleManager: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  return wrapperComponent;
}
