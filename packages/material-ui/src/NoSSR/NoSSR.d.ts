import * as React from 'react';

export interface NoSSRProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

declare const NoSSR: React.ComponentType<NoSSRProps>;

export default NoSSR;
