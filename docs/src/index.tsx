import rtl from 'jss-rtl';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';

import * as serviceWorker from './serviceWorker';
import './index.css';

// @ts-ignore
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

// @ts-ignore Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

ReactDOM.render(
  <BrowserRouter>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <App />
    </JssProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// do not cache the docs
serviceWorker.unregister();
