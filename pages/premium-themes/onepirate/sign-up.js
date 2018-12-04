import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import AppTheme from 'docs/src/modules/components/AppTheme';
import SignUp from 'docs/src/pages/premium-themes/onepirate/SignUp';

function Page() {
  return (
    <AppTheme title="Onepirate theme - Material-UI" description="A onepirate theme">
      <SignUp />
    </AppTheme>
  );
}

export default withRoot(Page);
