import * as React from 'react';
import Head from 'next/head';
import { GlobalStyles } from '@mui/styled-engine';
import { CssVarsProvider } from '@mui/joy/styles';
import Button, { Button2 } from '@mui/joy/Button';

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

      <CssVarsProvider defaultMode="light">
        <GlobalStyles
          styles={{
            body: {
              boxSizing: 'border-box',
              margin: 0,
            },
          }}
        />

        <h1>Button implementations</h1>
        <h2>1-to-1 mapping</h2>
        <div
          data-mui-color-scheme="light"
          style={{
            display: 'grid',
            gap: 16,
            backgroundColor: 'var(--joy-palette-bgNeutral-transparency)',
            padding: 16,
          }}
        >
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
        <div
          data-mui-color-scheme="dark"
          style={{
            display: 'grid',
            gap: 16,
            backgroundColor: 'var(--joy-palette-bgNeutral-transparency)',
            padding: 16,
          }}
        >
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

        <h2>Channel + Opacity</h2>
        <div
          data-mui-color-scheme="light"
          style={{
            display: 'grid',
            gap: 16,
            backgroundColor: 'var(--joy-palette-bgNeutral-transparency)',
            padding: 16,
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <Button2 size="small" disabled>
              Subscribe
            </Button2>
            <Button2 size="small" variant="contained" disabled>
              Subscribe
            </Button2>
            <Button2 size="small" variant="outlined" disabled>
              Subscribe
            </Button2>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button2>Subscribe</Button2>
            <Button2 variant="contained">Subscribe</Button2>
            <Button2 variant="outlined">Subscribe</Button2>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button2 size="large">Subscribe</Button2>
            <Button2 size="large" variant="contained">
              Subscribe
            </Button2>
            <Button2 size="large" variant="outlined">
              Subscribe
            </Button2>
          </div>
        </div>
        <div
          data-mui-color-scheme="dark"
          style={{
            display: 'grid',
            gap: 16,
            backgroundColor: 'var(--joy-palette-bgNeutral-transparency)',
            padding: 16,
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <Button2 size="small" disabled>
              Subscribe
            </Button2>
            <Button2 size="small" variant="contained" disabled>
              Subscribe
            </Button2>
            <Button2 size="small" variant="outlined" disabled>
              Subscribe
            </Button2>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button2>Subscribe</Button2>
            <Button2 variant="contained">Subscribe</Button2>
            <Button2 variant="outlined">Subscribe</Button2>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button2 size="large">Subscribe</Button2>
            <Button2 size="large" variant="contained">
              Subscribe
            </Button2>
            <Button2 size="large" variant="outlined">
              Subscribe
            </Button2>
          </div>
        </div>
      </CssVarsProvider>
    </React.Fragment>
  );
}
