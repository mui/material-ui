import * as React from 'react';
import PropTypes from 'prop-types';

const RtlContext = React.createContext();

function RtlProvider({ value, ...props }) {
  return <RtlContext.Provider value={value ?? true} {...props} />;
}

RtlProvider.propTypes = {
  value: PropTypes.bool,
  children: PropTypes.node,
};

export const useRtl = () => {
  const value = React.useContext(RtlContext);
  return value ?? false;
};

export default RtlProvider;
