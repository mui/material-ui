import React from 'react';
import { ThemeProvider, createMuiTheme, StyledEngineProvider } from '@material-ui/core/styles';
import { OtherProvider } from './contexts';
import Page from './pages';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createMuiTheme()}>
        <OtherProvider>
          <Page />
        </OtherProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
