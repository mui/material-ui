import React from 'react';
import { StyledEngineProvider } from '@material-ui/core/styles';
import { OtherProvider } from './contexts';
import Page from './pages';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <OtherProvider>
        <Page />
      </OtherProvider>
    </StyledEngineProvider>
  );
};

export default App;
