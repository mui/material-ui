import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import Dashboard from 'docs/src/pages/layouts/dashboard/Dashboard';

function Page() {
  return <Dashboard />;
}

export default withRoot(Page, { fullScreen: true });
