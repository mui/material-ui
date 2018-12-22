import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import ForgotPassword from 'docs/src/pages/premium-themes/onepirate/ForgotPassword';

function Page() {
  return (
    <AppTheme title="Onepirate theme - Material-UI" description="A onepirate theme">
      <ForgotPassword />
    </AppTheme>
  );
}

export default Page;
