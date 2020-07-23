import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { parseColor } from './utils';

interface Props {
  children?: React.ReactNode;
  paletteType: 'dark' | 'light';
  primary: string;
  secondary: string;
  error: string;
  info: string;
  warning: string;
  success: string;
}

export function Theme(props: Props): JSX.Element {
  const {
    children,
    error,
    paletteType,
    primary,
    secondary,
    info,
    warning,
    success,
    ...other
  } = props;

  const theme = createMuiTheme({
    palette: {
      type: paletteType,
      primary: { main: parseColor(primary) },
      secondary: { main: parseColor(secondary) },
      error: { main: parseColor(error) },
      info: { main: parseColor(info) },
      warning: { main: parseColor(warning) },
      success: { main: parseColor(success) },
    },
  });

  return (
    <MuiThemeProvider theme={theme} {...other}>
      {children}
    </MuiThemeProvider>
  );
}

Theme.defaultProps = {
  paletteType: 'light' as const,
  primary: '#3f51b5',
  secondary: '#f50057',
  error: '#f44336',
  info: '#2196f3',
  warning: '#ff9800',
  success: '#4caf4f',
};

addPropertyControls(Theme, {
  paletteType: {
    type: ControlType.Enum,
    title: 'Palette type',
    options: ['dark', 'light'],
  },
  primary: {
    type: ControlType.Color,
    title: 'Primary',
  },
  secondary: {
    type: ControlType.Color,
    title: 'Secondary',
  },
  error: {
    type: ControlType.Color,
    title: 'Error',
  },
  info: {
    type: ControlType.Color,
    title: 'Info',
  },
  warning: {
    type: ControlType.Color,
    title: 'Warning',
  },
  success: {
    type: ControlType.Color,
    title: 'Success',
  },
});
