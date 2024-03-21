'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import exactProp from '@mui/utils/exactProp';
import withWidth, { isWidthDown, isWidthUp } from './withWidth';
import useTheme from '../styles/useTheme';

/**
 * @ignore - internal component.
 */
function HiddenJs(props) {
  const { children, only, width } = props;
  const theme = useTheme();

  let visible = true;

  // `only` check is faster to get out sooner if used.
  if (only) {
    if (Array.isArray(only)) {
      for (let i = 0; i < only.length; i += 1) {
        const breakpoint = only[i];
        if (width === breakpoint) {
          visible = false;
          break;
        }
      }
    } else if (only && width === only) {
      visible = false;
    }
  }

  // Allow `only` to be combined with other props. If already hidden, no need to check others.
  if (visible) {
    // determine visibility based on the smallest size up
    for (let i = 0; i < theme.breakpoints.keys.length; i += 1) {
      const breakpoint = theme.breakpoints.keys[i];
      const breakpointUp = props[`${breakpoint}Up`];
      const breakpointDown = props[`${breakpoint}Down`];
      if (
        (breakpointUp && isWidthUp(breakpoint, width)) ||
        (breakpointDown && isWidthDown(breakpoint, width))
      ) {
        visible = false;
        break;
      }
    }
  }

  if (!visible) {
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

HiddenJs.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * If `true`, screens this size and down are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  lgDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  lgUp: PropTypes.bool,
  /**
   * If `true`, screens this size and down are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  mdDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  mdUp: PropTypes.bool,
  /**
   * Hide the given breakpoint(s).
   */
  only: PropTypes.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    PropTypes.arrayOf(PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])),
  ]),
  /**
   * If `true`, screens this size and down are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  smDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  smUp: PropTypes.bool,
  /**
   * @ignore
   * width prop provided by withWidth decorator.
   */
  width: PropTypes.string.isRequired,
  /**
   * If `true`, screens this size and down are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  xlDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  xlUp: PropTypes.bool,
  /**
   * If `true`, screens this size and down are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  xsDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  xsUp: PropTypes.bool,
};

if (process.env.NODE_ENV !== 'production') {
  HiddenJs.propTypes = exactProp(HiddenJs.propTypes);
}

export default withWidth()(HiddenJs);
