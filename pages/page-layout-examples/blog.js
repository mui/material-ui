import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import Head from 'docs/src/modules/components/Head';
import Blog from 'docs/src/pages/page-layout-examples/blog/Blog';

function Page() {
  return (
    <React.Fragment>
      <Head
        title="Blog page layout example - Material-UI"
        description="An example layout for creating a blog or newsletter."
      />
      <Blog />
    </React.Fragment>
  );
}

export default withRoot(Page);
