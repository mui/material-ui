import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Terms from 'docs/src/pages/premium-themes/onepirate/Terms';

const theme = createTheme();

export default function Page() {
  return (
    <AppTheme title="Onepirate theme - Material-UI" description="A onepirate theme">
      <ThemeProvider theme={theme}>
        <Terms />
      </ThemeProvider>
    </AppTheme>
  );
}
