import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import AppTheme from 'docs/src/modules/components/AppTheme';
import ForgotPassword from 'docs/src/pages/premium-themes/onepirate/ForgotPassword';

const theme = createTheme();

export default function Page() {
  return (
    <AppTheme title="Onepirate theme - Material-UI" description="A onepirate theme">
      <ThemeProvider theme={theme}>
        <ForgotPassword />
      </ThemeProvider>
    </AppTheme>
  );
}
