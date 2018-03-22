import { StyleSheet } from 'jss';
import * as React from 'react';
import { Theme } from './createMuiTheme';
import { StyleRules, StylesCreator } from './withStyles';

interface SheetManagerTheme {
  refs: number;
  sheet: StyleSheet<string>;
}

export interface MuiThemeProviderProps {
  theme: Theme | ((outer: Theme | null) => Theme);
  sheetsManager?: Map<StylesCreator, Map<Theme, SheetManagerTheme>>;
  disableStylesGeneration?: boolean;
  children: React.ReactNode;
}

declare const MuiThemeProvider: React.ComponentType<MuiThemeProviderProps>;

export default MuiThemeProvider;
