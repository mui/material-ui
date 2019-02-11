import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import StickyFooter from 'docs/src/pages/getting-started/page-layout-examples/sticky-footer/StickyFooter';

function Page() {
  return (
    <AppTheme
      title="Sign-in side page layout example - Material-UI"
      description="An example layout for creating a sign-in side page."
      hideCredit
    >
      <StickyFooter />
    </AppTheme>
  );
}

export default Page;
