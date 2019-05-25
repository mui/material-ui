import React from 'react';
import * as PropTypes from 'prop-types';

const Context = React.createContext();

/**
 * @ignore - internal component.
 */
export function RenderContext({ children }) {
  return <Context.Provider value="render">{children}</Context.Provider>;
}
RenderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useIsSsr() {
  return React.useContext(Context) === 'render';
}
