import '@mui/zero-runtime/styles.css';

import * as ReactDOMClient from 'react-dom/client';
import * as React from 'react';

import App from './App';

const root = ReactDOMClient.createRoot(document.getElementById('root')!);
root.render(<App />);
