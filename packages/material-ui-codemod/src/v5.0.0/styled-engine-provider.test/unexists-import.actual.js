import React from 'react';
import { OtherProvider } from './contexts';
import Page from './pages';

const App = () => {
  return (
    <OtherProvider>
      <Page />
    </OtherProvider>
  );
};

export default App;
