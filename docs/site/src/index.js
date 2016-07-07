import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// workaround https://github.com/gaearon/react-hot-loader/issues/312#issuecomment-231061904
import Redbox from 'redbox-react';
// import a11y from 'react-a11y';

// if (process.env.NODE_ENV !== 'production') {
//   a11y(React, {includeSrcNode: true});
// }

const rootEl = document.getElementById('app');

ReactDOM.render(
  <AppContainer errorReporter={Redbox}>
    <App />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer errorReporter={Redbox}>
        <NextApp />
      </AppContainer>,
      rootEl
    );
  });
}
