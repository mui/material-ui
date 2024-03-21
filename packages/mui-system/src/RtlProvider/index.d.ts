import * as React from 'react';

interface RtlProviderProps {
  children?: React.ReactNode;
  value?: boolean;
}

declare const RtlProvider: React.FC<RtlProviderProps>;
export const useRtl: () => boolean;

export default RtlProvider;
