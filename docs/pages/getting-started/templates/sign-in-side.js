import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import SignInSide from 'docs/src/pages/getting-started/templates/sign-in-side/SignInSide';

export default function Page() {
  return (
    <AppTheme>
      <SignInSide />
    </AppTheme>
  );
}
