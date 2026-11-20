import type * as React from 'react';
import PropTypes from 'prop-types';

export interface StyledEngineProviderProps {
  children?: React.ReactNode;
}

export default function StyledEngineProvider(props: StyledEngineProviderProps): React.JSX.Element {
  return props.children as React.JSX.Element;
}

(StyledEngineProvider as any).propTypes /* remove-proptypes */ = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
};
