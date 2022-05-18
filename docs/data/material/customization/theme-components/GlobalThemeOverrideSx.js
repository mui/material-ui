import * as React from 'react';
import {
  ThemeProvider,
  createTheme,
  experimental_sx as sx,
} from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Check from '@mui/icons-material/Check';

const finalTheme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: sx({
          // https://mui.com/system/the-sx-prop/#spacing
          px: 1,
          py: 0.25,
          // https://mui.com/system/borders/#border-radius
          borderRadius: 1, // 4px as default.
        }),
        label: {
          padding: 'initial',
        },
        icon: sx({
          mr: 0.5,
          ml: '-2px',
        }),
      },
    },
  },
});

export default function GlobalThemeOverride() {
  return (
    <ThemeProvider theme={finalTheme}>
      <Chip
        color="success"
        label={
          <span>
            <b>Status:</b> Completed
          </span>
        }
        icon={<Check fontSize="small" />}
      />
    </ThemeProvider>
  );
}
