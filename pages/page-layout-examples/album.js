import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import Head from 'docs/src/modules/components/Head';
import Album from 'docs/src/pages/page-layout-examples/album/Album';

function Page() {
  return (
    <React.Fragment>
      <Head
        title="Album page layout - Material-UI"
        description="An example layout for creating an albumn or gallery."
      />
      <Album />
    </React.Fragment>
  );
}

export default withRoot(Page);
