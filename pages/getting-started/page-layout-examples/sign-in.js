import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import SignIn from 'docs/src/pages/getting-started/page-layout-examples/sign-in/SignIn';

function Page() {
  return (
    <AppTheme
      title="Sign-in page layout example - Material-UI"
      description="An example layout for creating a sign-in page."
    >
      <SignIn />
    </AppTheme>
  );
}

export default Page;
