import * as React from 'react';
import Head from 'next/head';
import { extendTheme } from '@mui/joy/styles';

export const LoadFont = () => {
  return (
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href={`https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz@8..144&display=swap`}
        rel="stylesheet"
      />
    </Head>
  );
};

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          bodyEmail: 'var(--joy-palette-neutral-50)',
          componentBg: 'var(--joy-palette-common-white)',
        },
      },
    },
    dark: {
      palette: {
        background: {
          bodyEmail: 'var(--joy-palette-common-black)',
          componentBg: 'var(--joy-palette-background-level1)',
        },
      },
    },
  },
  fontFamily: {
    // display: "'Roboto Flex', var(--joy-fontFamily-fallback)",
    // body: "'Roboto Flex', var(--joy-fontFamily-fallback)",
  },
});
