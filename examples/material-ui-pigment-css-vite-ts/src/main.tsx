import React from 'react';
import ReactDOM from 'react-dom/client';
import { Theme, SxProps } from '@mui/material/styles';
import {} from '@mui/material/themeCssVarsAugmentation';
import '@mui/material-pigment-css/styles.css';
import App from './App.tsx';

declare module '@mui/material-pigment-css' {
  interface ThemeArgs {
    theme: Theme;
  }
}

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      sx?: SxProps<Theme>;
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
