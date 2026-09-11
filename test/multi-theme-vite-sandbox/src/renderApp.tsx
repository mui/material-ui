import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App, { type ThemeExample } from './App';

export default function renderApp(theme: ThemeExample) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App theme={theme} />
    </React.StrictMode>,
  );
}
