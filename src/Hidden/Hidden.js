// @flow

import React from 'react';
import HiddenJs from './HiddenJs';
import type { HiddenProps } from './types';

type Props = HiddenProps & {
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for server
   * side rendering.
   */
  implementation?: 'js' | 'css'
};

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
