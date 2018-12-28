import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
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

export default Page;
