// @flow weak

import { AppContainer } from 'react-hot-loader';
import RedBox from 'redbox-react';
import React from 'react';
import { render } from 'react-dom';
import webFont from 'webfontloader';
import App from './App';

const rootEl = document.getElementById('app');

function renderTree() {
  render(
    <AppContainer errorReporter={RedBox}>
      <App />
    </AppContainer>,
    rootEl,
  );
}

webFont.load({
  google: {
    families: [
      'Roboto:400,500,700,400italic',
      'Material+Icons',
    ],
  },
  // This event is triggered when the fonts have rendered.
  active: renderTree,
  // This event is triggered when the browser does not support linked fonts.
  inactive: renderTree,
  // This event is triggered if the font can't be loaded.
  fontinactive: renderTree,
});

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
