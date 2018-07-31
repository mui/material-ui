import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import Head from 'docs/src/modules/components/Head';
import Albumn from 'docs/src/pages/layouts/albumn/Albumn';

function Page() {
  return (
    <React.Fragment>
      <Head
        title="Albumn layout - Material-UI"
        description="An example layout for creating an albumn or gallery."
      />
      <Albumn />
    </React.Fragment>
  );
}

export default withRoot(Page, { fullScreen: true });
