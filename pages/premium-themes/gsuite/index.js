import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Gsuite from 'docs/src/pages/premium-themes/gsuite';

function Page() {
  return (
    <AppTheme
      title="Gsuite theme - Material-UI"
      description="Google Suite's layout by customizing Material-UI theme."
    >
      <Gsuite />
    </AppTheme>
  );
}

export default Page;
