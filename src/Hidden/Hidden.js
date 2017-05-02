// @flow
import React, { Element } from 'react';
import HiddenJs from './Hidden';
import type { Breakpoints } from '../styles/breakpoints';

export type DefaultProps = {
  component: string | Function,
}

export type HiddenProps = {
  /**
   * The content of the component.
   */
  children?: Element<any>,
  /**
   * The CSS class name of the root element.
   */
  className?: string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: string | Function,
  /**
   * Hide the given breakpoint.
   */
  only?: Breakpoints,
  /**
   * If true, screens this size and up will be hidden.
   * If false, screens this size and up will not be hidden.
   */
  xsUp?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and up will be hidden.
   * If false, screens this size and up will not be hidden.
   */
  smUp?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and up will be hidden.
   * If false, screens this size and up will not be hidden.
   */
  mdUp?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and up will be hidden.
   * If false, screens this size and up will not be hidden.
   */
  lgUp?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and up will be hidden.
   * If false, screens this size and up will not be hidden.
   */
  xlUp?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and down will be hidden.
   * If false, screens this size and down will not be hidden.
   */
  xsDown?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and down will be hidden.
   * If false, screens this size and down will not be hidden.
   */
  smDown?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and down will be hidden.
   * If false, screens this size and down will not be hidden.
   */
  mdDown?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and down will be hidden.
   * If false, screens this size and down will not be hidden.
   */
  lgDown?: boolean, // eslint-disable-line react/sort-prop-types
  /**
   * If true, screens this size and down will be hidden.
   * If false, screens this size and down will not be hidden.
   */
  xlDown?: boolean, // eslint-disable-line react/sort-prop-types
};

export const defaultProps: DefaultProps = {
  component: 'div',
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

type Props = HiddenProps & {
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for server
   * side rendering.
   */
  implementation?: 'js' | 'css'
}

/**
 * Responsively hides children based on the selected implementation.
 */
function Hidden(props: Props) {
  const {
    implementation,
    ...other
  } = props;

  if (implementation === 'js') {
    return <HiddenJs {...other} />;
  }

  throw new Error('<Hidden implementation="css" /> is not yet implemented');
}

Hidden.defaultProps = {
  implementation: 'js',
};

export default Hidden;
