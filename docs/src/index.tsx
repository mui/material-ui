import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import Utils from '@date-io/date-fns';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

// @ts-ignore
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

// @ts-ignore Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

ReactDOM.render(
  <BrowserRouter>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiPickersUtilsProvider utils={Utils}>
        <App />
      </MuiPickersUtilsProvider>
    </JssProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// do not cache the docs
serviceWorker.unregister();
