import * as React from 'react';

export interface NoSsrProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

declare const NoSsr: React.ComponentType<NoSsrProps>;

export default NoSsr;
