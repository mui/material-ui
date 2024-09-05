import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import RentalDashboardTemplate from 'docs/data/joy/getting-started/templates/rental-dashboard/App';
import { NextNProgressBar } from 'docs/src/modules/components/AppFrame';

export default function RentalDashboard() {
  return (
    <React.Fragment>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NextNProgressBar />
      <RentalDashboardTemplate />
    </React.Fragment>
  );
}
