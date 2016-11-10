// @flow weak

import { AppContainer } from 'react-hot-loader';
import RedBox from 'redbox-react';
import React from 'react';
import { render } from 'react-dom';
import App from './App';

const rootEl = document.getElementById('app');

render(
  <AppContainer errorReporter={RedBox}>
    <App />
  </AppContainer>,
  rootEl,
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line global-require

    render(
      <AppContainer errorReporter={RedBox}>
        <NextApp />
      </AppContainer>,
      rootEl,
    );
  });
}
