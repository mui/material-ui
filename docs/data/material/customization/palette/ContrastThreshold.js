import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';

const defaultContrastThresholdTheme = createTheme({});

const highContrastThresholdTheme = createTheme({
  palette: {
    contrastThreshold: 4.5,
  },
});

function ContrastShowcase(props) {
  const { title } = props;
  const theme = useTheme();

  return (
    <Stack sx={{ gap: 1, alignItems: 'center' }}>
      <span>
        <b>{title}</b>
      </span>
      <span>{theme.palette.contrastThreshold}:1</span>
      <Stack direction="row" sx={{ gap: 1 }}>
        <Button variant="contained" color="warning">
          Warning
        </Button>
      </Stack>
    </Stack>
  );
}

ContrastShowcase.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function ContrastThreshold() {
  return (
    <Stack direction="row" sx={{ gap: 4 }}>
      <ThemeProvider theme={defaultContrastThresholdTheme}>
        <ContrastShowcase title="Default contrast threshold" />
      </ThemeProvider>
      <ThemeProvider theme={highContrastThresholdTheme}>
        <ContrastShowcase title="Higher contrast threshold" />
      </ThemeProvider>
    </Stack>
  );
}
