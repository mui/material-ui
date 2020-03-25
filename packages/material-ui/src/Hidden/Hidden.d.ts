import * as React from 'react';
import { Breakpoint } from '../styles/createBreakpoints';

export interface HiddenProps {
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for
   * server-side rendering.
   */
  implementation?: 'js' | 'css';
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
  initialWidth?: Breakpoint;
  /**
   * If `true`, screens this size and down will be hidden.
   */
  lgDown?: boolean;
  /**
   * If `true`, screens this size and up will be hidden.
   */
  lgUp?: boolean;
  /**
   * If `true`, screens this size and down will be hidden.
   */
  mdDown?: boolean;
  /**
   * If `true`, screens this size and up will be hidden.
   */
  mdUp?: boolean;
  /**
   * Hide the given breakpoint(s).
   */
  only?: Breakpoint | Breakpoint[];
  /**
   * If `true`, screens this size and down will be hidden.
   */
  smDown?: boolean;
  /**
   * If `true`, screens this size and up will be hidden.
   */
  smUp?: boolean;
  /**
   * If `true`, screens this size and down will be hidden.
   */
  xlDown?: boolean;
  /**
   * If `true`, screens this size and up will be hidden.
   */
  xlUp?: boolean;
  /**
   * If `true`, screens this size and down will be hidden.
   */
  xsDown?: boolean;
  /**
   * If `true`, screens this size and up will be hidden.
   */
  xsUp?: boolean;
}

/**
 * Responsively hides children based on the selected implementation.
 * Demos:
 *
 * - [Hidden](https://material-ui.com/components/hidden/)
 *
 * API:
 *
 * - [Hidden API](https://material-ui.com/api/hidden/)
 */
declare const Hidden: React.ComponentType<HiddenProps>;

export default Hidden;
