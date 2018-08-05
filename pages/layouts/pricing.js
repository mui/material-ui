import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import Head from 'docs/src/modules/components/Head';
import Pricing from 'docs/src/pages/layouts/pricing/Pricing';

function Page() {
  return (
    <React.Fragment>
      <Head
        title="Pricing layout - Material-UI"
        description="An example layout for creating a pricing page."
      />
      <Pricing />
    </React.Fragment>
  );
}

export default withRoot(Page);
