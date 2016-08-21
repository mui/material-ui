// @flow weak
import { createThemeProvider } from 'jss-theme-reactor/ThemeProvider';
import { create } from '@nmarks/jss';
import jssPreset from 'jss-preset-default';
import { createMuiTheme } from './theme';

export default createThemeProvider(createMuiTheme, () => create(jssPreset()));
