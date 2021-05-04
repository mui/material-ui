import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import AppTheme from 'docs/src/modules/components/AppTheme';
import SignIn from 'docs/src/pages/premium-themes/onepirate/SignIn';

const theme = createTheme();

export default function Page() {
  return (
    <AppTheme title="Onepirate theme - Material-UI" description="A onepirate theme">
      <ThemeProvider theme={theme}>
        <SignIn />
      </ThemeProvider>
    </AppTheme>
  );
}
