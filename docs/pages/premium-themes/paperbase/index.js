import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Paperbase from 'docs/src/pages/premium-themes/paperbase/Paperbase';

const theme = createTheme();

export default function Page() {
  return (
    <AppTheme
      title="Paperbase theme - Material-UI"
      description={`A page that mimics Firebase.
        This item includes theming using the theme provider component.`}
    >
      <ThemeProvider theme={theme}>
        <Paperbase />
      </ThemeProvider>
    </AppTheme>
  );
}
