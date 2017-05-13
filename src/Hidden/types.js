// @flow

import { Element } from 'react';
import type { Breakpoint } from '../styles/breakpoints';

export type HiddenProps = {
  /**
   * The content of the component.
   */
  children?: Element<*>,
  /**
   * The CSS class name of the root element.
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
