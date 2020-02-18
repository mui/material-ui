import * as React from 'react';

export interface CssBaselineProps {
  children?: React.ReactNode;
}

declare const CssBaseline: React.ComponentType<CssBaselineProps>;

export type CssBaselineClassKey = '@global';

export default CssBaseline;
