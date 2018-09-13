import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import Head from 'docs/src/components/Head';
import Album from 'docs/pages/page-layout-examples/album/Album';

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
