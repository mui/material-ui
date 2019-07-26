import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import SignIn from 'docs/src/pages/getting-started/templates/sign-in/SignIn';

export default function Page() {
  return (
    <AppTheme>
      <SignIn />
    </AppTheme>
  );
}
