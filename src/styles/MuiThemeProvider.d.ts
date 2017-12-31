import * as React from 'react';
import { Theme } from './createMuiTheme';

export interface MuiThemeProviderProps {
  theme: Theme | ((outer: Theme | null) => Theme);
  sheetsManager?: Map<any, any>;
  children: React.ReactNode;
}

declare const MuiThemeProvider: React.ComponentType<MuiThemeProviderProps>;

export default MuiThemeProvider;
