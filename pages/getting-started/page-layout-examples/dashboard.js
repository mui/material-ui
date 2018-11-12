import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Dashboard from 'docs/src/pages/getting-started/page-layout-examples/dashboard/Dashboard';

function Page() {
  return (
    <AppTheme
      title="Dashboard page layout example - Material-UI"
      description="An example layout for creating an albumn."
      hideCredit
    >
      <Dashboard />
    </AppTheme>
  );
}

export default withRoot(Page);
