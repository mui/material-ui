// @flow
import React, { Element } from 'react';
import HiddenJs from './HiddenJs';
import type { HiddenProps } from './types';

type Props = HiddenProps & {
  /**
   * If string or Function, component is used as the root node and all other props are passed
   * including children.
   * If an Element, it will be rendered as-is and no other props are propagated.
   */
  component?: string | Function | Element<*>,
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
    component: componentProp,
    implementation,
    ...other
  } = props;

  // workaround: see https://github.com/facebook/flow/issues/1660#issuecomment-297775427
  const component = componentProp || Hidden.defaultProps.component;

  if (implementation === 'js') {
    return <HiddenJs {...other} component={component} />;
  }

  throw new Error('<Hidden implementation="css" /> is not yet implemented');
}

Hidden.defaultProps = {
  component: 'div',
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
