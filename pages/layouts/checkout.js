import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import Head from 'docs/src/modules/components/Head';
import Checkout from 'docs/src/pages/layouts/checkout/Checkout';

function Page() {
  return (
    <React.Fragment>
      <Head
        title="Checkout layout - Material-UI"
        description="An example layout for creating a checkout page."
      />
      <Checkout />
    </React.Fragment>
  );
}

export default withRoot(Page);
