import * as React from 'react';
import { Theme } from './createMuiTheme';

export interface MuiThemeProviderProps {
  theme?: Theme<any>;
  sheetsManager?: Object;
  children: React.ReactNode;
}

declare const MuiThemeProvider: React.ComponentType<MuiThemeProviderProps>

export default MuiThemeProvider
