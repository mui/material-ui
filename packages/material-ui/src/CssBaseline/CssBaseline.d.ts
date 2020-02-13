import * as React from 'react';

export interface CssBaselineProps {
  children?: React.ReactElement;
}

declare const CssBaseline: React.ComponentType<CssBaselineProps>;

export type CssBaselineClassKey = '@global';

export default CssBaseline;
