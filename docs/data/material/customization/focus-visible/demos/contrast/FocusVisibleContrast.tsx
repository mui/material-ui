import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  focusVisible: true,
  colorSchemes: { light: true, dark: true },
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: (theme.vars || theme).palette.primary.main,
            color: (theme.vars || theme).palette.primary.contrastText,
          },
        }),
      },
    },
  },
});

function Menu({ label, contrast }: { label: string; contrast?: boolean }) {
  return (
    <div>
      <Typography variant="subtitle2" gutterBottom>
        {label}
      </Typography>
      <Paper sx={{ width: 200 }}>
        <MenuList
          sx={
            contrast
              ? (t) =>
                  t.setFocusVisibleContrast(
                    (t.vars || t).palette.primary.contrastText,
                  )
              : undefined
          }
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem selected>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}

export default function FocusVisibleContrast() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={3} useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Menu label="Without contrast" />
        <Menu label="With contrast" contrast />
      </Stack>
    </ThemeProvider>
    // @focus-end
  );
}
