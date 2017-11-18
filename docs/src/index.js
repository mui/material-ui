/* eslint-disable no-use-before-define */
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/fr';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let currentLocale = 'en';
moment.locale(currentLocale);

const toggleFrench = () => {
  const newLocale = currentLocale === 'en'
    ? 'fr'
    : 'en';

  currentLocale = newLocale;
  moment.locale(newLocale);

  // little hack here to update inner components, using moment)
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  doRender();
};

const doRender = () => {
  ReactDOM.render(<App toggleFrench={toggleFrench} />, document.getElementById('root'));
};

doRender();
registerServiceWorker();
