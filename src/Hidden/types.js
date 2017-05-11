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
  xsUp?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and up will be hidden.
   */
  smUp?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and up will be hidden.
   */
  mdUp?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and up will be hidden.
   */
  lgUp?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and up will be hidden.
   */
  xlUp?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and down will be hidden.
   */
  xsDown?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and down will be hidden.
   */
  smDown?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and down will be hidden.
   */
  mdDown?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and down will be hidden.
   */
  lgDown?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and down will be hidden.
   */
  xlDown?: boolean, // eslint-disable-line react/sort-prop-types
};
