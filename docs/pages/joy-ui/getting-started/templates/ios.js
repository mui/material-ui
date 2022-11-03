import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import TeamApp from 'docs/data/joy/getting-started/templates/ios/App';
import { NextNProgressBar } from 'docs/src/modules/components/AppFrame';

export default function Team() {
  return (
    <React.Fragment>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <NextNProgressBar />
      <TeamApp />
    </React.Fragment>
  );
}
