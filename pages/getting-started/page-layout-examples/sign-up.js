import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import SignIn from 'docs/src/pages/getting-started/page-layout-examples/sign-up/SignUp';

function Page() {
  return (
    <AppTheme
      title="Sign-up page layout example - Material-UI"
      description="An example layout for creating a sign-up page."
    >
      <SignIn />
    </AppTheme>
  );
}

export default Page;
