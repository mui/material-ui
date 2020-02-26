import * as React from 'react';
import PropTypes from 'prop-types';
import HiddenJs from './HiddenJs';
import HiddenCss from './HiddenCss';

/**
 * Responsively hides children based on the selected implementation.
 */
function Hidden(props) {
  const {
    implementation = 'js',
    lgDown = false,
    lgUp = false,
    mdDown = false,
    mdUp = false,
    smDown = false,
    smUp = false,
    xlDown = false,
    xlUp = false,
    xsDown = false,
    xsUp = false,
    ...other
  } = props;

  if (implementation === 'js') {
    return (
      <HiddenJs
        lgDown={lgDown}
        lgUp={lgUp}
        mdDown={mdDown}
        mdUp={mdUp}
        smDown={smDown}
        smUp={smUp}
        xlDown={xlDown}
        xlUp={xlUp}
        xsDown={xsDown}
        xsUp={xsUp}
        {...other}
      />
    );
  }

  return (
    <HiddenCss
      lgDown={lgDown}
      lgUp={lgUp}
      mdDown={mdDown}
      mdUp={mdUp}
      smDown={smDown}
      smUp={smUp}
      xlDown={xlDown}
      xlUp={xlUp}
      xsDown={xsDown}
      xsUp={xsUp}
      {...other}
    />
  );
}

Hidden.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for
   * server-side rendering.
   */
  implementation: PropTypes.oneOf(['js', 'css']),
  /**
   * You can use this prop when choosing the `js` implementation with server-side rendering.
   *
   * As `window.innerWidth` is unavailable on the server,
   * we default to rendering an empty component during the first mount.
   * You might want to use an heuristic to approximate
   * the screen width of the client browser screen width.
   *
   * For instance, you could be using the user-agent or the client-hints.
   * https://caniuse.com/#search=client%20hint
   */
  initialWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /**
   * If `true`, screens this size and down will be hidden.
   */
  lgDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up will be hidden.
   */
  lgUp: PropTypes.bool,
  /**
   * If `true`, screens this size and down will be hidden.
   */
  mdDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up will be hidden.
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
   * If `true`, screens this size and down will be hidden.
   */
  smDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up will be hidden.
   */
  smUp: PropTypes.bool,
  /**
   * If `true`, screens this size and down will be hidden.
   */
  xlDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up will be hidden.
   */
  xlUp: PropTypes.bool,
  /**
   * If `true`, screens this size and down will be hidden.
   */
  xsDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up will be hidden.
   */
  xsUp: PropTypes.bool,
};

export default Hidden;
