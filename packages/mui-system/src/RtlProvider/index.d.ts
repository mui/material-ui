import * as React from 'react';

declare const RtlProvider: React.FC<{ children?: React.ReactNode; value?: boolean }>;
export const useRtl: () => boolean;

export default RtlProvider;
