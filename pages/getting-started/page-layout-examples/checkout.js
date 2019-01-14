import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Checkout from 'docs/src/pages/getting-started/page-layout-examples/checkout/Checkout';

function Page() {
  return (
    <AppTheme
      title="Checkout page layout example - Material-UI"
      description="An example layout for creating a checkout page."
    >
      <Checkout />
    </AppTheme>
  );
}

export default Page;
