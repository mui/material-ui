import * as React from 'react';

declare const RtlProvider: React.FC<{ children: React.ReactNode }>;
export const useRtl: () => boolean;

export default RtlProvider;
