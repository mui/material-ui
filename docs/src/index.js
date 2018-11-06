import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const history = createBrowserHistory();
history.listen(() => window.scrollTo(0, 0));

const doRender = () => {
  ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById('root')
  );
};

doRender();
registerServiceWorker();
