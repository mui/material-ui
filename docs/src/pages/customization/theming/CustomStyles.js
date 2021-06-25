import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.status.danger,
  '&.Mui-checked': {
    color: theme.status.danger,
  },
}));

const theme = createTheme({
  status: {
    danger: orange[500],
  },
});

export default function CustomStyles() {
  return (
    <ThemeProvider theme={theme}>
      <CustomCheckbox defaultChecked />
    </ThemeProvider>
  );
}
