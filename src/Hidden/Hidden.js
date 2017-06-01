// @flow

import React, { Element } from 'react';
import HiddenJs from './HiddenJs';
import type { Breakpoint } from '../styles/breakpoints';

type Props = {
  /**
   * The content of the component.
   */
  children?: Element<*>,
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
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for server
   * side rendering.
   */
  implementation?: 'js' | 'css',
};

/**
 * Responsively hides children based on the selected implementation.
 */
function Hidden(props: Props) {
  const { implementation, ...other } = props;

  if (implementation === 'js') {
    return <HiddenJs {...other} />;
  }

  throw new Error('<Hidden implementation="css" /> is not yet implemented');
}

Hidden.defaultProps = {
  implementation: 'js',
  xsUp: false,
  smUp: false,
  mdUp: false,
  lgUp: false,
  xlUp: false,
  xsDown: false,
  smDown: false,
  mdDown: false,
  lgDown: false,
  xlDown: false,
};

export default Hidden;
