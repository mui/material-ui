import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Gmail from 'docs/src/pages/premium-themes/gmail';

function Page() {
  return (
    <AppTheme
      title="Gmail theme - Material-UI"
      description="Google Suite's layout by customizing Material-UI theme."
    >
      <Gmail />
    </AppTheme>
  );
}

export default Page;
