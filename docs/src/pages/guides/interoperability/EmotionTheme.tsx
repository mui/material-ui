/** @jsx jsx */
import { jsx, css, ThemeProvider } from '@emotion/react';
import Button from '@material-ui/core/Button';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  darken,
  Theme as MuiTheme,
} from '@material-ui/core/styles';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#6772e5',
    },
  },
});

export default function EmotionTheme() {
  return (
    <MuiThemeProvider theme={customTheme}>
      <ThemeProvider theme={customTheme}>
        <Button>Default</Button>
        <Button
          css={(theme) => css`
            background-color: ${theme.palette.primary.main};
            color: #fff;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            padding: 4px 10px;
            font-size: 13px;
            &:hover {
              background-color: ${darken(theme.palette.primary.main, 0.2)};
            }
            ${theme.breakpoints.up('sm')} {
              font-size: 14px;
              padding: 7px 14px;
            }
          `}
        >
          Customized
        </Button>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}
