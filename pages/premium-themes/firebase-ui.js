import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Firebase from 'docs/src/pages/premium-themes/firebase-ui/Firebase';

function Page() {
  return (
    <AppTheme title="Firebase-UI theme - Material-UI" description="A mimic page from Firebase.">
      <Firebase />
    </AppTheme>
  );
}

export default withRoot(Page);
