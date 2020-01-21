import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

interface Props {
  paletteType?: 'dark' | 'light';
  primary?: string;
  secondary?: string;
  error?: string;
}

const defaultProps: Props = {
  paletteType: 'light',
  primary: '#3f51b5',
  secondary: '#f50057',
  error: '#f44336',
};

export const Theme: React.SFC<Props> = (props: Props) => {
  const { children, error, paletteType, primary, secondary, ...other } = props;

  const theme = createMuiTheme({
    palette: {
      type: paletteType,
      primary: { main: primary },
      secondary: { main: secondary },
      error: { main: error },
    },
  });

  return (
    <MuiThemeProvider theme={theme} {...other}>
      {children}
    </MuiThemeProvider>
  );
};

Theme.defaultProps = defaultProps;

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
});
