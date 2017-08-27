import * as React from 'react';
import { Theme } from './theme';

export interface MuiThemeProviderProps {
  theme?: Theme<any>;
  sheetsManager?: Object;
  children: React.ReactNode;
}

export default class MuiThemeProvider extends React.Component<
  MuiThemeProviderProps
> {}
