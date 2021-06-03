import * as React from 'react';
import {
  createTheme,
  styled,
  ThemeProvider,
  darken,
} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#20b2aa',
    },
  },
});

const CustomizedSlider = styled(Slider)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};

  :hover {
    color: ${darken(theme.palette.primary.main, 0.2)};
  }
`,
);

export default function StyledComponentsTheme() {
  return (
    <Box sx={{ width: 300 }}>
      <ThemeProvider theme={customTheme}>
        <CustomizedSlider defaultValue={30} />
      </ThemeProvider>
    </Box>
  );
}
