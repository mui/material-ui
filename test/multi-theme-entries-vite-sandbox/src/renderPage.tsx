import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import type MuiButton from '@mui/material/Button';
import type MuiSlider from '@mui/material/Slider';
import Page from './Page';
import './app.css';

interface RenderPageOptions {
  Button: typeof MuiButton;
  Slider?: typeof MuiSlider;
  description: string;
  title: string;
}

export default function renderPage(options: RenderPageOptions) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Page {...options} />
    </React.StrictMode>,
  );
}
