import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import EmailApp from 'docs/data/joy/getting-started/templates/email/App';
import { NextBProgressProvider } from '@mui/docs/BProgressBar';

export default function Email() {
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
        <EmailApp />
      </NextBProgressProvider>
    </React.Fragment>
  );
}
