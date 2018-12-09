import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Paperbase from 'docs/src/pages/premium-themes/paperbase/Paperbase';

function Page() {
  return (
    <AppTheme title="Paperbase theme - Material-UI" description="A page that mimics Firebase.">
      <Paperbase />
    </AppTheme>
  );
}

export default withRoot(Page);
