import '@mui/zero-runtime/styles.css';

import * as ReactDOMClient from 'react-dom/client';

import { App } from './App';

const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
