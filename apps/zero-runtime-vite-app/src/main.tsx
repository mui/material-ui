import * as ReactDOMClient from 'react-dom/client';
import * as React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import '@mui/zero-runtime/styles.css';

function App() {
  return <React.Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</React.Suspense>;
}

const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>
    <App />
  </Router>,
);
