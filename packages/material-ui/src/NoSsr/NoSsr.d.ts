import * as React from 'react';

export interface NoSsrProps {
  children: React.ReactNode;
  defer?: boolean;
  fallback?: React.ReactNode;
}

declare const NoSsr: React.ComponentType<NoSsrProps>;

export default NoSsr;
