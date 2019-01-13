import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import SignUp from 'docs/src/pages/premium-themes/onepirate/SignUp';

function Page() {
  return (
    <AppTheme title="Onepirate theme - Material-UI" description="A onepirate theme">
      <SignUp />
    </AppTheme>
  );
}

export default Page;
