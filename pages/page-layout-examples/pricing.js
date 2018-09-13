import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import Head from 'docs/src/components/Head';
import Pricing from 'docs/pages/page-layout-examples/pricing/Pricing';

function Page() {
  return (
    <React.Fragment>
      <Head
        title="Pricing page layout example - Material-UI"
        description="An example layout for creating a pricing page."
      />
      <Pricing />
    </React.Fragment>
  );
}

export default withRoot(Page);
