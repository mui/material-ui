import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StyledEngineProvider } from '@material-ui/core/styles';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // TODO v5: remove once migration to emotion is completed
  <StyledEngineProvider injectFirst>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </StyledEngineProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
