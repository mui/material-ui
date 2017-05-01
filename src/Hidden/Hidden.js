// @flow
/**
 * Responsively hides children based on the selected implementation.
 */
import React, { Element } from 'react';
import HiddenJs from './Hidden';

export type DefaultProps = {
  component: string | Function,
}

export type Props = {
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

function Hidden(props: Props & { implementation?: 'js' | 'css' }) {
  const {
    implementation,
    ...other
  } = props;

  if (implementation === 'js') {
    return <HiddenJs {...other} />;
  }

  throw new Error('<HiddenJs implementation="css" /> is not yet implemented');
}

Hidden.defaultProps = {
  implementation: 'js',
};

export default Hidden;
