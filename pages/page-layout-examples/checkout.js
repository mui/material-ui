import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import Head from 'docs/src/modules/components/Head';
import Checkout from 'docs/src/pages/page-layout-examples/checkout/Checkout';

function Page() {
  return (
    <React.Fragment>
      <Head
        title="Checkout page layout example - Material-UI"
        description="An example layout for creating a checkout page."
      />
      <Checkout />
    </React.Fragment>
  );
}

export default withRoot(Page);
