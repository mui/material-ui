import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Checkout from 'docs/src/pages/page-layout-examples/checkout/Checkout';

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

export default withRoot(Page);
