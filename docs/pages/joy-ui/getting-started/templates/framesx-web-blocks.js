import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import TeamApp from 'docs/data/joy/getting-started/templates/framesx-web-blocks/App';
import { NextBProgressProvider } from '@mui/docs/BProgressBar';

export default function Team() {
  return (
    <React.Fragment>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href={`https://fonts.googleapis.com/css2?family=Inter:opsz@8..144&display=swap`}
          rel="stylesheet"
        />
      </Head>
      <NextBProgressProvider>
        <TeamApp />
      </NextBProgressProvider>
    </React.Fragment>
  );
}
