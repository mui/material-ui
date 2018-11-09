import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import Utils from '@date-io/date-fns';
import { BrowserRouter } from 'react-router-dom';

// @ts-ignore
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

ReactDOM.render(
  <BrowserRouter>
    <MuiPickersUtilsProvider utils={Utils}>
      <App />
    </MuiPickersUtilsProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// do not cache the docs
serviceWorker.unregister();
