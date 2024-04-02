'use client';
/**
 * This package has it's own version of RtlProvider to avoid including
 * @mui/system in the bundle if someone is not using it.
 */
import * as React from 'react';

type RtlContextType = boolean | undefined;

type RtlProviderProps = {
  value?: RtlContextType;
};

const RtlContext = React.createContext<RtlContextType>(false);

function RtlProvider({ value, ...props }: RtlProviderProps) {
  return <RtlContext.Provider value={value ?? true} {...props} />;
}

export const useRtl = () => {
  const value = React.useContext(RtlContext);
  return value ?? false;
};

export default RtlProvider;
