import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import Head from 'docs/src/modules/components/Head';
import Dashboard from 'docs/src/pages/layouts/dashboard/Dashboard';

function Page() {
  return (
    <React.Fragment>
      <Head
        title="Dashboard layout - Material-UI"
        description="An example layout for creating an albumn."
      />
      <Dashboard />
    </React.Fragment>
  );
}

export default withRoot(Page);
