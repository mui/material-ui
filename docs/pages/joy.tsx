import * as React from 'react';
import Head from 'next/head';
import { GlobalStyles } from '@mui/styled-engine';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

export default function Joy() {
  return (
    <React.Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <CssVarsProvider>
        <GlobalStyles styles={{ html: { boxSizing: 'border-box' } }} />

        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button size="small" disabled>
              Subscribe
            </Button>
            <Button size="small" variant="contained" disabled>
              Subscribe
            </Button>
            <Button size="small" variant="outlined" disabled>
              Subscribe
            </Button>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button>Subscribe</Button>
            <Button variant="contained">Subscribe</Button>
            <Button variant="outlined">Subscribe</Button>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button size="large">Subscribe</Button>
            <Button size="large" variant="contained">
              Subscribe
            </Button>
            <Button size="large" variant="outlined">
              Subscribe
            </Button>
          </div>
        </div>
      </CssVarsProvider>
    </React.Fragment>
  );
}
