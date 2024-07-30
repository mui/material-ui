'use client';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

export default function CssBaselinePage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <section>
        <h2> CSS Baseline</h2>
        <div className="demo-container">
          <p>Hello world</p>
        </div>
      </section>
      <section>
        <h2> Positioned Popper</h2>
        <div className="demo-container">
          <ScopedCssBaseline>Hello world</ScopedCssBaseline>
        </div>
      </section>
    </React.Fragment>
  );
}
