import * as React from 'react';

const RtlContext = React.createContext();

const RtlProvider = ({ value, ...props }) => {
  return <RtlContext.Provider value={value ?? true} {...props} />;
};

export const useRtl = () => {
  const value = React.useContext(RtlContext);
  return value ?? false;
};

export default RtlProvider;
