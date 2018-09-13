import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import Head from 'docs/src/components/Head';
import Dashboard from 'docs/pages/page-layout-examples/dashboard/Dashboard';

function Page() {
  return (
    <React.Fragment>
      <Head
        title="Dashboard page layout example - Material-UI"
        description="An example layout for creating an albumn."
      />
      <Dashboard />
    </React.Fragment>
  );
}

export default withRoot(Page);
