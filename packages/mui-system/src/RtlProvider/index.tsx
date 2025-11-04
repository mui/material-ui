'use client';
import * as React from 'react';
import PropTypes from 'prop-types';

const RtlContext = React.createContext<boolean | undefined>(undefined);

function RtlProvider({ value, ...props }: any) {
  return <RtlContext.Provider value={value ?? true} {...props} />;
}

RtlProvider.propTypes = {
  children: PropTypes.node,
  value: PropTypes.bool,
};

export const useRtl = (): boolean => {
  const value = React.useContext(RtlContext);
  return value ?? false;
};

export default RtlProvider;
