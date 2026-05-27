'use client';
import * as React from 'react';
import PropTypes from 'prop-types';

interface RtlProviderProps {
  children?: React.ReactNode;
  value?: boolean | undefined;
}

const RtlContext = React.createContext<boolean | undefined>(undefined);

const RtlProvider: React.FC<RtlProviderProps> = ({ value, ...props }) => {
  return <RtlContext.Provider value={value ?? true} {...props} />;
};

(RtlProvider as any).propTypes /* remove-proptypes */ = {
  children: PropTypes.node,
  value: PropTypes.bool,
};

export const useRtl = (): boolean => {
  const value = React.useContext(RtlContext);
  return value ?? false;
};

export default RtlProvider;
