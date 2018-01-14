import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { keys as breakpointKeys } from '../styles/createBreakpoints';
import { capitalizeFirstLetter } from '../utils/helpers';
import withStyles from '../styles/withStyles';

const styles = theme => {
  const hidden = {
    display: 'none',
  };

  return breakpointKeys.reduce((acc, key) => {
    acc[`only${capitalizeFirstLetter(key)}`] = {
      [theme.breakpoints.only(key)]: hidden,
    };
    acc[`${key}Up`] = {
      [theme.breakpoints.up(key)]: hidden,
    };
    acc[`${key}Down`] = {
      [theme.breakpoints.down(key)]: hidden,
    };

    return acc;
  }, {});
};

/**
 * @ignore - internal component.
 */
function HiddenCss(props: Props) {
  const {
    children,
    classes,
    lgDown,
    lgUp,
    mdDown,
    mdUp,
    only,
    smDown,
    smUp,
    xlDown,
    xlUp,
    xsDown,
    xsUp,
    ...other
  } = props;

  warning(
    Object.keys(other).length === 0 ||
      (Object.keys(other).length === 1 && other.hasOwnProperty('ref')),
    `Material-UI: unsupported properties received ${Object.keys(other).join(
      ', ',
    )} by \`<Hidden />\`.`,
  );

  const className = [];

  for (let i = 0; i < breakpointKeys.length; i += 1) {
    const breakpoint = breakpointKeys[i];
    const breakpointUp = props[`${breakpoint}Up`];
    const breakpointDown = props[`${breakpoint}Down`];

    if (breakpointUp) {
      className.push(classes[`${breakpoint}Up`]);
    }
    if (breakpointDown) {
      className.push(classes[`${breakpoint}Down`]);
    }
  }

  if (only) {
    const onlyBreakpoints = Array.isArray(only) ? only : [only];
    onlyBreakpoints.forEach(breakpoint => {
      className.push(classes[`only${capitalizeFirstLetter(breakpoint)}`]);
    });
  }

  return <div className={className}>{children}</div>;
}

HiddenCss.propTypes = {
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
   * Specify which implementation to use.  'js' is the default, 'css' works better for server
   * side rendering.
   */
  implementation: PropTypes.oneOf(['js', 'css']),
  /**
   * If true, screens this size and down will be hidden.
   */
  lgDown: PropTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  lgUp: PropTypes.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  mdDown: PropTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  mdUp: PropTypes.bool,
  /**
   * Hide the given breakpoint(s).
   */
  only: PropTypes.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    PropTypes.arrayOf(PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])),
  ]),
  /**
   * If true, screens this size and down will be hidden.
   */
  smDown: PropTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  smUp: PropTypes.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  xlDown: PropTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  xlUp: PropTypes.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  xsDown: PropTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  xsUp: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiHiddenCss' })(HiddenCss);
