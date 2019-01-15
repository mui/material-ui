import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Pricing from 'docs/src/pages/getting-started/page-layout-examples/pricing/Pricing';

function Page() {
  return (
    <AppTheme
      title="Pricing page layout example - Material-UI"
      description="An example layout for creating a pricing page."
    >
      <Pricing />
    </AppTheme>
  );
}

export default Page;
