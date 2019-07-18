import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import SignIn from 'docs/src/pages/premium-themes/onepirate/SignIn';

function Page() {
  return (
    <AppTheme title="Onepirate theme - Material-UI" description="A onepirate theme">
      <SignIn />
    </AppTheme>
  );
}

export default Page;
