import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StyledEngineProvider } from '@material-ui/core/styles';
import App from './App';

ReactDOM.render(
  <>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </>,
  document.getElementById('root'),
);
