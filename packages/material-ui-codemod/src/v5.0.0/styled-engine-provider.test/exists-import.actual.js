import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { OtherProvider } from './contexts';
import Page from './pages';

const App = () => {
  return (
    <ThemeProvider theme={createMuiTheme()}>
      <OtherProvider>
        <Page />
      </OtherProvider>
    </ThemeProvider>
  );
};

export default App;
