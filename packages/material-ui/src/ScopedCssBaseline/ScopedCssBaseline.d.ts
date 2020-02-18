import * as React from 'react';

export interface ScopedCssBaselineProps {
  children?: React.ReactNode;
}

declare const ScopedCssBaseline: React.ComponentType<ScopedCssBaselineProps>;

export type ScopedCssBaselineClassKey = 'root';

export default ScopedCssBaseline;
