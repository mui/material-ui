import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import SignUp from 'docs/src/pages/getting-started/templates/sign-up/SignUp';

export default function Page() {
  return (
    <AppTheme>
      <SignUp />
    </AppTheme>
  );
}
