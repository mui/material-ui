import * as React from 'react';

export type VersionsContextValue = Array<{ version: string; url: string }>;

const VersionsContext = React.createContext<VersionsContextValue>(null!);

if (process.env.NODE_ENV !== 'production') {
  VersionsContext.displayName = 'VersionsContext';
}

export default VersionsContext;
