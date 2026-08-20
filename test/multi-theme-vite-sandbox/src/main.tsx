import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './reset.css';
import './app.css';
// The docs-like demo loads both scoped themes; a single-theme app would import only one index.
import './themes/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
