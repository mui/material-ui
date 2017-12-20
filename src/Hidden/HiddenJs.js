import PropTypes from 'prop-types';
import warning from 'warning';
import { keys as breakpointKeys } from '../styles/createBreakpoints';
import withWidth, { isWidthDown, isWidthUp } from '../utils/withWidth';

/**
 * @ignore - internal component.
 */
function HiddenJs(props) {
  const {
    children,
    lgDown,
    lgUp,
    mdDown,
    mdUp,
    only,
    smDown,
    smUp,
    width,
    xlDown,
    xlUp,
    xsDown,
    xsUp,
    ...other
  } = props;

  warning(
    Object.keys(other).length === 0,
    `Material-UI: unsupported properties received ${JSON.stringify(other)} by \`<Hidden />\`.`,
  );

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
    for (let i = 0; i < breakpointKeys.length; i += 1) {
      const breakpoint = breakpointKeys[i];
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

  return children;
}

HiddenJs.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
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
   * You can use this property when choosing the `js` implementation with server side rendering.
   *
   * As `window.innerWidth` is unavailable on the server,
   * we default to rendering an empty componenent during the first mount.
   * In some situation you might want to use an heristic to approximate
   * the screen width of the client browser screen width.
   *
   * For instance, you could be using the user-agent or the client-hints.
   * http://caniuse.com/#search=client%20hint
   */
  initialWidth: PropTypes.number,
  /**
   * If true, screens before this size and down will be hidden.
   */
  lgDown: PropTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  lgUp: PropTypes.bool,
  /**
   * If true, screens before this size and down will be hidden.
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
   * If true, screens before this size and down will be hidden.
   */
  smDown: PropTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  smUp: PropTypes.bool,
  /**
   * @ignore
   * width prop provided by withWidth decorator.
   */
  width: PropTypes.string.isRequired,
  /**
   * If true, screens before this size and down will be hidden.
   */
  xlDown: PropTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  xlUp: PropTypes.bool,
  /**
   * If true, screens before this size and down will be hidden.
   */
  xsDown: PropTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  xsUp: PropTypes.bool,
};

export default withWidth()(HiddenJs);
