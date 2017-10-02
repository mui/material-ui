// @flow

import type { Breakpoint } from '../styles/createBreakpoints';

// IMPORTANT: this must be identical to Hidden.js Props.
// This is here because docgen can't yet import type definitions across files.
export type HiddenProps = {
  /**
   * @ignore
   */
  className?: string,
  /**
   * Hide the given breakpoint(s).
   */
  only?: Breakpoint | Array<Breakpoint>,
  /**
   * If true, screens this size and up will be hidden.
   */
  xsUp?: boolean,
  /**
   * If true, screens this size and up will be hidden.
   */
  smUp?: boolean,
  /**
   * If true, screens this size and up will be hidden.
   */
  mdUp?: boolean,
  /**
   * If true, screens this size and up will be hidden.
   */
  lgUp?: boolean,
  /**
   * If true, screens this size and up will be hidden.
   */
  xlUp?: boolean,
  /**
   * If true, screens this size and down will be hidden.
   */
  xsDown?: boolean,
  /**
   * If true, screens this size and down will be hidden.
   */
  smDown?: boolean,
  /**
   * If true, screens this size and down will be hidden.
   */
  mdDown?: boolean,
  /**
   * If true, screens this size and down will be hidden.
   */
  lgDown?: boolean,
  /**
   * If true, screens this size and down will be hidden.
   */
  xlDown?: boolean,
};
