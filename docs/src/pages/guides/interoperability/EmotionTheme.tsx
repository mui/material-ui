/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Slider from '@material-ui/lab/SliderStyled';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  darken,
} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#20b2aa',
    },
  },
});

export default function EmotionTheme() {
  return (
    <MuiThemeProvider theme={customTheme}>
      <Box width={300}>
        <Slider
          defaultValue={30}
          css={(theme) => css`
            color: ${theme.palette.primary.main};
            :hover {
              color: ${darken(theme.palette.primary.main, 0.2)};
            }
          `}
        />
      </Box>
    </MuiThemeProvider>
  );
}
