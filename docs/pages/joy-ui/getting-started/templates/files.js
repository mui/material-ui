import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import FilesApp from 'docs/data/joy/getting-started/templates/files/App';
import { NextBProgressProvider } from '@mui/docs/BProgressBar';

export default function Files() {
  return (
    <React.Fragment>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href={`https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz@8..144&display=swap`}
          rel="stylesheet"
        />
      </Head>
      <NextBProgressProvider>
        <FilesApp />
      </NextBProgressProvider>
    </React.Fragment>
  );
}
